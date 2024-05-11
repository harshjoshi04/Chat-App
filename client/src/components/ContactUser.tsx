import React, { FC } from "react";
import { twMerge } from "tailwind-merge";
import Avatar from "./Avatar";
import { BsThreeDotsVertical } from "react-icons/bs";

interface ContactUserProps {
  className?: string;
}

const ContactUser: FC<ContactUserProps> = ({ className }) => {
  return (
    <div
      className={twMerge(
        `px-4 py-4 bg-ThirdColor  bg-opacity-60 border-y border-SecondColor  flex items-center gap-2 `,
        className
      )}
    >
      <Avatar />
      <div className="flex flex-col flex-1   justify-start">
        <span className="font-semibold text-base truncate w-48">
          Hi Hello World
        </span>
        <span className="text-xs font-extralight opacity-55">Test</span>
      </div>
      <div>
        <BsThreeDotsVertical className="cursor-pointer" />
      </div>
    </div>
  );
};

export default ContactUser;
