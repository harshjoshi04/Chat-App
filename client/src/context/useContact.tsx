import { User } from "@/utils/types";
import { create } from "zustand";

interface useContactProp {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useContact = create<useContactProp>()((set) => ({
  isOpen: false,
  onOpen: () => set((state) => ({ isOpen: true })),
  onClose: () => set((state) => ({ isOpen: false })),
}));

export default useContact;
