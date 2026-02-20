import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
}

export const prisma =
  global.prismaGlobal ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"]
  });

if (process.env.NODE_ENV !== "production") {
  global.prismaGlobal = prisma;
}

export function isDatabaseConnectionError(error: unknown): boolean {
  if (!error || typeof error !== "object") {
    return false;
  }

  const err = error as { message?: string; name?: string };
  const message = (err.message ?? "").toLowerCase();
  const name = (err.name ?? "").toLowerCase();

  if (name.includes("prismaclientinitializationerror")) {
    return true;
  }

  return (
    message.includes("can't reach database server") ||
    message.includes("p1001") ||
    message.includes("econnrefused") ||
    message.includes("localhost:5432") ||
    message.includes("environment variable `database_url`") ||
    message.includes("you must provide a nonempty url") ||
    message.includes("error validating datasource") ||
    message.includes("error opening a tls connection")
  );
}
