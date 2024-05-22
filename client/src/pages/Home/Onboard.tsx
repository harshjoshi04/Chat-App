import ChatBoard from "@/components/ChatBoard";
import ChatSection from "@/components/ChatSection";
import MessageBar from "@/components/MessageBar";
import useContactDetail from "@/context/useContactDetail";
import React from "react";

const Onboard = () => {
  const { SelectContact } = useContactDetail();
  return (
    <div
      className={` flex-1 absolute h-full overflow-y-hidden ${
        SelectContact ? "flex " : "hidden"
      }  border-l border-ThirdColor flex-col z-[30]  md:static  w-full md:flex`}
    >
      {!SelectContact ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-lg">Welcome To Our Community Server 🚀</p>
        </div>
      ) : (
        <>
          <ChatSection />
          <ChatBoard />
          <MessageBar />
        </>
      )}
    </div>
  );
};

export default Onboard;
