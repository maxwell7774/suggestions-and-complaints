import NextAuth from "next-auth";
import GitHub, { GitHubProfile } from "next-auth/providers/github";
import GitLab, { GitLabProfile } from "next-auth/providers/gitlab";
import { prismaClient } from "./prisma-client";
import { type Adapter } from "@auth/core/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";

declare module "next-auth" {
  interface User {
    role: string;
    id: string;
  }

  interface Session {
    user: User;
  }
}

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: PrismaAdapter(prismaClient) as Adapter,
  session: { maxAge: 28800 },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      profile(profile: GitHubProfile) {
        return {
          id: profile.id.toString(),
          name: profile.name,
          email: profile.email,
          role: "USER",
          image: profile.avatar_url,
        };
      },
    }),
    GitLab({
      clientId: process.env.GITLAB_CLIENT_ID,
      clientSecret: process.env.GITLAB_CLIENT_SECRET,
      profile(profile: GitLabProfile) {
        return {
          id: profile.id.toString(),
          name: profile.name,
          email: profile.email,
          role: "USER",
          image: profile.avatar_url,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.role = user.role;
        session.user.id = user.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
