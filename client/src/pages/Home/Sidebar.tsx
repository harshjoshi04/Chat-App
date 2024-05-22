"use client";
import ContactList from "@/components/ContactList";
import SearchBar from "@/components/SearchBar";
import UserSection from "@/components/UserSection";
import useContactDetail from "@/context/useContactDetail";
import useUser from "@/context/useUser";
import ApiRoute from "@/utils/apiRoute";
import axios from "axios";
import React, { useEffect } from "react";

const Sidebar = () => {
  const { userData } = useUser();
  const { setContact } = useContactDetail();
  useEffect(() => {
    (async () => {
      try {
        if (!userData) return;
        const { data } = await axios.get(`${ApiRoute.CONTACT}/${userData?.id}`);
        setContact(data.data);
      } catch (er) {
        console.log(er);
      }
    })();
  }, []);

  return (
    <div className="  flex flex-col  w-full z-0  md:max-w-[350px] ">
      <SearchBar />
      <ContactList />
      <UserSection />
    </div>
  );
};

export default Sidebar;
