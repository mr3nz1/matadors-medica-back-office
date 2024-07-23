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
import { useRouter } from 'next/navigation';
import { DoctorsType } from "../constants/type";
import { fetchDoctorData } from "../utils/LoggedInUser";
import { StreamClient } from "../utils/StreamChat/StreamClient";
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
const Home = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredAppointments, setFilteredAppointments] = useState<any[]>([]);
  const [greeting, setGreeting] = useState("");
  const [appointment, setAppointment] = useState<Appointment[]>([]);
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [pendingAppointments, setPendingAppointments] = useState<Appointment[]>([]);
  const [recentAppointments, setRecentAppointments] = useState<Appointment[]>([]);
  const [imageUrl, setImageUrl] = useState<Record<string, FileObject[]>>({});
  const [profilePhoto, setProfilePhoto] = useState<Record<string, string | null>>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const { user } = useAuth();
  const [doctorData, setDoctorData] = useState<DoctorsType[]>([]);
  const[streamConnected, setStreamConnected] = useState<boolean>(false);

  useEffect(() => {
    if (user && user?.id) {
      fetchDoctorData(user?.id, setDoctorData);
      // getUserImageUrl("patients", userId , setImageUrl);
    }
  }, [user]);

  useEffect(() => {
    const connectUserToStream = async () => {
      setStreamConnected(false);
      try {
        if (doctorData && Array.isArray(doctorData)) {
          const doctor = {
            id: doctorData[0]?.id,
            name: doctorData[0]?.first_name + " " + doctorData[0]?.last_name
            ,
            image: "https://i.imgur.com/fR9Jz14.png",
          };

          await StreamClient.connectUser(
            doctor,
            StreamClient.devToken(doctor?.id)
          );
          setStreamConnected(true);
        } else {
          setStreamConnected(false);
        }
      } catch (error) {
        setStreamConnected(false);
        console.log("error while connecting user", error);
      }
    };
    if (!StreamClient.userID) {
      connectUserToStream();
    }
  }, [doctorData, user]);

  useEffect(() => {
    const updateGreeting = () => {
      const now = new Date();
      const hours = now.getHours();

      if (hours >= 12 && hours < 17) {
        setGreeting("Good Afternoon");
      } else if (hours >= 17 || hours < 1) {
        setGreeting("Good Evening");
      } else {
        setGreeting("Good Morning");
      }
    };

    updateGreeting();
    const intervalId = setInterval(updateGreeting, 60000);
    return () => clearInterval(intervalId);
  }, []);
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
  
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    
    setTodayAppointments(appointment.filter(app => app.date === today));
    setPendingAppointments(appointment.filter(app => app.status === "Upcoming"));
    setRecentAppointments(appointment.filter(app => app.status === "Completed" || app.status === "Cancelled"));
  }, [appointment])


  const resetSearch = () => {
    setSearchQuery("");
    setFilteredAppointments([]);
  };
  const messageAppointmentsCount = appointment.filter(appointment =>appointment.status === "Upcoming" && appointment.package === "Messaging").length;
  console.log(messageAppointmentsCount)
  const voiceAppointmentsCount = appointment.filter(appointment =>  appointment.status === "Upcoming" && appointment.package === "Voice Call").length;
  const videoAppointmentsCount = appointment.filter(appointment => appointment.status === "Upcoming" && appointment.package === "Video Call").length;
  const handleRowClick = (id: string) => {
    router.push(`/dashboard/appointment/details?id=${id}`);
    
  };
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-xl text-[#757575] font-bold"> {greeting}👋</h1>
        <h2 className="text-3xl mt-2 text-black">
          {"Dr." + user.firstName + " " + user.lastName}
        </h2>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols gap-6 mb-10 text-black ">
        <div className="bg-[#246BFD] flex justify-center items-center gap-5 text-white p-5 shadow rounded-lg">
          <div className=" p-3 rounded-full ">
            <ForumIcon className="text-white text-4xl " />
          </div>
          <div>
            <h3 className="text-4xl font-semibold flex flex-col text-center"> {
              messageAppointmentsCount
              }
              <span className="font-light text-xl">Messaging</span>
            </h3>
          </div>
        </div>
        <div className="bg-[#246BFD] flex justify-center items-center gap-5 text-white p-5 shadow rounded-lg">
          <VideocamIcon className="text-white text-4xl " />
          <h3 className="text-4xl font-semibold flex flex-col text-center">
            {voiceAppointmentsCount}<span className="font-light text-xl">Voice Call</span>
          </h3>
        </div>
        <div className="bg-[#246BFD] flex justify-center items-center gap-5 text-white p-5 shadow rounded-lg">
          <VideocamIcon className="text-white text-4xl " />
          <h3 className="text-4xl font-semibold flex flex-col text-center">
            {videoAppointmentsCount}<span className="font-light text-xl"> Video Call</span>
          </h3>
          <h3 className="text-xl font-semibold"></h3>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 md:grid-cols gap-6 text-black ">
        <div>
          <div className="bg-white p-5 shadow rounded-lg mb-4">
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold mb-4">
                Today Appointments
              </h3>
              {todayAppointments.length != 0 ? 
              <Link  className="text-xl font-semibold mb-4 text-[#5089FD]" href="/dashboard/appointment">
                See All
              </Link> : null}
            </div>
            {
              isLoading ? (
                <ClipLoader
                  color= "blue"
                  size={25}
                  
                />
              ) : (
                todayAppointments.length > 0 ? (
            todayAppointments.map((appointment, index) => (
               <div
               key={index}
               className="py-3 border-b flex items-center justify-between cursor-pointer"
               onClick={() => handleRowClick(appointment.id)} 
               
             >
               <div className="flex gap-4">
                 <Image
                   src ={appointment.profilePhoto}
                   alt="gr"
                   className="w-[45px] h-[45px] rounded-full"
                   width={45}
                   height={45}
                 />
                 <p className="text-lg flex flex-col">
                   {appointment.user.first_name} {appointment.user.last_name} <span>{appointment.package}</span>{" "}
                 </p>
               </div>

               <div className="bg-blue-200 p-2 rounded-full cursor-pointer">
                 <ChevronRightIcon className="bg-blue-500 rounded-full text-md text-white " />
               </div>
             </div>
             
            )
          )
        ) : (
          <p className="text-sm flex flex-col">
                   No Today appointments available{" "}
                 </p>  
 )
            )}
          </div>
          <div className="bg-white p-5 shadow rounded-lg">
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold mb-4">
                Pending Appointments
              </h3>
              {pendingAppointments.length != 0 ? 
              <a  className="text-xl font-semibold mb-4 text-[#5089FD]" href="/dashboard/appointment">
                See All
              </a>:null}
            </div>
         
             {
             isLoading ? (
              <ClipLoader
                color= "blue"
                size={25}
                
              />
            ) : (
              pendingAppointments.length > 0 ? (
             pendingAppointments.map((appointment, index) => (
              <div
                key={index}
                className="py-3 border-b flex items-center justify-between cursor-pointer"
                onClick={() => handleRowClick(appointment.id)} 
                
              >
                <div className="flex gap-4">
                  <Image
                    src={appointment.profilePhoto}
                    alt="gr"
                    className="w-[45px] h-[45px] rounded-full"
                    width={45}
                    height={45}
                  />
                  <p className="text-lg flex flex-col">
                    {appointment.user.first_name} {appointment.user.last_name} <span>{appointment.package}</span>{" "}
                  </p>
                </div>

                <div className="bg-blue-200 p-2 rounded-full cursor-pointer">
                  <ChevronRightIcon className="bg-blue-500 rounded-full text-md text-white " />
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm flex flex-col">
                     No Pending appointments available{" "}
               </p>
          )  
            
          )}
          </div>
        </div>
        <div>
          <div className="bg-white p-5 shadow rounded-lg mb-4">
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold mb-4">
                Recent Appointments
              </h3>
              {recentAppointments.length != 0 ? 
              <a  className="text-xl font-semibold mb-4 text-[#5089FD]" href="/dashboard/appointment">
                See All
              </a>: null}
            </div>
            {
              isLoading ? (
                <ClipLoader
                  color= "blue"
                  size={25}
                  
                />
              ) : (
                recentAppointments.length > 0 ? (
            recentAppointments
            .map((appointment, index) => (
              <div key={index} className="py-3 border-b flex justify-between cursor-pointer"  onClick={() => handleRowClick(appointment.id)} >
                <div className="flex gap-4">
                  <Image
                    src={appointment.profilePhoto}
                    alt="gr"
                    className="w-[45px] h-[45px] rounded-full"
                    width={45}
                    height={45}
                  />
                   <p className="text-lg flex flex-col">
                    {appointment.user.first_name} {appointment.user.last_name} <span>{appointment.date}</span>{" "}
                  </p>
                </div>

                <div className="flex items-center">
                  {appointment.status === "Completed" ? (
                    <button className="border border-green-500 text-green-500 px-3 py-1 rounded">
                      Completed
                    </button>
                  ) : (
                    
                    <button className="border border-pink-500 text-pink-500 px-3 py-1 rounded">
                      Cancelled
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm flex flex-col">
                     No Recent appointments available{" "}
               </p>
          )  
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
