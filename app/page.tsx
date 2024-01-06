import { auth } from "@/auth";
import { Clipboard } from "lucide-react";
import Image from "next/image";

export default async function HomePage() {
  const session = await auth();

  return (
    <div className=" h-5/6 flex justify-center">
      <div className="flex flex-col h-full w-full max-w-screen-xl items-center justify-center gap-y-3 text-center">
        <Clipboard className="w-24 h-24" />
        <h1 className="text-3xl font-semibold">Suggestions and Complaints</h1>
        <p className="text-lg font-semibold">
          Go here to submit a suggestion or complaint
        </p>
      </div>
    </div>
  );
}
