import { serialize } from "cookie";

/**
 * ---------------------------------------------------------
 * LOGOUT ENDPOINT
 * ---------------------------------------------------------
 * Clears authentication cookie.
 */
export async function POST() {
  const cookie = serialize("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0, // Expire immediately
  });

  return new Response(JSON.stringify({ message: "Logged out successfully" }), {
    status: 200,
    headers: {
      "Set-Cookie": cookie,
      "Content-Type": "application/json",
    },
  });
}
