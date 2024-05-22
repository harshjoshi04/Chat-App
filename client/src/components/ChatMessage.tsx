"use client";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import LongPressButton from "./LongPressButton";
import Avatar from "./Avatar";
import EmojiPicker from "emoji-picker-react";
import { MessageType } from "@/utils/types";
import useUser from "@/context/useUser";
import { timeAgo } from "@/utils/ExtraFun";
import useContactDetail from "@/context/useContactDetail";
import axios from "axios";
import ApiRoute from "@/utils/apiRoute";
import { useSocket } from "@/provider/SocketProvider";

interface ChatMessageProp {
  item: MessageType;
}

const ChatMessage: FC<ChatMessageProp> = ({ item }) => {
  const { userData } = useUser();
  const [isReaction, setisReaction] = useState(false);
  const { SelectContact } = useContactDetail();
  const socket = useSocket();
  const [Reaction, setReaction] = useState(item?.senderReaction);
  const [RecieverReaction, setRecieverReaction] = useState(
    item?.receiverReaction
  );
  const chatMessageRef = useRef(null);

  const handleClickOutside = (event: MouseEvent): void => {
    if (
      chatMessageRef.current &&
      !chatMessageRef?.current?.contains(event.target)
    ) {
      setisReaction(false);
    }
  };

  const handleChatReaction = async (obj: {
    id: number;
    type: boolean;
    image: string;
  }) => {
    try {
      socket?.emit("sendReaction", { email: SelectContact?.email, ...obj });
      const { data } = await axios.put(ApiRoute.MESSAGE, obj);
    } catch (er) {}
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleReaction = ({
    id,
    type,
    image,
  }: {
    id: number;
    type: boolean;
    image: string;
  }) => {
    if (id == item?.id) {
      type ? setReaction(image) : setRecieverReaction(image);
    }
  };
  useEffect(() => {
    socket?.on("recieveReaction", handleReaction);
    return () => {
      socket?.off("recieveReaction", handleReaction);
    };
  }, [item]);

  return (
    <div
      className={`flex flex-col ${
        userData?.id == item?.userId ? "items-end" : "items-start"
      }  gap-2 mx-3 relative `}
    >
      <Avatar
        className="size-12"
        src={
          userData?.id != SelectContact?.id
            ? item?.senderMessage?.image
            : item?.receiverMessage?.image
        }
      />

      <div
        className={`absolute -bottom-8 transition duration-150 ${
          isReaction ? "scale-105" : "scale-0"
        }`}
        ref={chatMessageRef}
      >
        <EmojiPicker
          reactionsDefaultOpen={true}
          allowExpandReactions={false}
          onReactionClick={(e) => {
            if (userData?.id == item?.userId) {
              handleChatReaction({
                id: item?.id,
                type: true,
                image: e.imageUrl,
              });
            } else {
              handleChatReaction({
                id: item?.id,
                type: false,
                image: e.imageUrl,
              });
            }
            setReaction(e.imageUrl);
            setisReaction(false);
          }}
          theme={"dark"}
        />
      </div>

      <LongPressButton
        onLongPress={() => {
          setisReaction(true);
        }}
        className=" bg-FourthColor p-[1%]  rounded-full cursor-pointer relative mx-w-[40%]"
      >
        <p>{item?.message}</p>
        <div
          className={`absolute transition -bottom-4 left-4 bg-FourthColor/50 border border-white/5 rounded-full p-1 ${
            Reaction || RecieverReaction ? "scale-100" : "scale-0"
          }`}
        >
          <div className="flex items-center justify-center gap-1">
            {Reaction == RecieverReaction && Reaction && RecieverReaction ? (
              <>
                <img
                  src={Reaction}
                  className={`size-4 z-40  ${!Reaction && "hidden"} `}
                />
                <p className="text-xs">2</p>
              </>
            ) : (
              <>
                <img
                  src={Reaction}
                  className={`size-4 z-40  ${!Reaction && "hidden"} `}
                />
                <img
                  src={RecieverReaction}
                  alt=""
                  className={`size-4 z-40  ${!RecieverReaction && "hidden"} `}
                />
              </>
            )}
          </div>
        </div>
      </LongPressButton>
      <span className="text-xs px-4">{timeAgo(item?.createdAt)}</span>
    </div>
  );
};

export default ChatMessage;
