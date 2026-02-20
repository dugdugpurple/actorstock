import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "actorstock_session";

type SessionPayload = {
  userId: string;
  email: string;
  role: "USER" | "ADMIN";
  exp: number;
};

function decodeBase64UrlToBytes(value: string): Uint8Array {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4 || 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

function decodePayload(encoded: string): SessionPayload | null {
  try {
    const decoded = new TextDecoder().decode(decodeBase64UrlToBytes(encoded));
    const payload = JSON.parse(decoded) as SessionPayload;

    if (!payload?.userId || !payload?.email || !payload?.role || typeof payload?.exp !== "number") {
      return null;
    }

    if (payload.role !== "USER" && payload.role !== "ADMIN") {
      return null;
    }

    if (payload.exp < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  const [body, signature] = token.split(".");
  if (!body || !signature) {
    return null;
  }

  const secret = process.env.AUTH_SECRET || "dev-only-auth-secret-change-me";
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );

  const valid = await crypto.subtle.verify(
    "HMAC",
    key,
    decodeBase64UrlToBytes(signature),
    new TextEncoder().encode(body)
  );

  if (!valid) {
    return null;
  }

  return decodePayload(body);
}

function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL("/login", request.url);
  const from = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  loginUrl.searchParams.set("from", from);
  return NextResponse.redirect(loginUrl);
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  if (!token) {
    return redirectToLogin(request);
  }

  const session = await verifySessionToken(token);
  if (!session) {
    return redirectToLogin(request);
  }

  if (request.nextUrl.pathname.startsWith("/admin") && session.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/account", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/license/:path*", "/admin/:path*"]
};
