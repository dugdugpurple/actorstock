import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/auth";
import { logInfo } from "@/lib/logger";

export async function POST() {
  clearSessionCookie();
  logInfo("POST /api/auth/logout");
  return NextResponse.json({ success: true });
}
