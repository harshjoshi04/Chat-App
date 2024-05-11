"use client";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import Avatar from "./Avatar";
import { IoMdSettings } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import useUser from "@/context/useUser";
import useContact from "@/context/useContact";
import { useSocket } from "@/provider/SocketProvider";
import axios from "axios";
import ApiRoute from "@/utils/apiRoute";

const UserSection = () => {
  const { userData } = useUser();
  const { onOpen } = useContact();
  const [TotalRequest, setTotalRequest] = useState(0);
  const [isUpdate, setisUpdate] = useState(false);
  const socket = useSocket();
  const handleRequestReceive = () => {
    setisUpdate(!isUpdate);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${ApiRoute.REQUEST}/${userData?.id}`);
        setTotalRequest((prev) => data?.count);
      } catch (error) {}
    })();
    socket?.on("receiveRequest", handleRequestReceive);
    return () => {
      socket?.off("receiveRequest", handleRequestReceive);
    };
  }, [userData, isUpdate]);

  return (
    <div className="flex flex-col gap-0.5 ">
      <div className="bg-SecondColor border-y border-SecondColor px-4 py-5 flex items-center justify-between ">
        <p className="font-semibold relative flex items-center">
          <span>Manage Request</span>
          {TotalRequest != 0 && (
            <span className="text-xs bg-red-600 rounded-full w-fit px-2 py-1 mx-2 font-normal">
              {TotalRequest}
            </span>
          )}
        </p>

        <Button className="uppercase text-sm">Accept</Button>
      </div>
      <div className="bg-SecondColor border-y border-SecondColor px-4 py-5 flex items-center justify-between ">
        <p className="font-semibold">Add Contacts </p>
        <Button className="uppercase text-sm" onClick={onOpen}>
          Add Contact
        </Button>
      </div>
      <div className=" border-y border-SecondColor px-4 py-3 flex gap-3 items-center ">
        <Avatar src={userData?.image} />
        <div className="p-1 rounded-full border-4 border-SecondColor ">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center">
              <IoMdSettings size={25} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  signOut({ redirect: true, callbackUrl: "/signin" });
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default UserSection;
