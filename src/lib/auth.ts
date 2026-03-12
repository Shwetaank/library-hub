import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";
import { ROLES, type AppRole } from "@/constants/roles";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

type SessionPayload = {
  userId?: number;
  role?: AppRole;
};

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    const session = payload as SessionPayload;

    if (
      typeof session.userId !== "number" ||
      (session.role !== ROLES.ADMIN && session.role !== ROLES.USER)
    ) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  const session = await getSession();

  if (!session) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    return null;
  }

  return {
    ...user,
    role: user.role as AppRole,
  };
}

export async function requireAuthenticatedUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function requireAdminUser() {
  const user = await requireAuthenticatedUser();

  if (user.role !== ROLES.ADMIN) {
    redirect("/dashboard");
  }

  return user;
}
