"use client";

import Layout from '@/app/components/layout';
import React, { useEffect, useState } from 'react';
import { FaFaceGrin } from 'react-icons/fa6';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import VideocamIcon from '@mui/icons-material/Videocam';
import ForumIcon from '@mui/icons-material/Forum';
import Search from '@/app/components/search';
import { Logout } from '@/app/auth/action';
import Image from 'next/image';

const Home = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredAppointments, setFilteredAppointments] = useState<any[]>([]);
    const [greeting, setGreeting] = useState("");
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

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
    
    const performSearch = () => {
        if (!searchQuery.trim()) {
            setFilteredAppointments([]);
            return;
        }

        const filtered = recentAppointments.filter(appointment =>
            appointment.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredAppointments(filtered);
    };

    const resetSearch = () => {
        setSearchQuery('');
        setFilteredAppointments([]);
    };

    const menu = [
      {
        call: 'Video call',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIN1gwlCld-PW_qX5QxwNMdPUff8gYhTOe8w&s',
        width: 45,  // Specify the width here
        height: 45  // Specify the height here
      },
      {
        call: 'Messaging',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIN1gwlCld-PW_qX5QxwNMdPUff8gYhTOe8w&s',
        width: 45,  // Specify the width here
        height: 45  // Specify the height here
      },
    ];

    const recentAppointments = [
      { image: 'https://americanhatmakers.com/cdn/shop/files/Hollywood-Copper-Leather-Cowboy-Hat-Mens-FW23-American-Hat-Makers_1.webp?v=1715028775&width=1000', name: 'Annabel Rohan', date: '12-08-2024', status: 'Review', width: 45, height: 45 },
      { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIN1gwlCld-PW_qX5QxwNMdPUff8gYhTOe8w&s', name: 'Geoffrey Mott', date: '12-08-2024', status: 'Pending', width: 45, height: 45 },
      { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToonwNT4zbwCyq-k-qAzXexPn6URz3gT4BxQ&s', name: 'Rayford Chenail', date: '12-08-2024', status: 'Review', width: 45, height: 45 },
      { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIN1gwlCld-PW_qX5QxwNMdPUff8gYhTOe8w&s', name: 'John Doe', date: '12-08-2024', status: 'Review', width: 45, height: 45 },
      { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToonwNT4zbwCyq-k-qAzXexPn6URz3gT4BxQ&s', name: 'John Doe', date: '12-08-2024', status: 'Review', width: 45, height: 45 },
    ];

    return (
        <Layout>
            <div>
                <div className="mb-10">
                    <h1 className="text-xl text-[#757575] font-bold"> {greeting}👋</h1>
                    <h2 className="text-3xl mt-2 text-black">Dr. Drake Boeson</h2>
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols gap-6 mb-10 text-black ">
                    <div className="bg-[#246BFD] flex justify-center items-center gap-5 text-white p-5 shadow rounded-lg">
                        <div className=' p-3 rounded-full '>
                            <ForumIcon className='text-white text-4xl '/>
                        </div>
                        <div >
                            <h3 className="text-4xl font-semibold flex flex-col text-center">30 <span className='font-light text-xl'>Messages</span></h3>
                        </div>
                    </div>
                    <div className="bg-[#246BFD] flex justify-center items-center gap-5 text-white p-5 shadow rounded-lg">
                        <VideocamIcon className='text-white text-4xl '/>
                        <h3 className="text-4xl font-semibold flex flex-col text-center">46<span className='font-light text-xl'>Voice Call</span></h3>
                    </div>
                    <div className="bg-[#246BFD] flex justify-center items-center gap-5 text-white p-5 shadow rounded-lg">
                        <VideocamIcon className='text-white text-4xl '/>
                        <h3 className="text-4xl font-semibold flex flex-col text-center">22<span className='font-light text-xl'> Video Call</span></h3>
                        <h3 className="text-xl font-semibold"></h3>
                    </div>
                </div>
                <div className="grid lg:grid-cols-2 md:grid-cols gap-6 text-black ">
                    <div>
                        <div className="bg-white p-5 shadow rounded-lg mb-4">
                            <div className='flex justify-between'>
                                <h3 className="text-xl font-semibold mb-4">Today&#39;s Appointment</h3>
                                <h3 className="text-xl font-semibold mb-4 text-[#5089FD]">See All</h3>
                            </div>
                            {['Annabel Rohan', 'Geoffrey Mott'].map((name, index) => (
                                <div key={index} className='py-3 border-b flex items-center justify-between'>
                                    <div className='flex gap-4'>
                                        <Image src={menu[index % menu.length].image} alt="gr" width={menu[index % menu.length].width} height={menu[index % menu.length].height} className='w-[45px] h-[45px] rounded-full' />
                                        <p className="text-lg flex flex-col">{name} <span>{menu[index % menu.length].call}</span> </p>
                                    </div>
                                    <div className='bg-blue-200 p-2 rounded-full cursor-pointer'>
                                        <ChevronRightIcon className='bg-blue-500 rounded-full text-md text-white ' />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-white p-5 shadow rounded-lg">
                            <div className='flex justify-between'>
                                <h3 className="text-xl font-semibold mb-4">Pending&#39;s Appointment</h3>
                                <h3 className="text-xl font-semibold mb-4 text-[#5089FD]">See All</h3>
                            </div>
                            {['Annabel Rohan', 'Geoffrey Mott'].map((name, index) => (
                                <div key={index} className='py-3 border-b flex items-center justify-between'>
                                    <div className='flex gap-4'>
                                        <Image src={menu[index % menu.length].image} alt="gr" width={menu[index % menu.length].width} height={menu[index % menu.length].height} className='w-[45px] h-[45px] rounded-full' />
                                        <p className="text-lg flex flex-col">{name} <span>{menu[index % menu.length].call}</span> </p>
                                    </div>
                                    <div className='bg-blue-200 p-2 rounded-full cursor-pointer'>
                                        <ChevronRightIcon className='bg-blue-500 rounded-full text-md text-white ' />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="bg-white p-5 shadow rounded-lg mb-4">
                            <div className='flex justify-between'>
                                <h3 className="text-xl font-semibold mb-4">Recent Appointments</h3>
                                <h3 className="text-xl font-semibold mb-4 text-[#5089FD]">See All</h3>
                            </div>
                            {(searchQuery.trim() ? filteredAppointments : recentAppointments).map((appointment, index) => (
                                <div key={index} className='py-3 border-b flex justify-between'>
                                    <div className='flex gap-4'>
                                        <Image src={appointment.image} alt="gr" width={appointment.width} height={appointment.height} className='w-[45px] h-[45px] rounded-full' />
                                        <p className="text-lg flex flex-col">{appointment.name} <span>{appointment.date}</span> </p>
                                    </div>
                                    <div className='flex items-center'>
                                        {appointment.status === 'Pending' ? (
                                            <button className="border border-blue-500 text-blue-500 px-3 py-1 rounded">Pending</button>
                                        ) : (
                                            <button className="border border-green-500 text-green-500 px-3 py-1 rounded">Review</button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Home;
