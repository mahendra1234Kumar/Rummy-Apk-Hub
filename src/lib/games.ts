import { Game as GameType } from "@/types/game";
import { connectDB } from "@/lib/mongodb";
import { Game } from "@/app/models/Game";

/**
 * Fetch all games from MongoDB
 */
export async function getGames(): Promise<GameType[]> {
  try {
    await connectDB();
    const games = await Game.find().sort({ createdAt: -1 }).lean();
    
    // Convert MongoDB _id to id and format dates
    return games.map((game: any) => ({
      id: game._id.toString(),
      name: game.name,
      description: game.description,
      image: game.image,
      downloadUrl: game.downloadUrl,
      rating: game.rating,
      bonus: game.bonus || "",
      downloads: game.downloads || "",
      minWithdrawal: game.minWithdrawal || "",
      isHot: game.isHot || false,
      category: game.category || "General",
      createdAt: game.createdAt ? new Date(game.createdAt).toISOString() : new Date().toISOString(),
      updatedAt: game.updatedAt ? new Date(game.updatedAt).toISOString() : new Date().toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching games from MongoDB:", error);
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
      name: game.name,
      description: game.description,
      image: game.image,
      downloadUrl: game.downloadUrl,
      rating: game.rating,
      bonus: game.bonus || "",
      downloads: game.downloads || "",
      minWithdrawal: game.minWithdrawal || "",
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

