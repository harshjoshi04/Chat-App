"use client";
import React, { FC } from "react";
import Avatar from "./Avatar";
import Button from "./Button";
import { MdClose, MdDone } from "react-icons/md";
import { RequestType } from "@/utils/types";
import axios from "axios";
import ApiRoute from "@/utils/apiRoute";

interface RequestListProp {
  item: RequestType;
  handleUpdate: () => any;
}

interface HandleRequestProp {
  id: number;
  status: boolean;
}

const RequestList: FC<RequestListProp> = ({ item, handleUpdate }) => {
  const handleRequest = async (obj: HandleRequestProp) => {
    try {
      await axios.put(ApiRoute.REQUEST, obj);
      handleUpdate();
    } catch (er) {
      console.log(er);
    }
  };
  return (
    <div className="flex items-center justify-center px-6 gap-3 text-white my-6">
      <Avatar className="size-14" src={item?.recipient?.image} />
      <div className="md:flex-1 flex  flex-col md:justify-start ">
        <p className="text-sm">{item?.recipient?.name}</p>
        <p className="text-xs text-white/45">{item?.recipient?.email}</p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          className="p-2  "
          onClick={() => handleRequest({ id: item?.id, status: false })}
        >
          <MdClose className="size-6" />
        </Button>
        <Button
          className="p-2"
          onClick={() => handleRequest({ id: item?.id, status: true })}
        >
          <MdDone className="size-6" />
        </Button>
      </div>
    </div>
  );
};

export default RequestList;
