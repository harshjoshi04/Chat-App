import React from "react";
import ContactUser from "./ContactUser";
import useContactDetail from "@/context/useContactDetail";

const ContactList = () => {
  const { Contacts } = useContactDetail();
  return (
    <div className=" flex-1 flex-col  overflow-auto   " id="userList">
      {/* <ContactUser className="bg-SecondColor" /> */}
      {Contacts.map((item) => (
        <ContactUser key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ContactList;
