import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/"],
  secretKey: "sk_test_MI241X3UGlGNqjwRA14MJfJA3Pm8O2usGz88fD6ojM",
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
