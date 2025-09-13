import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export async function getAuthUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, secret);
    return { email: decoded.email };
  } catch (error) {
    return null;
  }
}

export function createToken(email) {
  return jwt.sign({ email }, secret, { expiresIn: "24h" });
}

// Token verification for middleware
export function verifyToken(token) {
  try {
    if (!token || !secret) {
      return { valid: false, error: "No token or secret" };
    }

    // JWT decode without verification for middleware
    const parts = token.split(".");
    if (parts.length !== 3) {
      return { valid: false, error: "Invalid token format" };
    }

    const payload = JSON.parse(atob(parts[1]));

    // Check if token is expired
    if (payload.exp && payload.exp < Date.now() / 1000) {
      return { valid: false, error: "Token expired" };
    }

    return { valid: true, email: payload.email };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}
