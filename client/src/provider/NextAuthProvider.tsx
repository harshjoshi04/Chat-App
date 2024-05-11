"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React, { FC } from "react";

interface NextAuthProviderProp {
  children: React.ReactNode;
}

const NextAuthProvider: FC<NextAuthProviderProp> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
