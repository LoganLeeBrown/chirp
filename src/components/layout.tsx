import Link from "next/link";
import type { PropsWithChildren } from "react";
import { AiOutlineHome } from "react-icons/ai";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="flex h-screen flex-col justify-center md:flex-row">
      <div>
        <div className="flex items-center justify-center py-2 md:flex-col">
          <Link href="https://portfolibo.vercel.app/">
            <AiOutlineHome className="h-10 w-10"></AiOutlineHome>
          </Link>
        </div>
      </div>
      <div className="overflow-y-auto border-x border-slate-400">
        {props.children}
      </div>
      <div></div>
    </main>
  );
};
