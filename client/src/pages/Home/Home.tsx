"use client";
import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Onboard from "./Onboard";
import Loader from "@/components/Loader";
import useGetUser from "@/hook/useGetUser";
import { useSocket } from "@/provider/SocketProvider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const Home = () => {
  const load = useGetUser();
  const socket = useSocket();
  const { data: session, status } = useSession();
  // const socket = useSocket();
  const router = useRouter();
  useEffect(() => {
    if (status == "unauthenticated") return router.push("/signin");
    if (session?.user)
      socket?.emit("userConnect", { email: session?.user?.email });
  }, [session?.user?.email]);
  return (
    <div className="flex h-[100vh]">
      {load || status == "loading" ? (
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
