import { auth } from "@/auth";
import isAuthorized from "@/lib/is-authorized";
import { prismaClient } from "@/prisma-client";
import { redirect } from "next/navigation";
import React from "react";
import AdminTable from "./_components/admin-table";

//This is the admin page
const AdminPage = async () => {
  const session = await auth();
  const authorizedRoles = ["ADMIN"];

  //Checks to see if the logged in user has the correct role for this page
  if (!isAuthorized(session, authorizedRoles)) {
    redirect("/not-authorized");
  }

  //Grabs data from the backend before sending everything to the client
  const users = await prismaClient.user.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="flex justify-center w-full h-full">
      <div className="w-full max-w-screen-xl">
        <div className="flex flex-col space-y-5 my-5">
          <h1 className="text-2xl font-bold text-center">User Permissions</h1>
          <AdminTable users={users} />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
