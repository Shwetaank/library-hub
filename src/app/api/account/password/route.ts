import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,100}$/;

export async function PATCH(request: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const currentPassword = String(body.currentPassword ?? "");
  const newPassword = String(body.newPassword ?? "");

  if (!passwordRegex.test(newPassword)) {
    return Response.json(
      {
        message:
          "New password must be 8 to 100 characters and include uppercase, lowercase, and a number",
      },
      { status: 400 },
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      password: true,
    },
  });

  if (!existingUser) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }

  const isValid = await bcrypt.compare(currentPassword, existingUser.password);

  if (!isValid) {
    return Response.json({ message: "Current password is incorrect" }, { status: 400 });
  }

  const password = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: { id: user.id },
    data: { password },
  });

  return Response.json({ ok: true });
}
