import { authOptions } from "@/lib/AuthOptions";
import NextAuth from "next-auth/next";


const Handler = NextAuth(authOptions)
export { Handler as GET, Handler as POST };

