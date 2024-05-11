import useUser from "@/context/useUser";
import { useSocket } from "@/provider/SocketProvider";
import ApiRoute from "@/utils/apiRoute";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const useGetUser = () => {
  const [isLoad, setisLoad] = useState<boolean>(true);
  const { data: session, status } = useSession();
  const { setUserData } = useUser();
  const socket = useSocket();
  const router = useRouter();
  useEffect(() => {
    (async () => {
      try {
        if (status == "unauthenticated") return router.push("/signin");
        if (!session?.user?.email) return;
        setisLoad(true);
        const { data } = await axios.get(
          ApiRoute.USER + "?email=" + session?.user?.email
        );
        setUserData(data.data);
      } catch (er) {
        console.log(er);
      } finally {
        setisLoad(false);
      }
    })();
  }, [session?.user?.email, status]);
  return isLoad;
};

export default useGetUser;
