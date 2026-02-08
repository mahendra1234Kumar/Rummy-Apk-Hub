import { Game } from "@/types/game";
import Image from "next/image";
import Link from "next/link";

interface GameCardProps {
  game: Game;
  index?: number;
}

export default function GameCard({ game, index = 0 }: GameCardProps) {
  const rating = Math.max(0, Math.min(5, Number(game.rating) || 0));
  const fullStars = Math.round(rating);

  const stars = Array.from({ length: 5 }).map((_, i) => (
    <span
      key={i}
      className={`inline-block transition-all duration-300 ${
        i < fullStars
          ? "text-yellow-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.6)] md:hover:scale-125 md:hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"
          : "text-gray-300"
      }`}
      aria-hidden="true"
    >
      ★
    </span>
  ));

  const showBonus = Boolean(game.bonus && game.bonus.trim() !== "");

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm md:hover:shadow-md transition-shadow duration-200">
      <div className="p-3 sm:p-4 flex items-center gap-3 relative">
        {/* Icon */}
        <div className="relative w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] shrink-0 group/image">
          <div className="w-full h-full rounded-xl border-2 border-yellow-400 overflow-hidden relative bg-gray-50 transition-all duration-300 md:group-hover/image:scale-110 md:group-hover/image:shadow-lg md:group-hover/image:-translate-y-1 active:scale-105">
            {game.image ? (
              <Image
                src={game.image}
                alt={game.name}
                fill
                className="object-cover transition-transform duration-300 md:group-hover/image:scale-105"
                unoptimized
              />
            ) : null}
          </div>
          {game.isHot && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
              HOT
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="min-w-0">
            <Link href={`/game/${game.id}`}>
              <h3 className="text-[15px] sm:text-base font-bold text-gray-900 truncate hover:text-blue-700 transition-colors cursor-pointer">
                {game.name}
              </h3>
            </Link>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
            {/* Line: downloads + bonus, like example */}
            <div className="text-xs sm:text-sm text-gray-600">
              <span>
                ↓ {game.downloads || "0"}{" "}
              </span>
              {showBonus && (
                <span className="ml-1">| {game.bonus}</span>
              )}
            </div>
          </div>

          {/* Min withdrawal line */}
          {game.minWithdrawal && (
            <div className="mt-1 text-xs sm:text-sm font-semibold text-green-700 transition-opacity duration-200 md:hover:opacity-80 inline-block">
              Min. Withdrawal {game.minWithdrawal}
            </div>
          )}

          {/* Rating row under text */}
          <div className="mt-1 flex items-center gap-1 text-[11px] sm:text-xs text-gray-600">
            <span className="flex leading-none gap-0.5">{stars}</span>
            <span>{rating.toFixed(1)}/5</span>
          </div>
        </div>

        {/* Download Button - Centered vertically */}
        <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2">
          <Link
            href={`/game/${game.id}`}
            className="bg-red-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-red-700 active:bg-red-800 transition font-semibold text-xs sm:text-sm inline-flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap"
          >
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span>Download</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

