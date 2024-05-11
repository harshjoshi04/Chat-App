import { User } from "@/utils/types";
import { create } from "zustand";

interface useUserProp {
  userData: User | null;
  setUserData: (item: User) => void;
}

const useUser = create<useUserProp>()((set) => ({
  userData: null,
  setUserData: (item) => set((state) => ({ userData: item })),
}));

export default useUser;
