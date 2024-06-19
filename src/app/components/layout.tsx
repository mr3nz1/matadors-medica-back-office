"use client";
import React from 'react';
import { FaHome, FaCalendarAlt, FaFileAlt, FaUserEdit } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import Navbar from './navbar';
import Image from 'next/image';
import Logo from '../assets/images/Logo.png';
import Profile from '../assets/images/Ellipse.png';
import Sidebar from './sidebar';
import Search from './search';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const pathname = usePathname();
    const menuItems = [
        { name: 'Home', path: '/dashboard/home', icon: <FaHome /> },
        { name: 'Appointment', path: '/dashboard/appointment', icon: <FaCalendarAlt /> },
        { name: 'Articles', path: '/dashboard/article', icon: <FaFileAlt /> },
        { name: 'Edit Profile', path: '/dashboard/edit-profile', icon: <FaUserEdit /> },
    ];

    return (
        <div className="flex min-h-screen">
            {/* <aside className="lg:w-72 md:w-40 sm:w-20 bg-gray-100 fixed overflow-y-auto h-screen  text-black p-5 top-0 left-0 z-50">
                <div className="text-center mb-10">
                    <div className="flex items-center pb-5">
                        <Image
                            src={Logo}
                            alt="logo"
                            width={50}
                            height={50}
                            className="self-center  mr-2"
                        />
                        <h1 className="text-lg font-bold text-black self-center">Medica</h1>
                    </div>
                    <div className="flex flex-col items-center pb-5">
                        <Image
                            src={Profile}
                            alt="logo"
                            width={100}
                            height={100}
                            className="self-center  mr-2"
                        />
                        <h1 className="text-lg font-bold text-black self-center py-3">Dr. Drake Boeson</h1>
                        <p className='py-1'>Immunologists</p>
                        <p>The Valley Hospital in California, US</p>
                    </div>
                </div>
                <nav className='flex justify-center'>
                    <ul>
                        {menuItems.map((item, index) => (
                            <li
                                key={index}
                                className={`mb-6 flex items-center cursor-pointer ${
                                    pathname === item.path ? 'text-[#5089FD]' : ''
                                }`}
                                onClick={() => (window.location.href = item.path)}
                            >
                                <div className="mr-3">{item.icon}</div>
                                <a className="text-lg">{item.name}</a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside> */}
            <Sidebar/>
            <div className="flex-1 lg:ml-72 m "> 
                <main className=" p-5 pr-5 pl-5 pb-10 bg-[#FAFAFA] text-black  ">
                <Search data={'da'} onSearch="" />
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
