import { authOptions } from "@/lib/AuthOptions";
import NextAuth from "next-auth/next";


const Handler = NextAuth(authOptions)

export async function GET(request: Request) {
    return Handler(request);
}

// Define the POST method
export async function POST(request: Request) {
    return Handler(request);
}
