import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import useContactDetail from "@/context/useContactDetail";
import ChatMessage from "./ChatMessage";
import axios from "axios";
import useUser from "@/context/useUser";
import ApiRoute from "@/utils/apiRoute";
import useMessage from "@/context/useMessage";
import { useSocket } from "@/provider/SocketProvider";
import { MessageType } from "@/utils/types";

const ChatBoard = () => {
  const { userData } = useUser();
  const { SelectContact } = useContactDetail();
  const [isLoad, setisLoad] = useState(false);
  const { Messages, setData, setMessage } = useMessage();
  const [isUpdate, setisUpdate] = useState(false);
  const socket = useSocket();

  const handleGetMessage = (data: MessageType) => {
    setMessage(data);
  };

  useEffect(() => {
    (async () => {
      try {
        if (Messages?.length) return;
        setisLoad(false);
        const { data } = await axios.get(
          `${ApiRoute.MESSAGE}?userId=${userData?.id}&fromId=${SelectContact?.id}`
        );
        setData(data.data);
      } catch (er) {
      } finally {
        setisLoad(true);
      }
    })();
  }, [isUpdate]);

  // const handleReaction = ({
  //   id,
  //   type,
  //   image,
  // }: {
  //   id: number;
  //   type: string;
  //   image: string;
  // }) => {
  //   console.log("Hello !");
  //   let newData: MessageType[] = Messages;
  //   const findIndex = Messages.findIndex((el) => el?.id == id);
  //   console.log(findIndex);
  //   if (!findIndex) return;
  //   if (type) {
  //     newData[findIndex].senderReaction = image;
  //   } else {
  //     newData[findIndex].receiverReaction = image;
  //   }
  //   setData(newData);
  //   setisUpdate(!isUpdate);
  // };

  useEffect(() => {
    socket?.on("getMessage", handleGetMessage);

    return () => {
      socket?.off("getMessage", handleGetMessage);
    };
  }, [Messages]);
  return (
    <div className="flex-1 bg-SecondColor overflow-auto ">
      {!isLoad ? (
        <div className="flex justify-center items-center h-full">
          Loading ...
        </div>
      ) : (
        <>
          <div className="h-48 flex flex-col py-8 gap-6 items-center">
            <p className="text-base font-normal opacity-85">
              Your conversation begins here.{" "}
            </p>
            <Avatar className="size-24" src={SelectContact?.image} />
            <p className="text-3xl font-semibold">{SelectContact?.name} </p>
          </div>
          <div className="flex flex-col gap-4 mt-24 mb-4">
            {Messages?.map((item) => (
              <ChatMessage item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBoard;
