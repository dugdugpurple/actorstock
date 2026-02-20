import { NextResponse } from "next/server";
import { logError, logInfo } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validations";
import { setSessionCookie, verifyPassword } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const input = loginSchema.parse(json);

    const user = await prisma.user.findUnique({
      where: { email: input.email.toLowerCase() }
    });

    if (!user || !verifyPassword(input.password, user.passwordHash)) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    setSessionCookie({ id: user.id, email: user.email, role: user.role });
    logInfo("POST /api/auth/login", { userId: user.id });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    logError("POST /api/auth/login failed", error);
    return NextResponse.json({ error: "Login failed" }, { status: 400 });
  }
}
