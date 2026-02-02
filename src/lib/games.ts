import { Game } from "@/types/game";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src", "lib", "data.json");

export function getGames(): Game[] {
  try {
    const fileContents = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading games data:", error);
    return [];
  }
}

export function getHotGames(): Game[] {
  return getGames().filter((game) => game.isHot);
}

export function getNormalGames(): Game[] {
  return getGames().filter((game) => !game.isHot);
}

export function getGameById(id: string): Game | undefined {
  return getGames().find((game) => game.id === id);
}

export function saveGames(games: Game[]): void {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(games, null, 2), "utf8");
  } catch (error) {
    console.error("Error saving games data:", error);
    throw error;
  }
}

export function addGame(game: Omit<Game, "id" | "createdAt" | "updatedAt">): Game {
  const games = getGames();
  const newGame: Game = {
    ...game,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  games.push(newGame);
  saveGames(games);
  return newGame;
}

export function updateGame(id: string, updates: Partial<Game>): Game | null {
  const games = getGames();
  const index = games.findIndex((game) => game.id === id);
  if (index === -1) return null;

  games[index] = {
    ...games[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  saveGames(games);
  return games[index];
}

export function deleteGame(id: string): boolean {
  const games = getGames();
  const filteredGames = games.filter((game) => game.id !== id);
  if (filteredGames.length === games.length) return false;
  saveGames(filteredGames);
  return true;
}

