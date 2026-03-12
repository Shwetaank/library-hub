import { prisma } from "@/lib/prisma";
import { ROLES } from "@/constants/roles";

function formatRelativeDueDate(date: Date) {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return `${Math.abs(diffDays)} day${Math.abs(diffDays) === 1 ? "" : "s"} overdue`;
  }
  if (diffDays === 0) return "Due today";
  if (diffDays === 1) return "Due tomorrow";
  return `Due in ${diffDays} days`;
}

export async function getUserDashboardData(userId: number) {
  const [user, activeBorrows, borrowHistory, favorites, catalogStats] =
    await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      }),
      prisma.borrow.findMany({
        where: { userId, returned: false },
        orderBy: { dueDate: "asc" },
        include: {
          book: {
            select: {
              id: true,
              title: true,
              author: true,
              genre: true,
              available: true,
            },
          },
        },
        take: 6,
      }),
      prisma.borrow.findMany({
        where: { userId },
        orderBy: { borrowedAt: "desc" },
        include: {
          book: {
            select: {
              title: true,
              author: true,
              genre: true,
            },
          },
        },
        take: 8,
      }),
      prisma.favorite.findMany({
        where: { userId },
        orderBy: { id: "desc" },
        include: {
          book: {
            select: {
              id: true,
              title: true,
              author: true,
              genre: true,
              available: true,
            },
          },
        },
        take: 5,
      }),
      prisma.book.aggregate({
        _count: { id: true },
        _sum: { available: true, totalCopies: true },
      }),
    ]);

  if (!user) {
    return null;
  }

  const now = new Date();
  const overdueCount = activeBorrows.filter((borrow) => borrow.dueDate < now).length;
  const returnedCount = borrowHistory.filter((borrow) => borrow.returned).length;
  const readingGenres = new Set(
    borrowHistory.map((borrow) => borrow.book.genre).filter(Boolean),
  ).size;

  return {
    user,
    hero: {
      activeBorrows: activeBorrows.length,
      overdueCount,
      favorites: favorites.length,
      completedReads: returnedCount,
    },
    quickStats: [
      {
        label: "Borrowed right now",
        value: String(activeBorrows.length),
        helper: overdueCount > 0 ? `${overdueCount} need attention` : "All on track",
      },
      {
        label: "Reading range",
        value: `${readingGenres || 1}`,
        helper: `${readingGenres || 1} genres explored`,
      },
      {
        label: "Saved titles",
        value: String(favorites.length),
        helper: "Favorites list ready",
      },
      {
        label: "Catalog access",
        value: String(catalogStats._count.id ?? 0),
        helper: `${catalogStats._sum.available ?? 0} copies available`,
      },
    ],
    activeBorrows: activeBorrows.map((borrow) => ({
      id: borrow.id,
      title: borrow.book.title,
      author: borrow.book.author,
      genre: borrow.book.genre,
      dueDate: borrow.dueDate,
      borrowedAt: borrow.borrowedAt,
      status: borrow.dueDate < now ? "Overdue" : "Active",
      dueLabel: formatRelativeDueDate(borrow.dueDate),
    })),
    timeline: borrowHistory.map((borrow) => ({
      id: borrow.id,
      title: borrow.book.title,
      author: borrow.book.author,
      genre: borrow.book.genre,
      borrowedAt: borrow.borrowedAt,
      returned: borrow.returned,
      dueDate: borrow.dueDate,
    })),
    favorites: favorites.map((favorite) => ({
      id: favorite.id,
      title: favorite.book.title,
      author: favorite.book.author,
      genre: favorite.book.genre,
      available: favorite.book.available,
    })),
  };
}

export async function getAdminDashboardData() {
  const [totals, activeBorrows, recentBorrows, contactRequests, lowStockBooks, recentMembers] =
    await Promise.all([
      Promise.all([
        prisma.user.count(),
        prisma.user.count({ where: { role: ROLES.ADMIN } }),
        prisma.book.count(),
        prisma.borrow.count(),
        prisma.borrow.count({ where: { returned: false } }),
        prisma.borrow.count({ where: { returned: false, dueDate: { lt: new Date() } } }),
        prisma.contactRequest.count(),
      ]),
      prisma.borrow.findMany({
        where: { returned: false },
        orderBy: { dueDate: "asc" },
        take: 7,
        include: {
          user: {
            select: { name: true, email: true },
          },
          book: {
            select: { title: true, author: true, genre: true },
          },
        },
      }),
      prisma.borrow.findMany({
        orderBy: { borrowedAt: "desc" },
        take: 8,
        include: {
          user: {
            select: { name: true, role: true },
          },
          book: {
            select: { title: true },
          },
        },
      }),
      prisma.contactRequest.findMany({
        orderBy: { createdAt: "desc" },
        take: 6,
      }),
      prisma.book.findMany({
        where: { available: { lte: 2 } },
        orderBy: [{ available: "asc" }, { updatedAt: "desc" }],
        take: 6,
      }),
      prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        take: 6,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      }),
    ]);

  const [
    totalUsers,
    totalAdmins,
    totalBooks,
    totalBorrows,
    liveBorrows,
    overdueBorrows,
    totalContacts,
  ] = totals;

  return {
    metrics: [
      {
        label: "Total catalog titles",
        value: String(totalBooks),
        helper: "Books currently modeled in Prisma",
      },
      {
        label: "Active members",
        value: String(totalUsers - totalAdmins),
        helper: `${totalAdmins} admin account${totalAdmins === 1 ? "" : "s"}`,
      },
      {
        label: "Live circulation",
        value: String(liveBorrows),
        helper: overdueBorrows > 0 ? `${overdueBorrows} overdue loans` : "No overdue loans",
      },
      {
        label: "Support queue",
        value: String(totalContacts),
        helper: "Contact requests in the database",
      },
    ],
    overview: {
      totalUsers,
      totalAdmins,
      totalBooks,
      totalBorrows,
      liveBorrows,
      overdueBorrows,
      totalContacts,
    },
    activeBorrows: activeBorrows.map((borrow) => ({
      id: borrow.id,
      member: borrow.user.name,
      email: borrow.user.email,
      title: borrow.book.title,
      author: borrow.book.author,
      genre: borrow.book.genre,
      dueDate: borrow.dueDate,
      status: borrow.dueDate < new Date() ? "Overdue" : "On track",
    })),
    recentBorrows: recentBorrows.map((borrow) => ({
      id: borrow.id,
      title: borrow.book.title,
      member: borrow.user.name,
      role: borrow.user.role,
      borrowedAt: borrow.borrowedAt,
      returned: borrow.returned,
    })),
    contactRequests,
    lowStockBooks,
    recentMembers,
  };
}
