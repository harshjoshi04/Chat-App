"use client";
import { User } from "@/utils/types";
import React, { FC, useState } from "react";
import Avatar from "./Avatar";
import Button from "./Button";
import { useSocket } from "@/provider/SocketProvider";
import { MdAccessTime } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import useUser from "@/context/useUser";
import axios from "axios";
import ApiRoute from "@/utils/apiRoute";

interface ContactUserListProp {
  item: User;
}

const ContactUserList: FC<ContactUserListProp> = ({ item }) => {
  const { userData } = useUser();
  const [isStatus, setisStatus] = useState(item?.status);
  const socket = useSocket();
  const handleSendRequest = async (email: string) => {
    try {
      setisStatus((pre) => "pending");
      const { data } = await axios.post(ApiRoute.REQUEST, {
        userId: item?.id,
        fromId: userData?.id,
      });
      socket?.emit("sendRequest", { email });
    } catch (er) {
      console.log(er);
    }
  };

  return (
    <div className="flex items-center px-6 gap-3 text-white my-6">
      <Avatar className="size-14" src={item?.image} />
      <div className="flex-1 flex  flex-col justify-start ">
        <p className="text-sm">{item?.name}</p>
        <p className="text-xs text-white/45">{item?.email}</p>
      </div>
      {isStatus ? (
        isStatus == "pending" && (
          <Button className="py-2 px-3 bg-neutral-900/80">
            <MdAccessTime />
          </Button>
        )
      ) : (
        <Button
          className="py-2 px-3 bg-neutral-900/80"
          onClick={() => handleSendRequest(item?.email)}
        >
          <IoMdPersonAdd />
        </Button>
      )}
    </div>
  );
};

export default ContactUserList;
