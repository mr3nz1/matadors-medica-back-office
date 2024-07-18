// components/Footer.js
import Image from "next/image";
import Logo from '@/app/assets/images/Logo.png'; // Adjust the path based on your directory structure

const Footer = () => {
  return (
    <footer className="bg-[#EEF4FF] text-black ">
      <div className=" ">
        <div className='flex justify-around'>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src={Logo}
              alt="logo"
              className="self-center h-8 mr-2"
              sizes="10vw"
              style={{
                width: "35px",
                height: "35px",
              }} />
            <h1 className="text-4xl font-bold text-black self-center">Medica</h1>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8 justify-between">
          <div>
            <h2 className="font-bold mb-4">Medica</h2>
            <ul>
              <li><a href="/" className="text-sm text-gray-600">HOME</a></li>
              <li><a href="/" className="text-sm text-gray-600">APP</a></li>
              <li><a href="/" className="text-sm text-gray-600">DOWNLOAD</a></li>
              <li><a href="/" className="text-sm text-gray-600">CONTACT US</a></li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold mb-4">Copyright</h2>
            <ul>
              <li><a href="/" className="text-sm text-gray-600">PRIVACY POLICY</a></li>
              <li><a href="/" className="text-sm text-gray-600">TERMS & CONDITION</a></li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold mb-4">Follow us</h2>
            <ul>
              <li><a href="/" className="text-sm text-gray-600">X</a></li>
              <li><a href="/" className="text-sm text-gray-600">FACEBOOK</a></li>
              <li><a href="/" className="text-sm text-gray-600">INSTAGRAM</a></li>
              <li><a href="/" className="text-sm text-gray-600">LINKEDIN</a></li>
            </ul>
          </div>
        </div>
        </div>
       
        <div className="mt-8 text-center bg-white py-4 text-gray-600">
          <p>&copy; 2024 Medical Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
