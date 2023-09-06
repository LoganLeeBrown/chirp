import { PageLayout } from "(~/)/components/layout";
import { api } from "(~/)/utils/api";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-hot-toast";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function Post() {
  const { user } = useUser();

  if (!user) return <div />;

  return (
    <PageLayout>
      <div className="flex justify-center border-y border-slate-400 p-4">
        {!user.username && <CreateUserNameWizard />}
        {user.username && <span className="h-5">Username Added</span>}
      </div>
      <div className="w-30 flex h-10 justify-center border-b py-2">
        <Link href={"/"} className="">
          <span className="rounded-full bg-blue-500 px-2 py-1">
            Return to Home Page
          </span>
        </Link>
      </div>
    </PageLayout>
  );
}

const CreateUserNameWizard = () => {
  const { user } = useUser();

  const [input, setInput] = useState<string>("");

  if (!user) return null;

  const { mutate, isLoading: isPosting } =
    api.profile.updateUsernameByUser.useMutation({
      onSuccess: () => {
        setInput("");
        window.location.reload();
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors.content;
        if (errorMessage?.[0]) {
          toast.error(errorMessage[0]!);
        } else {
          toast.error("Failed to update! Please try again later.");
        }
      },
    });

  console.log(user);

  if (!user) return null;

  return (
    <div className="flex gap-3">
      <Image
        src={user.imageUrl}
        alt="Profile image"
        className="h-14 w-14 rounded-full"
        width={56}
        height={56}
      />
      <input
        placeholder="Input Username"
        className="grow bg-transparent outline-none"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isPosting}
      />
      <button
        className="mt-2 h-10 w-20 rounded-full bg-blue-500"
        onClick={() => mutate({ content: input })}
      >
        Upload
      </button>
    </div>
  );
};
