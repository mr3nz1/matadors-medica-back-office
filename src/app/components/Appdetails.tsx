"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/app/components/layout';
import { FaComment } from 'react-icons/fa';
import { useAuth } from '../../../ctx/AuthContext';
import Image from "next/image";
import { supabase } from '../../../utils/supabase/config';
import { ClipLoader } from "react-spinners";
import Link from "next/link";
import { DoctorsType } from '@/app/constants/type';
import { fetchDoctorData } from '@/app/utils/LoggedInUser';
import { useSearchParams } from 'next/navigation'
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
    illness_descr: string;
    status: string;
    user_id: string;
    profilePhoto: string;
    duration:string;
    user: {
      id: string;
      first_name: string;
      last_name: string;
      image: string;
      gender:string;
      age:number;
    };
  }
  interface FileObject {
    name: string;
  }

const AppointmentDetails: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const searchParams = useSearchParams()
 
    const id = searchParams.get('id')
    const { user } = useAuth();
    const [doctorData, setDoctorData] = useState<DoctorsType[]>([]);
    const [streamConnected, setStreamConnected] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [appointment, setAppointment] = useState<Appointment[]>([]);
    const [imageUrl, setImageUrl] = useState<Record<string, FileObject[]>>({});
    const [profilePhoto, setProfilePhoto] = useState<Record<string, string | null>>({});
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    useEffect(() => {
      if (user && user?.id) {
        fetchDoctorData(user?.id, setDoctorData);
      }
    }, [user]);

    useEffect(() => {
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
            await supabase.from("appointment").select("*").eq("id", id);
          
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
    }, [user.id, id]);

    return (
        <>
             {
              isLoading ? (
                <ClipLoader
                  color= "blue"
                  size={25}
                  
                />
              ) : (
                appointment.length > 0 ? (
             appointment.map((appointment) => (
            <div key={appointment.id} className="bg-white p-8 rounded-lg  max-w-3xl mx-auto">
                <div className="flex items-center mb-8">
                    <img
                        src={appointment.profilePhoto}
                        alt={appointment.user.first_name}
                        className="w-20 h-20 rounded-md mr-4"
                    />
                    <div>
                        <h2 className="text-2xl font-bold">{appointment.user.first_name}  {appointment.user.last_name}</h2>
                    </div>
                </div>
                <div className="mb-8">
                    <h3 className="text-lg font-semibold">Scheduled Appointment</h3>
                    <p>{appointment.date}</p>
                    <p>{appointment.time} (30 minutes)</p>
                </div>
                <div className="mb-8">
                    <h3 className="text-lg font-semibold">Patient Information</h3>
                    <p><strong>Full Name:</strong> {appointment.user.first_name} {appointment.user.last_name}</p>
                    <p><strong>Gender:</strong> {appointment.user.gender}</p>
                    <p><strong>Age:</strong> {appointment.user.age}</p>
                    <p><strong>Problem:</strong> {appointment.illness_descr}</p>
                </div>
                <div className="mb-8">
                    <h3 className="text-lg font-semibold">Your Package</h3>
                    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
                        <div className="flex items-center">
                            <div className="bg-blue-500 p-2 rounded-full text-white mr-4">
                                <FaComment />
                            </div>
                            <div>
                                <p className="font-semibold">{appointment.package}</p>
                                 {(appointment.package==="Messaging" )?<p className="text-sm text-gray-500"> Chat messages with doctor </p> : (appointment.package==="Video Call" ) ?<p className="text-sm text-gray-500"> Video Call with doctor </p>: <p className="text-sm text-gray-500"> Voice Call with doctor </p> } 
                            </div>
                        </div>
                        <p className="font-semibold">{appointment.price}</p>
                    </div>
                </div>
                <div className="flex justify-between">
                {(appointment.package==="Messaging" )?<button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={()=>{router.push(`/dashboard/appointment/messaging`)}}>ChatRoom</button>
                :
                (appointment.package==="Video Call" )?<button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={()=>{router.push(`/dashboard/appointment/videocall`)}}>Video MeetRoom</button>
                :
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={()=>{router.push(`/dashboard/appointment/audiocall`)}}>Audio MeetRoom</button>}
                
                    
                </div>
            </div>
            
             ))
            ) : (
              <p className="text-sm flex flex-col">
                       No Today appointments available{" "}
                     </p>  
     ))
            }
        </>
    );
};

export default AppointmentDetails;