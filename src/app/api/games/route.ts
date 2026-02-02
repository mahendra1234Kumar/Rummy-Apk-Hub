import { NextRequest, NextResponse } from "next/server";
import { getGames, addGame, updateGame, deleteGame } from "@/lib/games";
import { Game } from "@/types/game";

export async function GET() {
  try {
    const games = getGames();
    return NextResponse.json({ success: true, games });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch games" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      image,
      downloadUrl,
      rating,
      bonus,
      downloads,
      minWithdrawal,
      isHot,
      category,
    } = body;

    if (!name || !description) {
      return NextResponse.json(
        { success: false, error: "Name and description are required" },
        { status: 400 }
      );
    }

    const newGame = addGame({
      name,
      description,
      image: image || "/placeholder-game.jpg",
      downloadUrl: downloadUrl || "#",
      rating: rating || 3,
      bonus: bonus || "",
      downloads: downloads || "",
      minWithdrawal: minWithdrawal || "",
      isHot: isHot || false,
      category: category || "General",
    });

    return NextResponse.json({ success: true, game: newGame }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create game" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Game ID is required" },
        { status: 400 }
      );
    }

    const updatedGame = updateGame(id, updates);

    if (!updatedGame) {
      return NextResponse.json(
        { success: false, error: "Game not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, game: updatedGame });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update game" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Game ID is required" },
        { status: 400 }
      );
    }

    const deleted = deleteGame(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Game not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Game deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete game" },
      { status: 500 }
    );
  }
}

