import type { NextAuthOptions } from "next-auth";
import axios from "axios";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import ApiRoute from "./apiRoute";
import { setCookie } from "cookies-next";
export const authOption: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      id: "Sign-In",
      name: "Sign-In",
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const { data } = await axios.post(ApiRoute.LOGIN, credentials);
        return { ...data.data };
      },
    }),
    CredentialsProvider({
      id: "Sign-up",
      name: "Sign-up",
      credentials: { name: {}, email: {}, password: {} },
      async authorize(credentials) {
        if (!credentials?.name || !credentials?.email || !credentials?.password)
          return null;
        const { data } = await axios.post(ApiRoute.REGISTER, credentials);
        setCookie("userToken", data.token);
        return { ...data.data };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, credentials, profile }) {
      if (account?.provider == "github") {
        let obj = {
          name: user?.name,
          email: user?.email,
          image: user?.image,
          platFormId: account?.providerAccountId,
          platFormName: account?.provider,
        };
        const { data } = await axios.post(ApiRoute.PLATFORM, obj);
      }
      return true;
    },
    async jwt({ token, user }) {
      return token;
    },
    async session({ user, session }) {
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
};
