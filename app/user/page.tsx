import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MessageForm from "./_components/message-form";
import MessageSelect from "./_components/message-select";
import { auth } from "@/auth";

const UserPage = async () => {
  const session = await auth();

  return (
    <div className="h-full w-full flex justify-center">
      <div className="w-full max-w-screen-lg py-5">
        {session?.user ? (
          <MessageSelect sender={session?.user} />
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
