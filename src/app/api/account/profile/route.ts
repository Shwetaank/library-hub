import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function PATCH(request: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();

  if (name.length < 2) {
    return Response.json(
      { message: "Name must be at least 2 characters long" },
      { status: 400 },
    );
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return Response.json({ message: "Enter a valid email address" }, { status: 400 });
  }

  const existing = await prisma.user.findFirst({
    where: {
      email,
      NOT: { id: user.id },
    },
    select: { id: true },
  });

  if (existing) {
    return Response.json({ message: "Email is already in use" }, { status: 409 });
  }

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: {
      name,
      email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      updatedAt: true,
    },
  });

  return Response.json(updated);
}
