"use client";
import { Clipboard } from "lucide-react";
import React from "react";
import { ModeToggle } from "./light-dark-toggle";
import AccountDropdown from "./account-dropdown";
import { auth } from "@/auth";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { status, data: session } = useSession();
  const pathname = usePathname();
  const links = [
    {
      id: 0,
      href: "/",
      label: "Home",
    },
    {
      id: 1,
      href: "/user",
      label: "User",
    },
    {
      id: 2,
      href: "/reviewer",
      label: "Reviewer",
    },
    {
      id: 3,
      href: "/admin",
      label: "Admin",
    },
  ];

  const linkClass = "font-semibold hover:text-neutral-500 transition";
  const activeLinkClass = "text-neutral-500";

  return (
    <nav className="fixed top-0 z-50 px-2 h-16 flex justify-center items-center border-b shadow-sm w-full">
      <div className="flex items-center justify-between max-w-screen-lg w-full space-x-5">
        <Link href={"/"}>
          <div className="flex items-center gap-x-1.5 font-semibold hover:cursor-pointer">
            <Clipboard className="w-10 h-10" />
            <span className="text-xl select-none">Suggestions/Complaints</span>
          </div>
        </Link>
        <div className="flex w-full items-center justify-end space-x-3">
          {links.map((link) => (
            <Link
              key={link.id}
              className={cn(
                linkClass,
                pathname === link.href && activeLinkClass
              )}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
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
