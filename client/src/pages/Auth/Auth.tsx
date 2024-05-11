import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "./Login";
import Register from "./Register";
const Auth = () => {
  return (
    <div className="flex justify-center items-center  h-[100vh] w-full ">
      <Tabs defaultValue="singin">
        <TabsList>
          <TabsTrigger value="singin" className="">
            Sign In
          </TabsTrigger>
          <TabsTrigger value="singup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="singin">
          <Login />
        </TabsContent>
        <TabsContent value="singup">
          <Register />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
