import { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

/**
 * ---------------------------------------------------------
 * GET CURRENT AUTHENTICATED USER
 * ---------------------------------------------------------
 */
export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    if (typeof payload.userId !== "number") {
      return Response.json({ message: "Invalid token" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        createdAt: true,
      },
    });

    return Response.json(user);
  } catch {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}
