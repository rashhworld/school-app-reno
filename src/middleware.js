import { NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

export async function middleware(request) {
  // Protect the add school page
  if (request.nextUrl.pathname === "/add") {
    const token = request.cookies.get("authToken")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const verification = verifyToken(token);

    if (!verification.valid) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/add"],
};
