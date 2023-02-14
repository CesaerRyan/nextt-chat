/* eslint-disable @next/next/no-img-element */
'use client'
import { useSession ,signOut } from "next-auth/react";
import NewChat from "./NewChat";
import Image from "next/image";

function SideBar() {

const {data:session} = useSession()

  return (
    <div className="flex p-2 flex-col h-screen">
      <div className="flex-1">
        <div>
          <NewChat></NewChat>
        </div>

        <div>{/*model*/}</div>

        <div>{/*map through chats */}</div>
      </div>


      {session && (<img 
      src={session.user?.image!}
       alt="profile"
        className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50 "
        onClick={()=>{signOut()}}
      />)}
    </div>
  );
}

export default SideBar;
