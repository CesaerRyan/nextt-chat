import { create } from "zustand";

type StreamingChatComponent = {
  chatText: string;
  updateText:(text:string)=>void;
  streamText:(text:string)=>void;
};

const useStreamChat = create<StreamingChatComponent>((set) => ({
  chatText: "",
  updateText:(text:string)=> set((state)=>({
    chatText:text
  })),
  streamText(text:string){
    set((state)=>({
      chatText:state.chatText+= text
    }))
  }
}));


export default useStreamChat