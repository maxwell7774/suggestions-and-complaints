"use client";
import { Button } from "@/components/ui/button";
import { Github, Gitlab } from "lucide-react";
import { signIn } from "next-auth/react";
import React from "react";

//Login buttons that call the corresponding login providers to sign in
const LoginButton = () => {
  return (
    <>
      <Button
        variant={"outline"}
        onClick={() => signIn("github")}
        className="w-full xs:w-96"
      >
        <Github className="mr-2 w-4 h-4" />
        Login With GitHub
      </Button>
      <Button
        variant={"outline"}
        onClick={() => signIn("gitlab")}
        className="w-full xs:w-96"
      >
        <Gitlab className="mr-2 w-4 h-4" />
        Login With GitLab
      </Button>
    </>
  );
};

export default LoginButton;
