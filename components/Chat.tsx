'use client';

import { db } from "@/firebase";
import { collection, orderBy, query } from "@firebase/firestore";

import { useSession } from "next-auth/react"
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import useStreamChat from "@/zustand/useStreamChat";

type Props ={
  chatId:string
}
function Chat({chatId}:Props) {
  const {data:session}=useSession();

  const [messages] = useCollection(session && 
    query(
    collection(db,'users',session.user?.email!,'chats',chatId,'messages'),
    orderBy('createdAt','asc')
  ));

  return (
    <div className="flex-1 overflow-auto overflow-x-hidden ">
     {messages?.empty && (
      <>
        <p className="mt-10 text-center text-white">
          输入提示词语
        </p>
        <ArrowDownCircleIcon className="h-10 w-10 mt-5 text-white mx-auto animate-bounce
        "></ArrowDownCircleIcon>
      </>
     )}
      {messages?.docs.map(message=>(
        <Message key={message.id} message={message.data()} />

      )) }

      <Message key="streaming-chat" message={{
        user: { name: 'ChatGPT'},
        text:useStreamChat().chatText}
        } />
    </div>
  )
}

export default Chat