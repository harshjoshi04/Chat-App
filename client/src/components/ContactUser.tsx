"use client";
import React, { FC } from "react";
import { twMerge } from "tailwind-merge";
import Avatar from "./Avatar";
import { BsThreeDotsVertical } from "react-icons/bs";
import { User } from "@/utils/types";
import useContactDetail from "@/context/useContactDetail";

interface ContactUserProps {
  className?: string;
  item: User;
}

const ContactUser: FC<ContactUserProps> = ({ className, item }) => {
  const { setSelectContact } = useContactDetail();
  return (
    <div
      className={twMerge(
        `px-4 py-4 bg-ThirdColor  bg-opacity-60 border-y border-SecondColor  flex items-center gap-2 cursor-pointer `,
        className
      )}
      onClick={() => setSelectContact(item)}
    >
      <Avatar src={item?.image} />
      <div className="flex flex-col flex-1   justify-start">
        <span className="font-semibold text-base truncate w-48">
          {item?.name}
        </span>
        <span className="text-xs font-extralight opacity-55">
          {item?.email}
        </span>
      </div>
      <div>
        <BsThreeDotsVertical className="cursor-pointer" />
      </div>
    </div>
  );
};

export default ContactUser;
