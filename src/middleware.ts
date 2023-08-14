import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware();

console.log("Running Middleware");

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};