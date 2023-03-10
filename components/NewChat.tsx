"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { db } from "@/firebase";

function NewChat() {
  const router = useRouter();
  const { data: session } = useSession();
  const createNewChat = async () => {
    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"),
      {
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
        messages: [],
      }
    );
    router.push(`/chat/${doc.id}`);
  };

  return (
    <div className="border-gra700 border chatRow">
      <PlusIcon className="h-4 w-4"></PlusIcon>
      <p onClick={() => createNewChat()}> 新聊天</p>
    </div>
  );
}

export default NewChat;
