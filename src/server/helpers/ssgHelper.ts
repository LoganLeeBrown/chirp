import { prisma } from "../../server/db";
import { createServerSideHelpers } from "@trpc/react-query/server";
import superJSON from "superjson";
import { appRouter } from "../../server/api/root";

export const generateSSGHelper = () =>
  createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: superJSON, // optional - adds superjson serialization
  });
