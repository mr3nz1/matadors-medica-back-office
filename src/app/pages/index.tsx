"use client"
import Mobile from "../Assets/images/Mobile.png"
import Logo from "../assets/images/Medica.svg"
import Image from 'next/image'
import { Menu } from '@headlessui/react';
import React, { useState } from 'react';
import Link from "next/link";

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (<>
    <div className="w-full h-[100vh] m-0 p-0">
      <div className="w-full h-[8vh] bg-[#EEF4FF] flex justify-center p-2.5">
        <div className="w-[90%] md:w-[60%] flex justify-between">
          <div className="flex items-center">
            <Image src={Logo}
              alt="logo"
              sizes="10vw"
              style={{
                width: '80%',
                height: '80%',
              }}
              className="self-center h-8 mr-2"/>
              <h1 className="text-lg font-bold text-black self-center">Medica</h1>
            </div>
            <div className="hidden md:flex gap-5">
              <ul className="flex gap-5 items-center">
                <li>
                  <Link href="/auth/signup" className="text-sm font-bold text-black self-center">HOME</Link>
                </li>
                <li>
                  <Link href="/auth/login" className="text-sm font-bold text-black self-center">APP</Link>
                </li>
                <li>
                  <Link href="/" className="text-sm font-bold text-black self-center">DOWNLOAD</Link>
                </li>
                <li>
                  <Link href="/" className="text-sm font-bold text-black self-center">CONTACT</Link>
                </li>
              </ul>
            </div>
            <div className="md:hidden">
              <Menu>
                <Menu.Button onClick={() => setMenuOpen(!menuOpen)} className="self-center">
                  <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16m-7 6h7"></path>
                  </svg>
                </Menu.Button>
                <Menu.Items className={`absolute right-0 mt-2 w-48 bg-white shadow-lg ${menuOpen ? 'block' : 'hidden'}`}>
                  <Menu.Item>
                    {({ active }) => (
                      <a className={`${active ? 'bg-gray-200 text-sm font-bold text-black' : ''} block px-4 py-2 text-sm text-black`} href="#">
                        HOME
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a className={`${active ? 'bg-gray-200 text-sm font-bold text-black' : ''} block px-4 py-2 text-sm text-black`} href="#">
                        APP
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a className={`${active ? 'bg-gray-200 text-sm font-bold text-black' : ''} block px-4 py-2 text-sm text-black`} href="#">
                        DOWNLOAD
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a className={`${active ? 'bg-gray-200 text-sm font-bold text-black' : ''} block px-4 py-2 text-sm text-black`} href="#">
                        CONTACT US
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
          </div>
        </div>
        <div className="w-full h-[92vh] md:h-[92vh] flex justify-center items-start md:items-start bg-[#FFFFFF]">
          <div
            className="w-full h-[80vh] flex justify-center items-center"
            style={{
              backgroundImage: "url('../Assets/images/Group.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
          <div className="w-full md:w-full lg:w-[60%] h-full flex flex-col md:flex-row justify-center md:gap-12 items-center">
            <div className="w-full md:w-[50%] text-center md:text-left mb-8 md:mb-0">
              <h1 className="text-[#246BFD] text-xl md:text-2xl lg:text-2xl font-bold m-2.5">Welcome to Medica</h1>
              <p className="text-[#757575] text-base md:text-lg lg:text-l font-medium">
                The best online doctor<br />
                appointment & consultation app <br />
                of the century for your health and <br />
                medical needs!
              </p>
              <div className="flex flex-col md:flex-row gap-5 m-2.5 mt-7.5 justify-center md:justify-start items-center">
                <button className="w-[100px] md:w-[100px] h-[5vh] text-xs md:text-xm text-white bg-[#246BFD] rounded-full p-2">Download App</button>
                <button className="w-[100px] md:w-[100px] h-[5vh] text-xs md:text-xm text-[#246BFD] bg-[#E9F0FF] rounded-full p-2">Learn More</button>
              </div>
            </div>
            <Image src={Mobile} alt="Mobile" className="w-[140px] md:w-[170px] h-[230px] md:h-[310px]" />
          </div>
        </div>
      </div>
    </div>
  </>)
}