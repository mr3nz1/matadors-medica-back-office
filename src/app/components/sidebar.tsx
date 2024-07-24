"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaHome, FaCalendarAlt, FaFileAlt, FaUserEdit } from "react-icons/fa";
import Logo from "../assets/images/Logo.png";
import Profile from "../assets/images/Ellipse.png";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../../../ctx/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const pathname = usePathname();

  const menuItems = [
    { name: "Home", path: "/dashboard", icon: <FaHome /> },
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

    {
      name: "Notifications",
      path: "/dashboard/notifications",
      icon: <FaUserEdit />,
    },
  ];
  const { user } = useAuth();

  return (
    <>
      <MenuIcon
        className="lg:hidden fixed top-5 text-4xl left-5 z-50 bg-gray-700 p-2 rounded "
        onClick={() => setIsSidebarOpen(true)}
      />

      <aside
        className={`fixed top-0 left-0 w-72 bg-gray-100  h-screen p-5 z-40 transform transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="text-center mb-10">
          <div className="flex items-center pb-5">
            <Image
              src={Logo}
              alt="logo"
              width={50}
              height={50}
              className="self-center mr-2 rounded-full"
            />
            <h1 className="text-lg font-bold text-black self-center">Medica</h1>
          </div>
          <div className="flex flex-col text-black items-center pb-5">
            <Image
              src={user.image && user.image}
              alt="profile"
              width={150}
              height={150}
              className="self-center rounded-[150%]"
            />
            <h1 className="text-lg font-bold text-black self-center py-3">
              {"Dr." + user.firstName + " " + user.lastName}
            </h1>
            <p className="py-1">{user.specialization}</p>
            <p>{user.about}</p>
          </div>
        </div>
        <nav className="flex text-black justify-center">
          <ul>
            {menuItems.map((item, index) => (
              <Link
                href={item.path}
                key={index}
                className={`mb-6 flex items-center cursor-pointer ${
                  pathname === item.path ? "text-[#5089FD]" : ""
                }`}
              >
                <div className="mr-3">{item.icon}</div>
                <a className="text-lg">{item.name}</a>
              </Link>
            ))}
          </ul>
        </nav>

        <CloseIcon
          className="lg:hidden text-4xl fixed top-5 right-5 z-50 bg-red-500 p-2 rounded"
          onClick={() => setIsSidebarOpen(false)}
        />
      </aside>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
