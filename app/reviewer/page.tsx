import MessagesDatatable from "./_components/messages-datatable";
import { auth } from "@/auth";
import isAuthorized from "@/lib/is-authorized";
import { redirect } from "next/navigation";
import ReportGenerator from "./_components/report-generator";

const ReviewerPage = async () => {
  const session = await auth();
  const authorizedRoles = ["REVIEWER", "ADMIN"];

  //Checks for page authorization
  if (!isAuthorized(session, authorizedRoles)) {
    redirect("/not-authorized");
  }

  return (
    <div className="flex justify-center h-full w-full">
      <div className="w-full max-w-screen-xl py-5">
        <h1 className="text-2xl font-bold text-center mb-5">Review Messages</h1>
        <MessagesDatatable />
        <ReportGenerator />
      </div>
    </div>
  );
};

export default ReviewerPage;
