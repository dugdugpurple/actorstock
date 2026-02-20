import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { getSession } from "@/lib/auth";
import { logError, logInfo } from "@/lib/logger";

const uploadKindMap = {
  image: "images",
  audio: "audio",
  video: "video"
} as const;

type UploadKind = keyof typeof uploadKindMap;

function isUploadKind(value: string): value is UploadKind {
  return value in uploadKindMap;
}

function sanitizeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export async function POST(request: Request) {
  const session = getSession();
  if (!session || session.role !== UserRole.ADMIN) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const formData = await request.formData();
    const kind = formData.get("kind");
    const file = formData.get("file");

    if (typeof kind !== "string" || !isUploadKind(kind)) {
      return NextResponse.json({ error: "Invalid upload kind" }, { status: 400 });
    }

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > 25 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large (max 25MB)" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const targetFolder = uploadKindMap[kind];
    const fileName = `${Date.now()}-${sanitizeFilename(file.name)}`;
    const targetDir = path.join(process.cwd(), "public", "uploads", targetFolder);
    const targetPath = path.join(targetDir, fileName);

    await fs.mkdir(targetDir, { recursive: true });
    await fs.writeFile(targetPath, buffer);

    const url = `/uploads/${targetFolder}/${fileName}`;
    logInfo("POST /api/upload", { kind, fileName, adminId: session.userId });

    return NextResponse.json({ url });
  } catch (error) {
    logError("POST /api/upload failed", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
