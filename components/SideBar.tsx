/* eslint-disable @next/next/no-img-element */
'use client'
import { useSession ,signOut } from "next-auth/react";
import NewChat from "./NewChat";
import Image from "next/image";
import {useCollection} from 'react-firebase-hooks/firestore'
import { collection, orderBy, query } from "@firebase/firestore";
import { db } from "@/firebase";
import ChatRow from "./ChatRow";
import ModelSelection  from "./ModelSelection";
function SideBar() {
const {data:session} = useSession()
const [chats,loading, error] = useCollection(session &&
  query(
    collection(db,'users',session.user?.email!,'chats'),
      orderBy('createdAt','asc'))
    )
    
  return (
    <div className="flex p-2 flex-col h-screen">
      <div className="flex-1">
        <div>
          <NewChat />
        </div>

        <div className="hidden sm:inline">
          <ModelSelection  />
        </div>

        <div className="flex flex-col space-y-2 my-2">
        
        {loading &&(
          <div className="animate-pulse text-center text-white">
            <p>加载聊天...</p>
          </div>
        )}
        {chats?.docs.map((chat) =>(<ChatRow key={chat.id} id={chat.id} />))}
        
        </div>
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
