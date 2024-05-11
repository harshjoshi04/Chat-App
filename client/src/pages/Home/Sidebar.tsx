import ContactList from "@/components/ContactList";
import SearchBar from "@/components/SearchBar";
import UserSection from "@/components/UserSection";
import React from "react";

const Sidebar = () => {
  return (
    <div className="  flex flex-col  w-full  md:max-w-[350px] ">
      <SearchBar />
      <ContactList />
      <UserSection />
    </div>
  );
};

export default Sidebar;
