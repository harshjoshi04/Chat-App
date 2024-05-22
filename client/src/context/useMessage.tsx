import { MessageType } from "@/utils/types";
import { create } from "zustand";

interface useMessageProp {
  Messages: MessageType[];
  setMessage: (item: MessageType) => void;
  setData: (item: MessageType[]) => void;
}

const useMessage = create<useMessageProp>()((set) => ({
  Messages: [],
  setMessage: (item) =>
    set((state) => ({ Messages: [...state.Messages, item] })),
  setData: (item) => set((state) => ({ Messages: [...item] })),
}));

export default useMessage;
