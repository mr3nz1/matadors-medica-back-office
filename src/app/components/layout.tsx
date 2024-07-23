"use client";
import React from "react";
import { FaHome, FaCalendarAlt, FaFileAlt, FaUserEdit } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import Image from "next/image";
import Logo from "../assets/images/Logo.png";
import Profile from "../assets/images/Ellipse.png";
import Sidebar from "./sidebar";
import Search from "./search";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const menuItems = [
    { name: "Home", path: "/dashboard/home", icon: <FaHome /> },
    {
      name: "Appointment",
      path: "/dashboard/appointment",
      icon: <FaCalendarAlt />,
    },
    { name: "Articles", path: "/dashboard/article", icon: <FaFileAlt /> },
    {
      name: "Edit Profile",
      path: "/dashboard/edit-profile",
      icon: <FaUserEdit />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 lg:ml-72 m bg-[#FAFAFA]">
        <main className=" p-5 pr-5 pl-5 pb-10 bg-[#FAFAFA] text-black pt-20 ">
          {/* <Search onSearch={() => {}} /> */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
