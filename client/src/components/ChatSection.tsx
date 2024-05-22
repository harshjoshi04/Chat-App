import React from "react";
import Avatar from "./Avatar";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaVideo } from "react-icons/fa";
import useContactDetail from "@/context/useContactDetail";
import { ArrowLeft } from "lucide-react";

const ChatSection = () => {
  const { SelectContact, setSelectContact } = useContactDetail();
  return (
    <div className="flex items-center bg-ThirdColor px-4 flex-col md:flex-row ">
      <div className="px-2 py-5 w-full flex gap-2 flex-1  items-center ">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => setSelectContact(null)}
        />
        <Avatar src={SelectContact?.image} />
        <div className="flex flex-col flex-1   justify-start">
          <span className="font-semibold text-base truncate w-48">
            {SelectContact?.name}
          </span>
          <span className="text-xs font-extralight opacity-55">
            {SelectContact?.email}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 ">
        <BiSolidPhoneCall size={25} />
        <FaVideo size={25} />
      </div>
    </div>
  );
};

export default ChatSection;
