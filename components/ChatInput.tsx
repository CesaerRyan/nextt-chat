"use client";
import {
  Timestamp,
  addDoc,
  collection,
  serverTimestamp,
} from "@firebase/firestore";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import { Message } from "@/typing";
import { db } from "@/firebase";
import { Toaster, toast } from "react-hot-toast";
import ModelSelection from "./ModelSelection";
import useSWR from "swr";
import { ForwardIcon } from "@heroicons/react/24/outline";
import { createParser} from "eventsource-parser";
import useStreamChat from "@/zustand/useStreamChat";

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState("");
  const [stream, setStream] = useState(false);
  const { data: session } = useSession();
  const { data: model, mutate: setModel } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!prompt) return;
    const input = prompt.trim();
    setPrompt("");
    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };

    const notification = toast.loading(" ChatGPT 正在思考...");

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );
    await fetch("askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    }).then((d) => {
      // Toast notification to say successful
      toast.success("ChatGPT 回复了", {
        id: notification,
      });
    });
  };

   function useStream(url) {
    const [data, setData] = useState('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const {updateText,chatText,streamText} =useStreamChat()
    async function getStream(url){
      setLoading(true)
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });
      const reader = response.body?.getReader();
      const parser = createParser((event) => {
        if ((event.type === "event")) {
        
          try{
           const json = JSON.parse(event.data);
           const text = json.choices[0].delta?.content || "";
           streamText( text)

          }catch(e){}
          if (event.data === '[DONE]'){
            setLoading(false)
          }
        }
        
      });
      while (true) {
        const { value, done } = await reader!.read();
        if (done)  break;
        parser.feed(Buffer.from(value).toString('utf-8') )
      }
    }
    useEffect(() => {
       getStream(url)
    }, [url])
    return {
      data,
      loading,
      error,
      refetch: getStream
    }
  }


  const {data,error,loading,refetch} = useStream('/api/edgeQuery')

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm  ">
      <form className="p-5 space-x-5 flex" onSubmit={sendMessage}>
        <input
          type="text"
          className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
          disabled={!session}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="输入问题"
        />
        <button
          type="submit"
          onSubmit={() => setStream(false)}
          disabled={!session || !prompt}
          className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4  py-2 rounded
            disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45"></PaperAirplaneIcon>
        </button>

        <div
          onClick={() => refetch('/api/edgeQuery')}

          // disabled={!session || !prompt}
          className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4  py-2 rounded
            disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <ForwardIcon className="h-4 w-4 -rotate-45"></ForwardIcon>
        </div>
      </form>

      <div className="md:hidden">
        <ModelSelection />
      </div>
    </div>
  );
}

export default ChatInput;
