import ChatBoard from "@/components/ChatBoard";
import ChatSection from "@/components/ChatSection";
import MessageBar from "@/components/MessageBar";
import React from "react";

const Onboard = () => {
  return (
    <div className="flex-1 absolute    flex  border-l border-ThirdColor flex-col z-[0] md:static w-full">
      <ChatSection />
      <ChatBoard />
      <MessageBar />
    </div>
  );
};

export default Onboard;
