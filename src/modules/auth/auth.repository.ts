import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma";

/**
 * Find a user by email.
 * Email should already be normalized (lowercase + trimmed)
 * before calling this function.
 *
 * Returns full user record (including password).
 * Use carefully in service layer only.
 */
export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

/**
 * Create a new user.
 * Expects hashed password.
 * Role defaults to USER (defined in Prisma schema).
 *
 * Returns user without password for security.
 */
export const createUser = async (data: Prisma.UserCreateInput) => {
  const user = await prisma.user.create({
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return user;
};
