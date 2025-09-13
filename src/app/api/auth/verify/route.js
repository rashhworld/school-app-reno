import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;

    if (!token) {
      return NextResponse.json(
        { authenticated: false, error: "No token provided" },
        { status: 401 }
      );
    }

    const verification = verifyToken(token);

    if (!verification.valid) {
      return NextResponse.json(
        { authenticated: false, error: verification.error },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { authenticated: true, email: verification.email },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in auth verify:", error);
    return NextResponse.json(
      { authenticated: false, error: "Internal server error" },
      { status: 500 }
    );
  }
};
