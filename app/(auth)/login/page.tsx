import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import LoginButton from "./_components/login-buttons";
import { Clipboard } from "lucide-react";

interface Props {
  searchParams: { referrer: string };
}

const LoginPage = async ({ searchParams: { referrer } }: Props) => {
  const session = await auth();

  if (session && referrer) {
    redirect(referrer);
  }
  if (session && !referrer) {
    redirect("/");
  }

  return (
    <div className="flex items-center justify-center h-5/6 flex-col gap-3">
      <Clipboard className="h-24 w-24" />
      <h1 className="text-center font-semibold text-2xl max-w-72">
        Login to make a Suggestion or Complaint
      </h1>
      <LoginButton />
    </div>
  );
};

export default LoginPage;
