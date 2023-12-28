import NextAuth from "next-auth";
import GitHub, { GitHubProfile } from "next-auth/providers/github";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRECT,
      profile(profile: GitHubProfile) {
        return {
          id: profile.id.toString(),
          name: profile.name,
          image: profile.avatar_url,
          role: "USER",
        };
      },
    }),
  ],
});
