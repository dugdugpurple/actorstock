import { NextResponse } from "next/server";
import { logInfo } from "@/lib/logger";

export async function POST(request: Request) {
  const body = await request.text();
  logInfo("POST /api/stripe/webhook (mock)", { payloadSize: body.length });

  return NextResponse.json({
    received: true,
    mode: "mock",
    message: "Stripe webhook placeholder for future integration"
  });
}
