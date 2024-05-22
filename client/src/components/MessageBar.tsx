"use client";
import React, { useEffect, useRef, useState } from "react";
import Input from "./Input";
import { BsEmojiGrin } from "react-icons/bs";
import { LuSendHorizonal } from "react-icons/lu";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import useUser from "@/context/useUser";
import useContactDetail from "@/context/useContactDetail";
import axios from "axios";
import ApiRoute from "@/utils/apiRoute";
import useMessage from "@/context/useMessage";
import { useSocket } from "@/provider/SocketProvider";

const MessageBar = () => {
  const [isOpen, setisOpen] = useState(false);
  const [Message, setMessage] = useState("");
  const { userData } = useUser();
  const { SelectContact } = useContactDetail();
  const { setMessage: setMessages } = useMessage();
  const socket = useSocket();
  const EmojiRef = useRef(null);
  const handleClickOutSide = (event: MouseEvent): void => {
    if (EmojiRef.current && !EmojiRef.current?.contains(event.target))
      setisOpen(false);
  };

  const handleSendMessage = async () => {
    try {
      if (!Message) return;
      let obj = {
        userId: userData?.id,
        fromId: SelectContact?.id,
        message: Message,
      };
      const { data } = await axios.post(ApiRoute.MESSAGE, obj);
      setMessages(data.data);
      socket?.emit("sendMessage", {
        email: SelectContact?.email,
        data: data.data,
      });
      setMessage("");
    } catch (er) {
      console.log(er);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  return (
    <div className="flex justify-center bg-ThirdColor px-4  items-center gap-4 py-[1.3rem] relative ">
      <Input
        placeholder="Type anything..."
        className="w-11/12"
        value={Message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
      />
      <div
        className={`absolute -top-96 right-6 transition duration-150 `}
        ref={EmojiRef}
      >
        <EmojiPicker
          open={isOpen}
          theme="dark"
          width={380}
          height={380}
          onEmojiClick={(e) => {
            setMessage((prev) => prev + e.emoji);
          }}
        />
      </div>
      <BsEmojiGrin
        size={20}
        onClick={() => setisOpen(!isOpen)}
        className="cursor-pointer"
      />
      <LuSendHorizonal
        size={20}
        onClick={handleSendMessage}
        className="cursor-pointer"
      />
    </div>
  );
};

export default MessageBar;
