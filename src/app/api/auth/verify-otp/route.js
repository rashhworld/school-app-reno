import { verifyOTP } from "@/lib/otp";
import { createToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    // Verify OTP
    const verification = verifyOTP(email, otp);

    if (!verification.valid) {
      return NextResponse.json({ error: verification.error }, { status: 400 });
    }

    // Create JWT token
    const token = createToken(email);

    // Create response with JSON body
    const response = NextResponse.json(
      { message: "Authentication successful" },
      { status: 200 }
    );

    // Set HTTP-only cookie on the response
    response.cookies.set("authToken", token, {
      httpOnly: true,
      path: "/",
      maxAge: 86400, // 1 day
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    console.error("Error in verify-otp:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
