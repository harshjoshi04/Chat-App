"use client";
import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Onboard from "./Onboard";
import Loader from "@/components/Loader";
import useGetUser from "@/hook/useGetUser";
import { useSocket } from "@/provider/SocketProvider";
import { useSession } from "next-auth/react";
const Home = () => {
  const load = useGetUser();
  const socket = useSocket();
  const { data: session } = useSession();
  // const socket = useSocket();
  useEffect(() => {
    if (session?.user)
      socket?.emit("userConnect", { email: session?.user?.email });
  }, [session?.user?.email]);
  return (
    <div className="flex h-[100vh]">
      {load ? (
        <Loader />
      ) : (
        <>
          <Sidebar />
          <Onboard />
        </>
      )}
    </div>
  );
};

export default Home;
