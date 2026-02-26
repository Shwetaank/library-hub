import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

type Role = "USER" | "ADMIN";

/**
 * ---------------------------------------------------------
 * ROLE AUTHORIZATION MIDDLEWARE
 * ---------------------------------------------------------
 * Usage:
 * const response = await requireRole(req, "ADMIN");
 * if (response) return response;
 */
export async function requireRole(req: NextRequest, role: Role) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== role) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return null;
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
