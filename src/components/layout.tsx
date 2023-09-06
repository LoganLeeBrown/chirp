import Link from "next/link";
import type { PropsWithChildren } from "react";
import { AiOutlineHome } from "react-icons/ai";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="flex h-screen justify-center">
      <div className="w-1/4 flex-col justify-end">
        <div className="flex justify-end py-3 pr-3 text-white">
          <Link href="https://portfolibo.vercel.app/">
            <AiOutlineHome className="flex h-10 w-10"></AiOutlineHome>
          </Link>
        </div>
      </div>
      <div className=" h-full w-2/4 overflow-y-auto border-x border-slate-400 sm:w-3/4 md:max-w-2xl">
        {props.children}
      </div>
      <div className="flex sm:w-0 lg:w-1/4"></div>
    </main>
  );
};
