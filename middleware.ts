import { auth } from "./auth";
import { NextResponse } from "next/server";

const middleware = auth((req) => {
  if (!req.auth) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("referrer", req.nextUrl.pathname);
    console.log("Redrecting to login...");
    return NextResponse.redirect(loginUrl);
  }
});

export const config = {
  matcher: [
    "/admin/:path*",
    "/reviewer/:path*",
    "/user/:path*",
    "/api/users/:path*",
    "/api/messages/:path*",
  ],
};

export default middleware;
