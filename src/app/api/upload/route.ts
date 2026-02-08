// import { NextRequest, NextResponse } from "next/server";
// import path from "path";
// import fs from "fs";
// import { mkdir, writeFile } from "fs/promises";

// export async function POST(request: NextRequest) {
//   try {
//     const formData = await request.formData();
//     const file = formData.get("file") as File | null;

//     if (!file) {
//       return NextResponse.json(
//         { success: false, error: "No file provided" },
//         { status: 400 }
//       );
//     }

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const uploadsDir = path.join(process.cwd(), "public", "games");

//     if (!fs.existsSync(uploadsDir)) {
//       await mkdir(uploadsDir, { recursive: true });
//     }

//     const safeName = file.name.replace(/\s+/g, "-").toLowerCase();
//     const fileName = `${Date.now()}-${safeName}`;
//     const filePath = path.join(uploadsDir, fileName);

//     await writeFile(filePath, buffer);

//     const publicPath = `/games/${fileName}`;

//     return NextResponse.json({ success: true, path: publicPath });
//   } catch (error) {
//     console.error("File upload failed:", error);
//     return NextResponse.json(
//       { success: false, error: "File upload failed" },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { mkdir, writeFile } from "fs/promises";

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

    // ✅ Validate file type
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Only image files are allowed" },
        { status: 400 }
      );
    }

    // ✅ Validate file size (2MB)
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: "File size must be under 2MB" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload directory
    const uploadDir = path.join(process.cwd(), "public", "games");

    // Create folder if not exists
    if (!fs.existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Safe filename
    const safeName = file.name
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9.-]/g, "")
      .toLowerCase();

    const fileName = `${Date.now()}-${safeName}`;
    const filePath = path.join(uploadDir, fileName);

    // Save file
    await writeFile(filePath, buffer);

    // Public URL (store this in MongoDB)
    const publicPath = `/games/${fileName}`;

    return NextResponse.json({
      success: true,
      path: publicPath,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: "File upload failed" },
      { status: 500 }
    );
  }
}


