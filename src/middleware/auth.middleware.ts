import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET!;

const secret = new TextEncoder().encode(JWT_SECRET);

/**
 * ---------------------------------------------------------
 * AUTHENTICATION MIDDLEWARE
 * ---------------------------------------------------------
 * - Verifies JWT
 * - Protects private routes
 * - Does NOT check roles
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtectedRoute =
    pathname.startsWith("/dashboard") || pathname.startsWith("/admin");

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    // Validate payload shape
    if (
      typeof payload.userId !== "number" ||
      (payload.role !== "USER" && payload.role !== "ADMIN")
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
