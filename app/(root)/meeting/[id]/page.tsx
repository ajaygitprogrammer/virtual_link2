"use client";
import { useUser } from '@clerk/nextjs'
import { useState } from 'react';
import MeetingSetup from '@/components/MeetingSetup';
import MeetingRoom from '@/components/MeetingRoom';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import Loader from '@/components/Loader';
import { useGetCallById } from '@/hooks/useGetCallByid';
import React from 'react'

const Meeting = ({ params:{id} }: { params :{ id: string } }) => {
  const {user,isLoaded}=useUser();
  const [isSetupComplete,setIsSetupComplete]=useState(false);
  const{call,isCallLoading}=useGetCallById(id);

  if(!isLoaded || isCallLoading)return <Loader/>
  return (
   <main className='h-screen w-full'>
    <StreamCall call={call}>
      <StreamTheme>
        {!isSetupComplete?(
          <MeetingSetup setIsSetupComplete={setIsSetupComplete}/>
        ):(
          <MeetingRoom/>
        )}


      </StreamTheme>
    </StreamCall>
   </main>
  )
}

export default Meeting
