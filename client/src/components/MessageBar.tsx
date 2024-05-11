import React from "react";
import Input from "./Input";
import { BsEmojiGrin } from "react-icons/bs";
import { LuSendHorizonal } from "react-icons/lu";

const MessageBar = () => {
  return (
    <div className="flex justify-center items-center gap-4 py-[1.3rem]">
      <Input placeholder="Type anything..." className="w-11/12" />
      <BsEmojiGrin size={20} />
      <LuSendHorizonal size={20} />
    </div>
  );
};

export default MessageBar;
