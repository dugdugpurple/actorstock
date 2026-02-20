import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";

const SESSION_COOKIE = "actorstock_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

type SessionPayload = {
  userId: string;
  email: string;
  role: UserRole;
  exp: number;
};

function getAuthSecret() {
  return process.env.AUTH_SECRET || "dev-only-auth-secret-change-me";
}

function signValue(value: string): string {
  return crypto.createHmac("sha256", getAuthSecret()).update(value).digest("base64url");
}

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const digest = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${digest}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, originalDigest] = storedHash.split(":");
  if (!salt || !originalDigest) {
    return false;
  }

  const digest = crypto.scryptSync(password, salt, 64).toString("hex");
  const original = Buffer.from(originalDigest, "hex");
  const computed = Buffer.from(digest, "hex");

  return original.length === computed.length && crypto.timingSafeEqual(original, computed);
}

function encodePayload(payload: SessionPayload): string {
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
}

function decodePayload(encoded: string): SessionPayload | null {
  try {
    const parsed = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
    if (!parsed || typeof parsed !== "object") return null;

    if (
      typeof parsed.userId !== "string" ||
      typeof parsed.email !== "string" ||
      typeof parsed.role !== "string" ||
      typeof parsed.exp !== "number"
    ) {
      return null;
    }

    return parsed as SessionPayload;
  } catch {
    return null;
  }
}

function createToken(payload: SessionPayload): string {
  const body = encodePayload(payload);
  const signature = signValue(body);
  return `${body}.${signature}`;
}

function verifyToken(token: string): SessionPayload | null {
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;

  const expectedSignature = signValue(body);
  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (sigBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
    return null;
  }

  const payload = decodePayload(body);
  if (!payload) return null;
  if (payload.exp < Date.now()) return null;

  return payload;
}

export function setSessionCookie(user: { id: string; email: string; role: UserRole }) {
  const token = createToken({
    userId: user.id,
    email: user.email,
    role: user.role,
    exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000
  });

  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS
  });
}

export function clearSessionCookie() {
  cookies().delete(SESSION_COOKIE);
}

export function getSession() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return null;

  return verifyToken(token);
}

export function requireUser() {
  const session = getSession();
  if (!session) {
    redirect("/login");
  }

  return session;
}

export function requireAdmin() {
  const session = getSession();
  if (!session || session.role !== UserRole.ADMIN) {
    redirect("/login");
  }

  return session;
}
