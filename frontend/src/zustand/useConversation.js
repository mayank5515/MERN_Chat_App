import { create } from "zustand";
//CREATING GLOBAL STATE
//WE COULD HAVE DONE THIS IN CONTEXT API
//HERE CONVERSATIONS ARE USERS IN DB THAT WE CAN CHAT WITH , REST IS YK
const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));
export default useConversation;
