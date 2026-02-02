import { Game } from "@/types/game";
import GameCard from "./GameCard";

interface GameListProps {
  games: Game[];
  title?: string;
}

export default function GameList({ games, title }: GameListProps) {
  if (games.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No games available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="mb-8 md:mb-12">
      {title && (
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">{title}</h2>
      )}
      <div className="flex flex-col gap-4">
        {games.map((game, index) => (
          <GameCard key={game.id} game={game} index={index + 1} />
        ))}
      </div>
    </div>
  );
}

