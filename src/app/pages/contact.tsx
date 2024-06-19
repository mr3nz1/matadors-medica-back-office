import React from "react";

function Contact() {
  return (
    <>
      <div className="bg-[#FFF] text-black p-5">
      <div className="text-center">
            <h1 className="font-bold text-2xl py-5 text-[#246BFD]">CONTACT US</h1>
            <p className="font-semibold text-[#9E9E9E]">ANY QUESTIONS? PLEASE FEEL FREE TO CONTACT OUR TEAM</p>
          </div>
        <div className="flex justify-center  py-6 px-9">
        
          <div className="flex items-center gap-7 justify-center w-full">
            <div className="flex flex-col p-5 w-full justify-between">
              <label htmlFor="name" className="py-2 flex flex-col">
                Subject
                <input
                  type="text"
                  className="p-1 rounded-xl border-2 border-[#7CA6FE] bg-[#A7C4FE]"
                />
              </label>
              <label htmlFor="name" className="py-2 flex flex-col">
               Name
                <input
                  type="text"
                  className="p-1 rounded-xl border-2 border-[#7CA6FE] bg-[#A7C4FE]"
                />
              </label>
              <label htmlFor="name" className="py-2 flex flex-col">
               E-mail
                <input
                  type="text"
                  className="p-1 rounded-xl border-2 border-[#7CA6FE] bg-[#A7C4FE]"
                />
              </label>
      
            </div>
            <div className="w-full">
              <label htmlFor="message" className="h-[30vh]">
                Message
                <textarea
                  name=""
                  id=""
                  className="p-5 w-full rounded-xl border-2 border-[#7CA6FE] bg-[#A7C4FE] h-[30vh]"
                ></textarea>
              </label>
      
            </div>
          </div>
     
        </div>
        
            <div className="flex justify-between px-9">
            <label className="flex items-center gap-5 ">
          <input type="checkbox" name="consent" className="border border-[#246BFD]"/>
          By submitting this contact form, I declare to know the privacy of this website as well as its terms and conditions.
        </label>
        <div>
        <button className="bg-[#246BFD] p-4 rounded-[30px] text-white hover:opacity-3">Send Message</button>
        </div>

            </div>
  

       
      </div>
    </>
  );
}
export default Contact;
