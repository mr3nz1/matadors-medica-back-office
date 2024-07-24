"use client";
import Layout from "../components/layout";
import React, { useEffect, useState } from "react";
import { FaFaceGrin } from "react-icons/fa6";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import VideocamIcon from "@mui/icons-material/Videocam";
import ForumIcon from "@mui/icons-material/Forum";
import Search from "../components/search";
import { Logout } from "@/app/auth/action";
import { useAuth } from "../../../ctx/AuthContext";
import Image from "next/image";
import { supabase } from "../../../utils/supabase/config";
import { ClipLoader } from "react-spinners";
import Link from "next/link";
import { DoctorsType } from "../constants/type";
import { fetchDoctorData } from "../utils/LoggedInUser";
import { StreamClient } from "../utils/StreamChat/StreamClient";
import { redirect } from "next/navigation";
import { useRouter } from 'next/navigation';
interface Appointment {
  id: string;
  name: string;
  created_at: string;
  doctor_id: string;
  date: string;
  time: string;
  package: string;
  price: string;
  illness: string;
  status: string;
  user_id: string;
  profilePhoto: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    image: string;
  };
}
interface FileObject {
  name: string;
}
interface AppointmentsTableProps {
  doctorId: string;
}

const Appointments = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [appointment, setAppointment] = useState<Appointment[]>([]);
  const [imageUrl, setImageUrl] = useState<Record<string, FileObject[]>>({});
  const [profilePhoto, setProfilePhoto] = useState<Record<string, string | null>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const { user } = useAuth();
  const [doctorData, setDoctorData] = useState<DoctorsType[]>([]);
  const[streamConnected, setStreamConnected] = useState<boolean>(false);

  useEffect(() => {
    if (user && user?.id) {
      fetchDoctorData(user?.id, setDoctorData);
    }
  }, [user]);
  useEffect(() =>{
    setIsLoading(true);
    async function FetchAppointments() {
      try {
      
      const { data: doctorData, error: doctorsError } =
      await supabase.from("doctors").select("*").eq("auth_id", user.id);
    
    if (doctorsError) {
     setIsLoading(false);
      console.error("Error fetching doctor:", doctorsError);
      return;
    }
    const doctorId = doctorData.map(
      (doctor) => doctor.id
    );

    const { data: appointmentData, error: appointmentsError } =
      await supabase.from("appointment").select("*").eq("doctor_id", doctorId);
    
    if (appointmentsError) {
     setIsLoading(false);
      console.error("Error fetching appointments:", appointmentsError);
      return;
    }
    const userId = appointmentData.map(
      (user) => user.user_id
    );
    const { data: userData, error: userError } =
    await supabase.from("patients").select("*").in("id", userId);
  
  if (userError) {
    setIsLoading(false);
    console.error("Error fetching users:", userError);
    return;
  }
          
  const imageUrlObject: Record<string, FileObject[]> = {};
  const profilePhotoObject: Record<string, string | null> = {};

  for (const patient of userData) {
    const path = patient.auth_id + '/';
    
    const { data: imageData, error: imageError } = await supabase
      .storage
      .from("patients")
      .list(patient.auth_id + '/', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      });
  
    if (imageError) {
      console.error(`Error fetching images for patient ${patient.id}:`, imageError);
      profilePhotoObject[patient.id] = null;
      continue;
    }
          
    imageUrlObject[patient.id] = imageData || [];
    
    if (imageData && imageData.length > 0) {
      const { data } = supabase
        .storage
        .from("patients")
        .getPublicUrl(`${patient.auth_id}/${imageData[0].name}`);
  
      profilePhotoObject[patient.id] = data.publicUrl;
    } else {
      profilePhotoObject[patient.id] = null;
    }
  }

  setImageUrl(imageUrlObject);
  setProfilePhoto(profilePhotoObject);


  const mergedData = appointmentData.map((appointment) => ({
    ...appointment,
     user :userData.find(
      user => user.id === appointment.user_id
    )!,
    userImages: imageUrlObject[appointment.user_id] || [],
    profilePhoto: profilePhotoObject[appointment.user_id]
    
  }));

  setAppointment(mergedData);
  console.log("app",appointment)
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  FetchAppointments();
}, [user.id]);

  const handleRowClick = (id: string) => {
    router.push(`/dashboard/appointment/details?id=${id}`);
  };


  
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Cancelled':
        return { color: 'red', border: '1px solid red', padding: '0.5rem' };
      case 'Completed':
        return { color: 'green', border: '1px solid green', padding: '0.5rem' };
      case 'Upcoming':
        return { color: 'blue', border: '1px solid blue', padding: '0.5rem' };
      default:
        return {};
    }
  };

  return (
    <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 1rem' }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', paddingRight: '2rem' }}>Image</th>
          <th style={{ textAlign: 'left', paddingRight: '2rem' }}>Name</th>
          <th style={{ textAlign: 'left', paddingRight: '2rem' }}>Date</th>
          <th style={{ textAlign: 'left', paddingRight: '2rem' }}>Time</th>
          <th style={{ textAlign: 'left', paddingRight: '2rem' }}>Method</th>
          <th style={{ textAlign: 'left', paddingRight: '2rem' }}>Status</th>
        </tr>
      </thead>
      <tbody>
        {
           isLoading ? (
            <ClipLoader
              color= "blue"
              size={25}
              
            />
          ) : (
            appointment.length > 0 ? (
        appointment.map((appointment) => (
         
          <tr key={appointment.id}
          onClick={() => handleRowClick(appointment.id)} 
          style={{ cursor: 'pointer' }}
          >
            <td style={{ paddingRight: '2rem' }}><Image
                   src ={appointment.profilePhoto}
                   alt="gr"
                   className="w-[45px] h-[45px] rounded-full"
                   width={45}
                   height={45}
                 /></td>
            <td style={{ paddingRight: '2rem' }}>{appointment.user.first_name}{appointment.user.last_name}</td>
            <td style={{ paddingRight: '2rem' }}>{appointment.date}</td>
            <td style={{ paddingRight: '2rem' }}>{appointment.time}</td>
            <td style={{ paddingRight: '2rem' }}>{appointment.package}</td>
            <td style={{ paddingRight: '2rem' }}>
            <span style={getStatusStyle(appointment.status)}>
                {appointment.status}
              </span>
            </td>
          </tr>
          
        ))
      ) : (
        <p className="text-sm flex flex-col">
                 No appointments available{" "}
               </p>  
))
      }
      </tbody>
    </table>
  );
};

export default Appointments;