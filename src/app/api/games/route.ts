import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Game } from "@/app/models/Game";

/**
 * GET – Fetch all games
 */
export async function GET() {
  try {
    await connectDB();

    const games = await Game.find().sort({ createdAt: -1 }).lean();

    // 🔥 FIX: convert _id → id
    const formattedGames = games.map((game: any) => ({
      ...game,
      id: game._id.toString(),
      _id: undefined,
    }));

    return NextResponse.json({
      success: true,
      games: formattedGames,
    });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch games" },
      { status: 500 }
    );
  }
}

/**
 * POST – Create new game
 */
export async function POST(request: NextRequest) {
  try {
    await connectDB();

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

    const newGame = await Game.create({
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

    return NextResponse.json(
      {
        success: true,
        game: {
          ...newGame.toObject(),
          id: newGame._id.toString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create game" },
      { status: 500 }
    );
  }
}

/**
 * PUT – Update game
 */
export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // 🔥 accept id from frontend
    const gameId = body.id || body._id;

    if (!gameId) {
      return NextResponse.json(
        { success: false, error: "Game ID is required" },
        { status: 400 }
      );
    }

    delete body.id;
    delete body._id;

    const updatedGame = await Game.findByIdAndUpdate(
      gameId,
      body,
      { new: true }
    );

    if (!updatedGame) {
      return NextResponse.json(
        { success: false, error: "Game not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      game: {
        ...updatedGame.toObject(),
        id: updatedGame._id.toString(),
      },
    });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update game" },
      { status: 500 }
    );
  }
}

/**
 * DELETE – Delete game
 */
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Game ID is required" },
        { status: 400 }
      );
    }

    const deletedGame = await Game.findByIdAndDelete(id);

    if (!deletedGame) {
      return NextResponse.json(
        { success: false, error: "Game not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Game deleted successfully",
    });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete game" },
      { status: 500 }
    );
  }
}



// import { NextRequest, NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import { Game } from "@/app/models/Game";

// /**
//  * GET – Fetch all games
//  */
// export async function GET() {
//   try {
//     await connectDB();

//     const games = await Game.find().sort({ createdAt: -1 });

//     return NextResponse.json({
//       success: true,
//       games,
//     });
//   } catch (error) {
//     console.error("GET error:", error);
//     return NextResponse.json(
//       { success: false, error: "Failed to fetch games" },
//       { status: 500 }
//     );
//   }
// }

// /**
//  * POST – Create new game
//  */
// export async function POST(request: NextRequest) {
//   try {
//     await connectDB();

//     const body = await request.json();
//     const {
//       name,
//       description,
//       image,
//       downloadUrl,
//       rating,
//       bonus,
//       downloads,
//       minWithdrawal,
//       isHot,
//       category,
//     } = body;

//     if (!name || !description) {
//       return NextResponse.json(
//         { success: false, error: "Name and description are required" },
//         { status: 400 }
//       );
//     }

//     const newGame = await Game.create({
//       name,
//       description,
//       image: image || "/placeholder-game.jpg",
//       downloadUrl: downloadUrl || "#",
//       rating: rating || 3,
//       bonus: bonus || "",
//       downloads: downloads || "",
//       minWithdrawal: minWithdrawal || "",
//       isHot: isHot || false,
//       category: category || "General",
//     });

//     return NextResponse.json(
//       { success: true, game: newGame },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("POST error:", error);
//     return NextResponse.json(
//       { success: false, error: "Failed to create game" },
//       { status: 500 }
//     );
//   }
// }

// /**
//  * PUT – Update game
//  */
// export async function PUT(request: NextRequest) {
//   try {
//     await connectDB();

//     const body = await request.json();
//     const { id, ...updates } = body;

//     if (!id) {
//       return NextResponse.json(
//         { success: false, error: "Game ID is required" },
//         { status: 400 }
//       );
//     }

//     const updatedGame = await Game.findByIdAndUpdate(
//       id,
//       updates,
//       { new: true }
//     );

//     if (!updatedGame) {
//       return NextResponse.json(
//         { success: false, error: "Game not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       game: updatedGame,
//     });
//   } catch (error) {
//     console.error("PUT error:", error);
//     return NextResponse.json(
//       { success: false, error: "Failed to update game" },
//       { status: 500 }
//     );
//   }
// }

// /**
//  * DELETE – Delete game
//  */
// export async function DELETE(request: NextRequest) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get("id");

//     if (!id) {
//       return NextResponse.json(
//         { success: false, error: "Game ID is required" },
//         { status: 400 }
//       );
//     }

//     const deletedGame = await Game.findByIdAndDelete(id);

//     if (!deletedGame) {
//       return NextResponse.json(
//         { success: false, error: "Game not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       message: "Game deleted successfully",
//     });
//   } catch (error) {
//     console.error("DELETE error:", error);
//     return NextResponse.json(
//       { success: false, error: "Failed to delete game" },
//       { status: 500 }
//     );
//   }
// }
