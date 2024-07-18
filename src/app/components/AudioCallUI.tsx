import React, { useState } from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import { FaPhoneAlt, FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import ParticipantView from "@/app/components/ParticipantView";
import Image from "next/image";

interface AudioCallUIProps {
  profilePicture: string;
  name: string;
  joinButtonIcon: React.ReactNode;
  microphoneButtonIcon: React.ReactNode;
  hangupButtonIcon: React.ReactNode;
  participants: string[];
  isMicMuted: boolean;
  toggleMicrophone: () => void;
  handleHangup: () => void;
}

const AudioCallUI: React.FC<AudioCallUIProps> = ({
  profilePicture,
  name,
  joinButtonIcon,
  microphoneButtonIcon,
  hangupButtonIcon,
  participants,
  toggleMicrophone,
  handleHangup
}) => {
  const { join, leave, toggleMic } = useMeeting({
    onMeetingJoined: () => {
      console.log("Meeting joined");
    },
    onMeetingLeft: () => {
      console.log("Meeting left");
    },
  });

  const [isJoined, setIsJoined] = useState(false);

  const handleJoin = async() =>{
    await join();
    setIsJoined(true);
  }

  const handleLeave = async() => {
    await leave();
    setIsJoined(false);
    handleHangup();
  }

  const handleMic = async() => {
    await toggleMic();
    toggleMicrophone();
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-[#246BFD] text-white p-4 rounded-lg">
        <h2 className="text-xl font-bold">On going Call</h2>
      </div>
      <div className="flex-grow flex items-center justify-center rounded-lg">
        <div className="bg-white shadow-lg rounded-lg p-6 w-3/4 h-1/2 max-w-md mx-auto">
          <div className="flex flex-col items-center justify-center gap-6 pt-10">
            <Image
              src={profilePicture}
              alt={name}
              width={200}
              height={200}
              priority
              className="w-1/2 h-1/2 rounded-full"
            />
            <h3 className="text-[#246BFD] font-bold">{name}</h3>
            <div className="flex justify-between w-full gap-4">
              <button
                onClick={handleJoin}
                disabled={isJoined}
                className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full flex items-center ${isJoined ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {joinButtonIcon}
                <span className="ml-2">Join</span>
              </button>
              <button
                onClick={handleMic}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full flex items-center"
              >
                {microphoneButtonIcon}
                <span className="ml-2">Microphone</span>
              </button>
              <button
                onClick={handleLeave} 
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full flex items-center"
              >
                {hangupButtonIcon}
                <span className="ml-2">Hang Up</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="participants">
        {participants.map((participantId) => (
          <ParticipantView participantId={participantId} key={participantId} />
        ))}
      </div>
    </div>
  );
};

export default AudioCallUI;