import { PrismaClient } from "../generated/prisma";
import { PrismaMssql } from "@prisma/adapter-mssql";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function toBoolean(value: string | undefined, fallback: boolean): boolean {
  if (value == null) return fallback;
  const normalized = value.trim().toLowerCase();
  return normalized === "true" || normalized === "1" || normalized === "yes";
}

function createMssqlAdapter() {
  const raw = process.env.DATABASE_URL;
  if (!raw) {
    throw new Error("DATABASE_URL is required to initialize Prisma.");
  }

  const [endpointPart, ...attributeParts] = raw
    .replace(/^sqlserver:\/\//i, "")
    .split(";");
  const [server, portPart] = endpointPart.split(":");
  const port = portPart ? Number(portPart) : 1433;

  const attrs = new Map<string, string>();
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
    throw new Error(
      "DATABASE_URL is not a valid SQL Server connection string.",
    );
  }

  return new PrismaMssql({
    server,
    port,
    database,
    user,
    password,
    options: {
      encrypt: toBoolean(attrs.get("encrypt"), true),
      trustServerCertificate: toBoolean(
        attrs.get("trustservercertificate"),
        false,
      ),
    },
  });
}

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter: createMssqlAdapter() });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
