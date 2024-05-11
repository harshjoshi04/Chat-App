import React from "react";
import ContactUser from "./ContactUser";

const ContactList = () => {
  return (
    <div className=" flex-1 flex-col  overflow-auto   " id="userList">
      <ContactUser className="bg-SecondColor" />
      {[...Array(8).keys()].map((item: number) => (
        <ContactUser key={item} />
      ))}
    </div>
  );
};

export default ContactList;
