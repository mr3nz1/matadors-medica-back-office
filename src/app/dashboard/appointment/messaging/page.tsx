"use client";
import {
  Chat,
  Channel,
  ChannelList,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  useCreateChatClient,
  CustomStyles,
  DefaultStreamChatGenerics,
} from 'stream-chat-react';
import React, { useEffect, useState } from "react";
import Layout from "@/app/components/layout";
import 'stream-chat-react/dist/css/index.css';
import { useAuth } from '../../../../../ctx/AuthContext';
import { ChannelSort} from 'stream-chat';
import { fetchDoctorData } from '@/app/utils/LoggedInUser';
import { DoctorsType } from '@/app/constants/type';
import { StreamClient } from '@/app/utils/StreamChat/StreamClient';

const Appointment: React.FC = () => {

    const [doctorData, setDoctorData] = useState<DoctorsType[]>([]);
    const[streamConnected, setStreamConnected] = useState<boolean>(false);

    const { user } = useAuth();
 
    useEffect(() => {
      const loadData = async () => {
          if (user && user?.id) {
              await fetchDoctorData(user?.id, setDoctorData);
          }
      };
      loadData();

      const interval = setInterval(() => {
          loadData();
      }, 5000);

      return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    const connectUserToStream = async () => {
      setStreamConnected(false);
      try {
        if (doctorData && Array.isArray(doctorData)) {
          const doctor = {
            id: doctorData[0]?.id,
            name: doctorData[0]?.first_name + " " + doctorData[0]?.last_name
            ,
            image: "https://i.imgur.com/fR9Jz14.png",
          };

          await StreamClient.connectUser(
            doctor,
            StreamClient.devToken(doctor?.id)
          );
          const channel = StreamClient.channel("messaging", { members: [doctorData[0]?.id] });
          await channel.watch();
          setStreamConnected(true);
        } else {
          setStreamConnected(false);
        }
      } catch (error) {
        setStreamConnected(false);
        console.log("error while connecting user", error);
      }
    };
    if (!StreamClient.userID) {
      connectUserToStream();
    }
  }, [doctorData, user]);

  

      const userId = doctorData[0]?.id;

      const filters = { members: { $in:[userId] }, type: 'messaging' };
      const options = { presence: true, state: true };
      const sort : ChannelSort<DefaultStreamChatGenerics> = { last_message_at: -1 } 

  return (
       <Chat client={StreamClient}>
      <ChannelList 
      sort={sort} 
      filters={filters}
       />
         <Channel>
        <Window>
          <ChannelHeader/>
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
     
  );
};

export default Appointment;
