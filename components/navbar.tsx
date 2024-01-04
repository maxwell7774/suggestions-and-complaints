"use client";
import { Clipboard, Menu } from "lucide-react";
import React, { useState } from "react";
import { ModeToggle } from "./light-dark-toggle";
import AccountDropdown from "./account-dropdown";
import { auth } from "@/auth";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Toggle } from "./ui/toggle";

const Navbar = () => {
  const { status, data: session } = useSession();
  const pathname = usePathname();
  const [togglePressed, setTogglePressed] = useState<boolean>(false);
  const [mobileLinksOpen, setMobileLinksOpen] = useState<"open" | "">("");
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
    <>
      <nav className="sm:hidden flex flex-col fixed top-0 z-50 justify-center items-center border-b backdrop-blur-md shadow-sm w-full min-w-min">
        <div className="flex items-center justify-center w-full space-x-1 h-16 px-3">
          <div className="flex items-center justify-between max-w-screen-lg w-full space-x-5">
            <Link href={"/"}>
              <div className="flex items-center gap-x-1.5 font-semibold hover:cursor-pointer">
                <Clipboard className="w-10 h-10" />
                <span className="text-xl hidden xs:inline select-none">
                  Suggestions/Complaints
                </span>
                <span className="text-xl xs:hidden select-none">S/C</span>
              </div>
            </Link>
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
          <Toggle
            className="p-2"
            pressed={togglePressed}
            onPressedChange={(pressed) => {
              setTogglePressed(!togglePressed);
              if (pressed) {
                setMobileLinksOpen("open");
              } else {
                setMobileLinksOpen("");
              }
            }}
          >
            <Menu className="w-7 h-7 min-w-7 min-h-7" />
          </Toggle>
        </div>
        <Accordion type="single" value={mobileLinksOpen} className="w-full">
          <AccordionItem className="border-none" value={"open"}>
            <AccordionContent
              className="p-0"
              onMouseLeave={() => {
                setTogglePressed(false);
                setMobileLinksOpen("");
              }}
            >
              <div className="flex flex-col">
                {links.map((link) => (
                  <Link
                    className={cn(
                      "text-lg font-bold text-center hover:bg-foreground/5 p-2",
                      pathname === link.href && "bg-foreground/10"
                    )}
                    onClick={() => {
                      setTogglePressed(false);
                      setMobileLinksOpen("");
                    }}
                    key={link.id}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </nav>

      <nav className="hidden sm:flex fixed top-0 z-50 px-3 h-16 justify-center items-center border-b backdrop-blur-md shadow-sm w-full">
        <div className="flex items-center justify-between max-w-screen-lg w-full space-x-5">
          <Link href={"/"}>
            <div className="flex items-center gap-x-1.5 font-semibold hover:cursor-pointer">
              <Clipboard className="w-10 h-10" />
              <span className="text-xl select-none">
                Suggestions/Complaints
              </span>
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
    </>
  );
};

export default Navbar;
