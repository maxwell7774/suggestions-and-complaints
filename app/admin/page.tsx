import { auth } from "@/auth";
import isAuthorized from "@/lib/is-authorized";
import { prismaClient } from "@/prisma-client";
import { redirect } from "next/navigation";
import React from "react";
import AdminTable from "./_components/admin-table";

const AdminPage = async () => {
  const session = await auth();
  const authorizedRoles = ["ADMIN"];

  if (!isAuthorized(session, authorizedRoles)) {
    redirect("/auth/not-authorized");
  }

  const users = await prismaClient.user.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="flex justify-center w-full h-full">
      <div className="w-full max-w-screen-lg">
        <div className="flex flex-col space-y-5 my-5">
          <h1 className="text-2xl font-bold text-center">User Permissions</h1>
          <AdminTable users={users} />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
