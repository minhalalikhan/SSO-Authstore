import { authOptions } from "@/lib/AuthOptions";
import { getAccessToken, VerifyToken } from "@/store/store";

import { getServerSession } from "next-auth";

import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    // verify token and get Data
    const parseReq = await req.json()

    const { AuthCode, ClientID, ClientKey } = parseReq.body


    if (!AuthCode || !ClientID || !ClientKey) {

        return NextResponse.json({ error: 'Incomplete Fields' }, { status: 400 })
    }

    const result = VerifyToken(AuthCode, ClientID, ClientKey)

    if (!result) {

        return NextResponse.json({ error: 'Invalid Credentials' }, { status: 401 })

    }


    return NextResponse.json({ data: result.userEmail }, { status: 200 })
    // return NextResponse.json({ ...result }, { status: 200 })
}

export async function GET(req: NextRequest) {
    //  get access token
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ error: "UnAuthorized" }, { status: 401 });
    }
    const usermail = session?.user?.email


    const { searchParams } = new URL(req.url); // Get query parameters

    const query = searchParams.get("appid"); // Get "query" param
    const nexturl = searchParams.get("next"); // Get "next" param

    if (!query) {
        return NextResponse.json({ error: "Missing query parameter" }, { status: 400 });
    }

    const access_token = getAccessToken(query, usermail || '')
    if (!access_token)
        return NextResponse.json({ error: "Invalid App ID" }, { status: 404 });


    return NextResponse.json({
        data: `${nexturl}?token=${access_token}`
    })
    // return NextResponse.redirect(`${nexturl}?token=${access_token}`)
}