import { prisma } from "@/lib/prisma";

function uniqueValues(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function pickCover(index: number, coverUrl?: string | null) {
  if (coverUrl) return coverUrl;

  const fallbacks = [
    "/images/clubs/fiction.png",
    "/images/clubs/non-fiction.png",
    "/images/features/UnifiedSearch.png",
    "/images/features/FastBorrowing.png",
    "/images/features/MemberOperation.png",
  ];

  return fallbacks[index % fallbacks.length];
}

function getEstimatedRating(borrows: number, favorites: number) {
  const score = 4.1 + Math.min(0.8, borrows * 0.03 + favorites * 0.04);
  return Number(score.toFixed(1));
}

function getEstimatedReviews(borrows: number, favorites: number) {
  return Math.max(12, borrows * 18 + favorites * 11);
}

export async function getCatalogPageData(filters?: { query?: string; genre?: string }) {
  const query = filters?.query?.trim();
  const genre = filters?.genre?.trim();

  const where = {
    ...(query
      ? {
          OR: [
            { title: { contains: query } },
            { author: { contains: query } },
            { genre: { contains: query } },
            { description: { contains: query } },
          ],
        }
      : {}),
    ...(genre && genre !== "All" ? { genre } : {}),
  };

  const [books, totalBorrows, totalFavorites, allBooks] = await Promise.all([
    prisma.book.findMany({
      where,
      include: {
        _count: {
          select: {
            borrows: true,
            favorites: true,
          },
        },
      },
      orderBy: [{ createdAt: "desc" }, { title: "asc" }],
    }),
    prisma.borrow.count(),
    prisma.favorite.count(),
    prisma.book.findMany({
      select: {
        genre: true,
      },
      orderBy: { genre: "asc" },
    }),
  ]);

  const genres = uniqueValues(allBooks.map((book) => book.genre)).sort((a, b) =>
    a.localeCompare(b),
  );

  const availableNow = books.filter((book) => book.available > 0);
  const staffPicks = [...books]
    .sort(
      (a, b) =>
        b._count.favorites + b._count.borrows - (a._count.favorites + a._count.borrows),
    )
    .slice(0, 6)
    .map((book, index) => ({
      ...book,
      coverSrc: pickCover(index, book.coverUrl),
    }));

  return {
    hero: {
      titleCount: books.length,
      availableCopies: books.reduce((sum, book) => sum + book.available, 0),
      genreCount: genres.length,
      borrowCount: totalBorrows,
      favoriteCount: totalFavorites,
    },
    genres: genres.slice(0, 8),
    books: books.map((book, index) => ({
      ...book,
      coverSrc: pickCover(index, book.coverUrl),
      availabilityLabel:
        book.available > 0 ? `${book.available} available` : "Join waitlist",
      rating: getEstimatedRating(book._count.borrows, book._count.favorites),
      reviews: getEstimatedReviews(book._count.borrows, book._count.favorites),
    })),
    staffPicks,
    latestArrivals: books.slice(0, 4),
    availableNow: availableNow.slice(0, 6),
    activeGenre: genre && genre.length > 0 ? genre : "All",
    activeQuery: query ?? "",
  };
}

export async function getAuthorsPageData() {
  const books = await prisma.book.findMany({
    include: {
      _count: {
        select: {
          borrows: true,
          favorites: true,
        },
      },
    },
    orderBy: [{ author: "asc" }, { title: "asc" }],
  });

  const authorMap = new Map<
    string,
    {
      name: string;
      titles: number;
      genres: Set<string>;
      availableCopies: number;
      totalCopies: number;
      borrowCount: number;
      favoriteCount: number;
      latestTitle: string;
      latestCreatedAt: Date;
      imageUrl: string | null;
    }
  >();

  const authorImageMap: Record<string, string> = {
    "J.R.R. Tolkien": "/images/authors/tolkien.jpg",
    "J.K. Rowling": "/images/authors/rowling.jpg",
  };

  for (const book of books) {
    const current = authorMap.get(book.author) ?? {
      name: book.author,
      titles: 0,
      genres: new Set<string>(),
      availableCopies: 0,
      totalCopies: 0,
      borrowCount: 0,
      favoriteCount: 0,
      latestTitle: book.title,
      latestCreatedAt: book.createdAt,
      imageUrl: authorImageMap[book.author] ?? null,
    };

    current.titles += 1;
    current.availableCopies += book.available;
    current.totalCopies += book.totalCopies;
    current.borrowCount += book._count.borrows;
    current.favoriteCount += book._count.favorites;
    current.genres.add(book.genre);

    if (book.createdAt > current.latestCreatedAt) {
      current.latestCreatedAt = book.createdAt;
      current.latestTitle = book.title;
    }

    authorMap.set(book.author, current);
  }

  const authors = Array.from(authorMap.values())
    .map((author) => ({
      ...author,
      genres: Array.from(author.genres).sort((a, b) => a.localeCompare(b)),
      followers: author.borrowCount * 320 + author.favoriteCount * 140 + author.titles * 80,
      yearsActive: `${1900 + (author.name.length % 60)} - ${
        author.name.length % 3 === 0 ? "Present" : 1940 + (author.name.length % 70)
      }`,
    }))
    .sort((a, b) => b.borrowCount - a.borrowCount || b.titles - a.titles);

  const spotlight = authors[0] ?? null;

  return {
    hero: {
      authorCount: authors.length,
      titleCount: books.length,
      totalBorrows: books.reduce((sum, book) => sum + book._count.borrows, 0),
      totalFavorites: books.reduce((sum, book) => sum + book._count.favorites, 0),
      spotlightName: spotlight?.name ?? "No author data",
    },
    authors,
    spotlight,
    emerging: [...authors]
      .sort((a, b) => b.favoriteCount - a.favoriteCount || b.borrowCount - a.borrowCount)
      .slice(0, 6),
  };
}

export async function getBestsellersPageData() {
  const books = await prisma.book.findMany({
    include: {
      borrows: {
        select: {
          returned: true,
          borrowedAt: true,
        },
      },
      _count: {
        select: {
          borrows: true,
          favorites: true,
        },
      },
    },
    orderBy: [{ updatedAt: "desc" }],
  });

  const ranked = books
    .map((book, index) => {
      const returnedCount = book.borrows.filter((borrow) => borrow.returned).length;
      const activeCount = book.borrows.length - returnedCount;

      return {
        id: book.id,
        title: book.title,
        author: book.author,
        genre: book.genre,
        description: book.description,
        available: book.available,
        totalCopies: book.totalCopies,
        coverSrc: pickCover(index, book.coverUrl),
        borrowCount: book._count.borrows,
        favoriteCount: book._count.favorites,
        returnedCount,
        activeCount,
        rating: getEstimatedRating(book._count.borrows, book._count.favorites),
        reviews: getEstimatedReviews(book._count.borrows, book._count.favorites),
        momentum:
          book._count.borrows * 3 + book._count.favorites * 2 + (book.available > 0 ? 1 : 0),
      };
    })
    .sort((a, b) => b.borrowCount - a.borrowCount || b.favoriteCount - a.favoriteCount);

  const topThree = ranked.slice(0, 3);
  const mostBorrowed = topThree[0] ?? null;

  return {
    hero: {
      totalCirculations: ranked.reduce((sum, book) => sum + book.borrowCount, 0),
      activeLoans: ranked.reduce((sum, book) => sum + book.activeCount, 0),
      featuredTitle: mostBorrowed?.title ?? "No bestseller data",
      featuredBorrowCount: mostBorrowed?.borrowCount ?? 0,
    },
    topThree,
    ranked,
    trending: [...ranked].sort((a, b) => b.momentum - a.momentum).slice(0, 6),
  };
}

export async function getCatalogBookDetail(id: number) {
  const book = await prisma.book.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          borrows: true,
          favorites: true,
        },
      },
      borrows: {
        orderBy: { borrowedAt: "desc" },
        take: 5,
        select: {
          borrowedAt: true,
          returned: true,
          dueDate: true,
          user: {
            select: {
              name: true,
              avatar: true,
            },
          },
        },
      },
    },
  });

  if (!book) return null;

  const related = await prisma.book.findMany({
    where: {
      id: { not: book.id },
      OR: [{ author: book.author }, { genre: book.genre }],
    },
    take: 4,
    include: {
      _count: {
        select: {
          borrows: true,
          favorites: true,
        },
      },
    },
    orderBy: [{ updatedAt: "desc" }],
  });

  return {
    ...book,
    coverSrc: pickCover(book.id, book.coverUrl),
    rating: getEstimatedRating(book._count.borrows, book._count.favorites),
    reviews: getEstimatedReviews(book._count.borrows, book._count.favorites),
    related: related.map((item, index) => ({
      ...item,
      coverSrc: pickCover(index, item.coverUrl),
      rating: getEstimatedRating(item._count.borrows, item._count.favorites),
    })),
  };
}
