import React from "react";
import Avatar from "./Avatar";

const ChatBoard = () => {
  return (
    <div className="flex-1 bg-SecondColor overflow-auto ">
      <div className="h-48 flex flex-col py-8 gap-6 items-center">
        <p className="text-base font-normal opacity-85">
          Your conversation begins here.{" "}
        </p>
        <Avatar className="size-24" />
        <p className="text-3xl font-semibold">User Name </p>
      </div>
      <div className="flex flex-col mt-24 mb-4">
        <div className="flex flex-col items-end gap-2 mx-3 ">
          <div className="flex items-center gap-4">
            <p className="font-bold">You</p>
            <Avatar className="size-12" />
          </div>
          <p className=" max-w-[40%] bg-FourthColor p-[1%]  rounded-full">
            Welcome Admin
          </p>
          <span className="text-xs px-4">9:00 Am</span>
        </div>
        <div className="flex flex-col items-start gap-3 mx-3 ">
          <div className="flex items-center gap-4">
            <Avatar className="size-12" />
            <p className="font-bold">You</p>
          </div>
          <p className=" max-w-[40%] bg-FourthColor p-[1%]  rounded-full">
            Welcome Admin
          </p>
          <span className="text-xs px-3">9:00 Am</span>
        </div>
        <div className="flex flex-col items-end gap-2 mx-3 ">
          <div className="flex items-center gap-4">
            <p className="font-bold">You</p>
            <Avatar className="size-12" />
          </div>
          <p className=" max-w-[40%] bg-FourthColor p-[1%]  rounded-full">
            Welcome Admin
          </p>
          <span className="text-xs px-4">9:00 Am</span>
        </div>
        <div className="flex flex-col items-start gap-3 mx-3 ">
          <div className="flex items-center gap-4">
            <Avatar className="size-12" />
            <p className="font-bold">You</p>
          </div>
          <p className=" max-w-[40%] bg-FourthColor p-[1%]  rounded-full">
            Welcome Admin
          </p>
          <span className="text-xs px-3">9:00 Am</span>
        </div>
        <div className="flex flex-col items-end gap-2 mx-3 ">
          <div className="flex items-center gap-4">
            <p className="font-bold">You</p>
            <Avatar className="size-12" />
          </div>
          <p className=" max-w-[40%] bg-FourthColor p-[1%]  rounded-full">
            Welcome Admin
          </p>
          <span className="text-xs px-4">9:00 Am</span>
        </div>
        <div className="flex flex-col items-start gap-3 mx-3 ">
          <div className="flex items-center gap-4">
            <Avatar className="size-12" />
            <p className="font-bold">You</p>
          </div>
          <p className=" max-w-[40%] bg-FourthColor p-[1%]  rounded-full">
            Welcome Admin
          </p>
          <span className="text-xs px-3">9:00 Am</span>
        </div>
      </div>
    </div>
  );
};

export default ChatBoard;
