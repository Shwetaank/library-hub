/* eslint-disable @typescript-eslint/no-require-imports */
require("dotenv/config");

const { PrismaClient } = require("../src/generated/prisma");
const { PrismaMssql } = require("@prisma/adapter-mssql");

const seededBooks = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self Help",
    description:
      "A practical guide to building better habits, breaking destructive routines, and creating systems that make steady improvement sustainable.",
    totalCopies: 12,
    available: 9,
    coverUrl: "/images/covers/atomic-habits.jpg",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    description:
      "A philosophical adventure about purpose, courage, and the pursuit of a personal legend through a deceptively simple journey.",
    totalCopies: 8,
    available: 5,
    coverUrl: "/images/covers/the-alchemist.jpg",
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "History",
    description:
      "An expansive narrative on human evolution, civilization, and the ideas that shaped modern societies across continents and eras.",
    totalCopies: 10,
    available: 7,
    coverUrl: "/images/covers/sapiens.jpg",
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    description:
      "A chilling political novel about surveillance, authoritarian control, language manipulation, and the fragility of individual freedom.",
    totalCopies: 9,
    available: 4,
    coverUrl: "/images/covers/1984.jpg",
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    genre: "Productivity",
    description:
      "A focused argument for cultivating concentration in a distracted world and using deep effort as a competitive advantage.",
    totalCopies: 7,
    available: 6,
    coverUrl: "/images/covers/deep-work.jpg",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    description:
      "A classic social novel blending wit, family expectations, and the changing relationship between Elizabeth Bennet and Mr. Darcy.",
    totalCopies: 6,
    available: 3,
    coverUrl: "/images/covers/pride-and-prejudice.jpg",
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    genre: "Science Fiction",
    description:
      "A sweeping interstellar saga of politics, prophecy, ecology, and power centered on the desert world of Arrakis.",
    totalCopies: 11,
    available: 8,
    coverUrl: "/images/covers/dune.jpg",
  },
  {
    title: "The Silent Patient",
    author: "Alex Michaelides",
    genre: "Mystery",
    description:
      "A psychological thriller built around trauma, obsession, and the unraveling of a violent event that no one can explain.",
    totalCopies: 5,
    available: 2,
    coverUrl: "/images/covers/the-silent-patient.jpg",
  },
  {
    title: "Educated",
    author: "Tara Westover",
    genre: "Memoir",
    description:
      "A memoir about family, isolation, and education as a path toward self-definition, agency, and intellectual freedom.",
    totalCopies: 8,
    available: 6,
    coverUrl: "/images/covers/educated.jpg",
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    description:
      "An enduring adventure about courage, friendship, greed, and growth as Bilbo Baggins is drawn into a dangerous quest.",
    totalCopies: 10,
    available: 7,
    coverUrl: "/images/covers/the-hobbit.jpg",
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    genre: "Psychology",
    description:
      "An exploration of human decision-making, cognitive biases, and the tension between intuitive and analytical thinking.",
    totalCopies: 9,
    available: 5,
    coverUrl: "/images/covers/thinking-fast-and-slow.jpg",
  },
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "Contemporary Fiction",
    description:
      "A reflective novel about regret, possibility, and the imagined paths of lives not lived through a magical library between worlds.",
    totalCopies: 7,
    available: 4,
    coverUrl: "/images/covers/the-midnight-library.jpg",
  },
];

function toBoolean(value, fallback) {
  if (value == null) return fallback;
  const normalized = value.trim().toLowerCase();
  return normalized === "true" || normalized === "1" || normalized === "yes";
}

function createMssqlAdapter() {
  const raw = process.env.DATABASE_URL;

  if (!raw) {
    throw new Error("DATABASE_URL is required to initialize Prisma.");
  }

  const [endpointPart, ...attributeParts] = raw.replace(/^sqlserver:\/\//i, "").split(";");
  const [server, portPart] = endpointPart.split(":");
  const port = portPart ? Number(portPart) : 1433;

  const attrs = new Map();
  for (const part of attributeParts) {
    if (!part) continue;
    const [key, ...valueRest] = part.split("=");
    if (!key || valueRest.length === 0) continue;
    attrs.set(key.trim().toLowerCase(), valueRest.join("=").trim());
  }

  const database = attrs.get("database");
  const user = attrs.get("user");
  const password = attrs.get("password");

  if (!server || !database || !user || !password || Number.isNaN(port)) {
    throw new Error("DATABASE_URL is not a valid SQL Server connection string.");
  }

  return new PrismaMssql({
    server,
    port,
    database,
    user,
    password,
    options: {
      encrypt: toBoolean(attrs.get("encrypt"), true),
      trustServerCertificate: toBoolean(attrs.get("trustservercertificate"), false),
    },
  });
}

const prisma = new PrismaClient({
  adapter: createMssqlAdapter(),
});

async function main() {
  await prisma.book.deleteMany({
    where: {
      OR: seededBooks.map((book) => ({
        title: book.title,
        author: book.author,
      })),
    },
  });

  await prisma.book.createMany({
    data: seededBooks,
  });

  const count = await prisma.book.count();
  console.log(`Seeded ${seededBooks.length} books. Catalog now has ${count} books.`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
