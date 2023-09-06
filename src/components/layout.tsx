import Link from "next/link";
import type { PropsWithChildren } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineSelect } from "react-icons/ai";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="flex h-screen flex-col justify-center md:flex-row">
      <div>
        <div className="flex justify-around py-2 md:flex-col ">
          <a href="./">
            <AiOutlineHome className="h-10 w-10 md:mx-2 md:my-2"></AiOutlineHome>
          </a>
          <Link href="https://portfolibo.vercel.app/">
            <AiOutlineSelect className="h-10 w-10 md:mx-2 md:my-2"></AiOutlineSelect>
          </Link>
        </div>
      </div>
      <div className=" max-w-[600px] overflow-y-auto border-x border-slate-400">
        {props.children}
      </div>
      <div></div>
    </main>
  );
};
