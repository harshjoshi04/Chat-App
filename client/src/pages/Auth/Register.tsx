"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthType } from "@/utils/types";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthType>();
  const [isDisble, setisDisble] = useState<boolean>(false);
  const router = useRouter();
  const handleRegisterData: SubmitHandler<AuthType> = async (data) => {
    try {
      setisDisble(true);
      const result = await signIn("Sign-up", { ...data, redirect: false });
      console.log(result);
      if (result?.error) throw new Error(result.error);
      toast.success("Reigster Successfully !");
      router.push("/");
    } catch (er) {
      toast.error("Email must be unique !");
    } finally {
      setisDisble(false);
    }
  };

  return (
    <div className="border rounded-lg mt-3 border-neutral-700 my-1 p-3">
      <form
        onSubmit={handleSubmit(handleRegisterData)}
        className="flex flex-col gap-5 my-4"
      >
        <div className="flex flex-col mx-3 gap-1">
          <label htmlFor="name">Name</label>
          <Input
            id="name"
            type="text"
            disabled={isDisble}
            {...register("name", { required: true })}
            className={`border border-neutral-500 rounded-md placeholder:text-base ${
              errors.name && "border-red-600 "
            }`}
            placeholder="John Strac "
          />
        </div>
        <div className="flex flex-col mx-3 gap-1">
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            type="email"
            disabled={isDisble}
            {...register("email", { required: true })}
            className={`border border-neutral-500 rounded-md placeholder:text-base ${
              errors.email && "border-red-600 "
            }`}
            placeholder="john@gmail.com"
          />
        </div>
        <div className="flex flex-col mx-3 gap-1">
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            type="password"
            disabled={isDisble}
            {...register("password", { required: true })}
            className={`border border-neutral-500 rounded-md placeholder:text-base ${
              errors.password && "border-red-600 "
            }`}
            placeholder="******"
          />
        </div>
        <Button
          type="submit"
          disabled={isDisble}
          className="border bg-white text-black font-semibold mx-3 transition  text-lg"
        >
          SingUp
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
          disabled={isDisble}
          onClick={async () => {
            setisDisble(true);
            await signIn("github", { redirect: true, callbackUrl: "/" });
          }}
          className="flex px-3 py-2 rounded-md bg-white text-black items-center gap-3 font-medium"
        >
          <FaGithub size={25} />
          <div>SingUp with Github</div>
        </button>
      </div>
    </div>
  );
};

export default Register;
