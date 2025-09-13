import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Clear the auth token cookie
    const response = NextResponse.redirect(new URL("/", req.url));
    response.cookies.set("authToken", "", {
      httpOnly: true,
      path: "/",
      maxAge: 0,
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    console.error("Error in logout:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
