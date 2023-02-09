import { PlusIcon } from "@heroicons/react/24/solid";

function NewChat() {
  return (
    <div className="border-gra700 border chatRow">
      <PlusIcon className="h-4 w-4"></PlusIcon>
      <p> 新聊天</p>
    </div>
  );
}

export default NewChat;
