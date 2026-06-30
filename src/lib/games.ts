import { Game as GameType } from "@/types/game";
import { connectDB } from "@/lib/mongodb";
import { Game } from "@/app/models/Game";

export function slugifyGameName(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function getGamePath(game: Pick<GameType, "slug">) {
  return `/game/${game.slug}`;
}

/**
 * Fetch all games from MongoDB
 */
export async function getGames(): Promise<GameType[]> {
  try {
    await connectDB();
    const games = await Game.find().sort({ createdAt: -1 }).lean();
    
    console.log(`✅ Fetched ${games.length} games from MongoDB`);
    
    // Convert MongoDB _id to id and format dates
    return games.map((game: any) => ({
      id: game._id.toString(),
      slug: slugifyGameName(game.name || "game"),
      name: game.name,
      description: game.description,
      longReview: game.longReview || "",
      image: game.image,
      downloadUrl: game.downloadUrl,
      rating: game.rating,
      bonus: game.bonus || "",
      downloads: game.downloads || "",
      minWithdrawal: game.minWithdrawal || "",
      latestVersion: game.latestVersion || "",
      appSize: game.appSize || "",
      lastUpdated: game.lastUpdated || "",
      withdrawalTime: game.withdrawalTime || "",
      howToDownload: game.howToDownload || "",
      howToRegister: game.howToRegister || "",
      withdrawalProcess: game.withdrawalProcess || "",
      safetyNote: game.safetyNote || "",
      features: Array.isArray(game.features) ? game.features : [],
      pros: Array.isArray(game.pros) ? game.pros : [],
      cons: Array.isArray(game.cons) ? game.cons : [],
      paymentMethods: Array.isArray(game.paymentMethods) ? game.paymentMethods : [],
      faq: Array.isArray(game.faq) ? game.faq : [],
      isHot: game.isHot || false,
      category: game.category || "General",
      createdAt: game.createdAt ? new Date(game.createdAt).toISOString() : new Date().toISOString(),
      updatedAt: game.updatedAt ? new Date(game.updatedAt).toISOString() : new Date().toISOString(),
    }));
  } catch (error: any) {
    console.error("❌ Error fetching games from MongoDB:", error);
    console.error("Error details:", {
      message: error?.message,
      name: error?.name,
      stack: error?.stack,
    });
    
    // In production, return empty array to prevent page crashes
    // But log the error for debugging
    if (process.env.NODE_ENV === "production") {
      console.error("⚠️ Returning empty games array due to MongoDB connection error");
    }
    
    return [];
  }
}

/**
 * Fetch hot games (isHot = true) from MongoDB
 */
export async function getHotGames(): Promise<GameType[]> {
  const games = await getGames();
  return games.filter((game) => game.isHot);
}

/**
 * Fetch normal games (isHot = false) from MongoDB
 */
export async function getNormalGames(): Promise<GameType[]> {
  const games = await getGames();
  return games.filter((game) => !game.isHot);
}

/**
 * Fetch a single game by ID from MongoDB
 */
export async function getGameById(id: string): Promise<GameType | undefined> {
  try {
    await connectDB();
    const game = await Game.findById(id).lean();
    
    if (!game) return undefined;
    
    return {
      id: game._id.toString(),
      slug: slugifyGameName(game.name || "game"),
      name: game.name,
      description: game.description,
      longReview: game.longReview || "",
      image: game.image,
      downloadUrl: game.downloadUrl,
      rating: game.rating,
      bonus: game.bonus || "",
      downloads: game.downloads || "",
      minWithdrawal: game.minWithdrawal || "",
      latestVersion: game.latestVersion || "",
      appSize: game.appSize || "",
      lastUpdated: game.lastUpdated || "",
      withdrawalTime: game.withdrawalTime || "",
      howToDownload: game.howToDownload || "",
      howToRegister: game.howToRegister || "",
      withdrawalProcess: game.withdrawalProcess || "",
      safetyNote: game.safetyNote || "",
      features: Array.isArray(game.features) ? game.features : [],
      pros: Array.isArray(game.pros) ? game.pros : [],
      cons: Array.isArray(game.cons) ? game.cons : [],
      paymentMethods: Array.isArray(game.paymentMethods) ? game.paymentMethods : [],
      faq: Array.isArray(game.faq) ? game.faq : [],
      isHot: game.isHot || false,
      category: game.category || "General",
      createdAt: game.createdAt ? new Date(game.createdAt).toISOString() : new Date().toISOString(),
      updatedAt: game.updatedAt ? new Date(game.updatedAt).toISOString() : new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error fetching game by ID from MongoDB:", error);
    return undefined;
  }
}

export async function getGameBySlug(slug: string): Promise<GameType | undefined> {
  try {
    const games = await getGames();
    return games.find((game) => game.slug === slug);
  } catch (error) {
    console.error("Error fetching game by slug:", error);
    return undefined;
  }
}

export async function getGameByIdentifier(
  identifier: string
): Promise<GameType | undefined> {
  const isMongoId = /^[a-f0-9]{24}$/i.test(identifier);

  if (isMongoId) {
    return getGameById(identifier);
  }

  return getGameBySlug(identifier);
}
