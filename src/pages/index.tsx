import { api } from "(~/)/utils/api";
import { SignInButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import { LoadingPage } from "../components/loading";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { PageLayout } from "../components/layout";
import { PostView } from "../components/postView";
import Link from "next/link";

dayjs.extend(relativeTime);

const Home: NextPage = () => {
  const { isSignedIn, user } = useUser();

  if (!user) return <div />;

  const hasUsername = user.username;

  return (
    <PageLayout>
      <div className="flex flex-col">
        <div className=" border-y border-slate-400 p-4">
          {!isSignedIn && (
            <div className="flex justify-center">
              <SignInButton />
            </div>
          )}
          {!hasUsername && (
            <Link href={`/user/${user.id}`} className="flex justify-center">
              <div className="flex w-40 justify-center rounded-full bg-blue-500">
                <span>Add Username</span>
              </div>
            </Link>
          )}
          {isSignedIn && hasUsername && <CreatePostWizard />}
        </div>
        <Feed />
      </div>
    </PageLayout>
  );
};

const CreatePostWizard = () => {
  const { user } = useUser();

  const [input, setInput] = useState<string>("");

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.posts.getAll.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage?.[0]) {
        toast.error(errorMessage[0]!);
      } else {
        toast.error("Failed to post! Please try again later.");
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
        placeholder="Type some emojis!"
        className="grow bg-transparent outline-none"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isPosting}
      />
      <button onClick={() => mutate({ content: input })}>Post</button>
    </div>
  );
};

const Feed = () => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();

  if (postsLoading)
    return (
      <div className="flex flex-col">
        <LoadingPage />
      </div>
    );

  if (!data) return <div>Something went wrong</div>;

  return (
    <div className="flex flex-col">
      {data.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

export default Home;
