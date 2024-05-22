import { create } from "zustand";

interface UserRequestProp {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRequest = create<UserRequestProp>()((set) => ({
  isOpen: false,
  onOpen: () => set((state) => ({ isOpen: true })),
  onClose: () => set((state) => ({ isOpen: false })),
}));

export default useRequest;
