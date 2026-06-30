import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Game } from "@/app/models/Game";

function normalizeDownloadUrl(downloadUrl?: string) {
  const trimmed = (downloadUrl || "").trim();

  if (!trimmed || trimmed === "#") {
    return "#";
  }

  try {
    return new URL(trimmed).toString();
  } catch {
    try {
      return new URL(`https://${trimmed}`).toString();
    } catch {
      return "#";
    }
  }
}

function normalizeStringList(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => String(item).trim())
    .filter(Boolean);
}

function normalizeFaq(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const faqItem = item as { question?: unknown; answer?: unknown };
      const question = String(faqItem.question || "").trim();
      const answer = String(faqItem.answer || "").trim();

      return question && answer ? { question, answer } : null;
    })
    .filter(Boolean);
}

function sanitizeGameBody(body: Record<string, unknown>) {
  return {
    ...body,
    image: String(body.image || "").trim() || "/placeholder-game.jpg",
    downloadUrl: normalizeDownloadUrl(String(body.downloadUrl || "")),
    rating: Number(body.rating) || 3,
    longReview: String(body.longReview || "").trim(),
    bonus: String(body.bonus || "").trim(),
    downloads: String(body.downloads || "").trim(),
    minWithdrawal: String(body.minWithdrawal || "").trim(),
    latestVersion: String(body.latestVersion || "").trim(),
    appSize: String(body.appSize || "").trim(),
    lastUpdated: String(body.lastUpdated || "").trim(),
    withdrawalTime: String(body.withdrawalTime || "").trim(),
    howToDownload: String(body.howToDownload || "").trim(),
    howToRegister: String(body.howToRegister || "").trim(),
    withdrawalProcess: String(body.withdrawalProcess || "").trim(),
    safetyNote: String(body.safetyNote || "").trim(),
    features: normalizeStringList(body.features),
    pros: normalizeStringList(body.pros),
    cons: normalizeStringList(body.cons),
    paymentMethods: normalizeStringList(body.paymentMethods),
    faq: normalizeFaq(body.faq),
    isHot: Boolean(body.isHot),
    category: String(body.category || "General").trim() || "General",
  };
}

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
      longReview,
      latestVersion,
      appSize,
      lastUpdated,
      withdrawalTime,
      howToDownload,
      howToRegister,
      withdrawalProcess,
      safetyNote,
      features,
      pros,
      cons,
      paymentMethods,
      faq,
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
      ...sanitizeGameBody({
        image,
        downloadUrl,
        rating,
        bonus,
        downloads,
        minWithdrawal,
        longReview,
        latestVersion,
        appSize,
        lastUpdated,
        withdrawalTime,
        howToDownload,
        howToRegister,
        withdrawalProcess,
        safetyNote,
        features,
        pros,
        cons,
        paymentMethods,
        faq,
        isHot,
        category,
      }),
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

    const updates = sanitizeGameBody(body);

    const updatedGame = await Game.findByIdAndUpdate(
      gameId,
      updates,
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
