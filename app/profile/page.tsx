import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

//Profile page that shows the signed in user's information
const ProfilePage = async () => {
  const session = await auth();

  return (
    <div className="flex items-center h-full flex-col">
      <div className="w-full max-w-screen-xl grid grid-cols-4 justify-center items-center mt-5">
        <Avatar className="w-32 h-32 col-span-1">
          <AvatarFallback>
            {session?.user.name ? session.user.name.substring(0, 1) : "?"}
          </AvatarFallback>
          {session?.user.image && <AvatarImage src={session?.user.image} />}
        </Avatar>
        <p className="text-3xl col-span-3">{session?.user.name}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
