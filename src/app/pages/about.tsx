import React from "react";

function About() {
  return (
    <>
      <div className="bg-[#EEF4FF] p-7">
        <div className="flex flex-col justify-center">
          <div className=" py-7 text-center">
            <h1 className="text-[#246BFD] font-bold text-2xl pb-6">THE APP</h1>
            <h2 className="text-[#757575] font-semibold">GET TO KNOW ALL THE FUNCTIONALITIES OF THE MEDICA APP</h2>
          </div>
          <div className="flex justify-center">
          <div className=" w-[60%] flex flex-col gap-5 text-[#9E9E9E]">
            <p>
              Our app connects you with thousands of doctors and health experts
              for convenient, professional healthcare. Access quick
              consultations, thorough health checks, and ongoing support from
              the comfort of your home. Book appointments and conduct
              consultations via chat, voice, or video call anytime, anywhere.
            </p>
            <p>
              Keep track of medical records, schedule check-ups, and get
              reminders for medications and follow-up visits. Our app provides
              all the tools you need to live a healthy, well-balanced life.
              Start your journey to better health today with expert care at your
              fingertips. Let’s start living healthy and well together!!
            </p>
          </div>
          </div>
      
        </div>
      </div>
    </>
  );
}

export default About;
