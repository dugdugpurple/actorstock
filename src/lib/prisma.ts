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
  if (!(error instanceof Error)) {
    return false;
  }

  return /can't reach database server|p1001|econnrefused|localhost:5432/i.test(error.message);
}
