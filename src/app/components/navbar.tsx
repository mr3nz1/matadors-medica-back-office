import React from "react";
import Image from "next/image";
import Logo from '../assets/images/Logo.png'
import { FaArrowLeft } from 'react-icons/fa6';

const Navbar = () => {
    return ( 
        <>
          <div className="flex flex-col">
            <div className="flex items-center pb-5">
            <Image src={Logo}
              alt="logo"
              sizes="10vw"
              style={{
                width: '50px',
                height: '50px',
              }}
              className="self-center h-8 mr-2"/>
              <h1 className="text-lg font-bold text-black self-center">Medica</h1>
            </div>
         
              <div>
              <FaArrowLeft className=" font-light cursor-pointer text-black"/>
              </div>
            </div>
        </>
     );
}
 
export default Navbar;