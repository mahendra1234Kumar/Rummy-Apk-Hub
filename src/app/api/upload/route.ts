import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { mkdir, writeFile } from "fs/promises";
import {
  isCloudinaryConfigured,
  uploadImageToCloudinary,
} from "@/lib/cloudinary";

function createSafeFileName(fileName: string) {
  return fileName
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9.-]/g, "")
    .toLowerCase();
}

async function saveLocally(file: File, buffer: Buffer) {
  const uploadDir = path.join(process.cwd(), "public", "games");

  if (!fs.existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  const safeName = createSafeFileName(file.name);
  const fileName = `${Date.now()}-${safeName}`;
  const filePath = path.join(uploadDir, fileName);

  await writeFile(filePath, buffer);

  return {
    path: `/games/${fileName}`,
    provider: "local",
  };
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Only image files are allowed" },
        { status: 400 }
      );
    }

    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: "File size must be under 2MB" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    if (isCloudinaryConfigured()) {
      const uploadedImage = await uploadImageToCloudinary(buffer, file.name);

      return NextResponse.json({
        success: true,
        path: uploadedImage.secure_url,
        provider: "cloudinary",
      });
    }

    const localUpload = await saveLocally(file, buffer);

    return NextResponse.json({
      success: true,
      path: localUpload.path,
      provider: localUpload.provider,
      message:
        "Cloudinary is not configured, so the image was saved locally instead.",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: "File upload failed" },
      { status: 500 }
    );
  }
}
