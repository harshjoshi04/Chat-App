"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { AuthType } from "@/utils/types";
import { getCookie } from "cookies-next";
import { getToken } from "next-auth/jwt";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

const Login = () => {
  const [isDisable, setisDisable] = useState<boolean>(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthType>();
  const router = useRouter();
  const handleLogin: SubmitHandler<AuthType> = async (data) => {
    try {
      setisDisable(true);
      const result = await signIn("Sign-In", { ...data, redirect: false });
      console.log(result);
      if (result?.error) throw new Error(result.error);
      toast.success("Login Successfully !");
      router.push("/");
      reset();
    } catch (error) {
      toast.error("Email Or Password Went Wrong !");
    } finally {
      setisDisable(false);
    }
  };
  return (
    <div className="border rounded-lg mt-3 border-neutral-700 my-1 p-3">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col gap-5 my-4"
      >
        <div className="flex flex-col mx-3 gap-1">
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            type="email"
            {...register("email", { required: true })}
            className={`border border-neutral-500 rounded-md placeholder:text-base ${
              errors.email && "border-red-600 "
            }`}
            placeholder="john@gmail.com"
            disabled={isDisable}
          />
        </div>
        <div className="flex flex-col mx-3 gap-1">
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            type="password"
            {...register("password", { required: true })}
            className={`border border-neutral-500 rounded-md placeholder:text-base ${
              errors.password && "border-red-600 "
            }`}
            placeholder="*****"
            disabled={isDisable}
          />
        </div>
        <Button
          type="submit"
          disabled={isDisable}
          className="border bg-white text-black font-semibold mx-3 transition  text-lg"
        >
          SignIn
        </Button>
      </form>
      <div className="inline-flex items-center justify-center w-full">
        <hr className="w-64 h-0.5 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
        <div className="absolute px-4 -translate-x-1/2 bg-black left-1/2 dark:bg-gray-900 text-lg">
          Or
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 my-3">
        <button
          disabled={isDisable}
          className="flex px-3 py-2 rounded-md bg-white text-black items-center gap-3 font-medium"
          onClick={async () => {
            setisDisable(true);
            await signIn("github", { redirect: true, callbackUrl: "/" });
          }}
        >
          <FaGithub size={25} />
          <div>Signin with Github</div>
        </button>
      </div>
    </div>
  );
};

export default Login;
