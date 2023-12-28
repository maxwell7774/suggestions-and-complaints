import { Clipboard } from "lucide-react";
import React from "react";
import { ModeToggle } from "./light-dark-toggle";
import AccountDropdown from "./account-dropdown";
import { auth } from "@/auth";
import { Button } from "./ui/button";
import Link from "next/link";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="fixed top-0 z-50 px-2 h-16 flex justify-center items-center border-b shadow-sm w-full">
      <div className="flex items-center justify-between max-w-screen-lg w-full">
        <div className="flex items-center gap-x-1.5 font-semibold">
          <Clipboard />
          <span className="w-5 h-5">Suggestions/Complaints</span>
        </div>
        {session ? (
          <AccountDropdown
            name={session?.user.name}
            imageUrl={session?.user.image}
          />
        ) : (
          <Button size={"sm"} variant={"outline"} asChild>
            <Link href={"/login"}>Login</Link>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
