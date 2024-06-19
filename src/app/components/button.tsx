import React from "react";

interface ButtonProps {
  name: string;
  onClick?: () => void; // Optional onClick handler
  className?: string;   // Optional additional CSS classes
}

const Button: React.FC<ButtonProps> = ({ name, onClick, className }) => {
  return (
    <>

     <button onClick={onClick} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 mb-4">
     {name} 
   </button>
    </>
   
  );
}

export default Button;
