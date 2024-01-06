import { auth } from "@/auth";
import { prismaClient } from "@/prisma-client";
import MessageSelect from "./_components/message-select";

const UserPage = async () => {
  const session = await auth();

  const suggestionRecipients = await prismaClient.user.findMany({
    where: { suggestionRecipient: true },
  });
  const complaintRecipients = await prismaClient.user.findMany({
    where: { complaintRecipient: true },
  });

  const user = await prismaClient.user.findUnique({
    where: { id: session?.user.id },
  });

  return (
    <div className="h-full w-full flex justify-center">
      <div className="w-full max-w-screen-xl py-5">
        {user ? (
          <MessageSelect
            sender={user}
            suggestionRecipients={suggestionRecipients}
            complaintRecipients={complaintRecipients}
          />
        ) : (
          <div>
            Could not find your user. Please refresh the page and try again.
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
