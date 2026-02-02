import { NextRequest, NextResponse } from "next/server";

// Simple authentication - In production, use proper authentication (JWT, sessions, etc.)
const ADMIN_PASSWORD = "admin123"; // Change this in production

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (password === ADMIN_PASSWORD) {
      return NextResponse.json({ success: true, authenticated: true });
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid password" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Authentication failed" },
      { status: 500 }
    );
  }
}

