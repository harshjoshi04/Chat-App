import { User } from "@/utils/types";
import { create } from "zustand";

interface userContactDetailProp {
  AllContacts: User[];
  Contacts: User[];
  SelectContact: User | null;
  setContact: (item: User[]) => void;
  setSelectContact: (item: User | null) => void;
}

const useContactDetail = create<userContactDetailProp>()((set) => ({
  AllContacts: [],
  Contacts: [],
  SelectContact: null,
  setContact: (item) => set(() => ({ AllContacts: item, Contacts: item })),
  setSelectContact: (item) => set(() => ({ SelectContact: item })),
}));

export default useContactDetail;
