import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "(~/)/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { clerkClient } from "@clerk/nextjs";
import { filterUserForClient } from "../../helpers/filterUserForClient";

export const profileRouter = createTRPCRouter({
  getUserByUsername: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input }) => {
      const [user] = await clerkClient.users.getUserList({
        username: [input.username],
      });

      if (!user) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "User not found",
        });
      }

      return filterUserForClient(user);
    }),

  updateUsernameByUser: privateProcedure
    .input(
      z.object({
        content: z.string().min(1, "Username Empty").max(30),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      const params = { username: input.content };

      const user = await clerkClient.users.updateUser(userId, params);

      return user;
    }),
});
