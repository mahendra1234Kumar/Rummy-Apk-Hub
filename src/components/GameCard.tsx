import { Game } from "@/types/game";
import Image from "next/image";
import Link from "next/link";

interface GameCardProps {
  game: Game;
  index?: number;
}

export default function GameCard({ game }: GameCardProps) {
  const rating = Math.max(0, Math.min(5, Number(game.rating) || 0));
  const fullStars = Math.round(rating);

  const stars = Array.from({ length: 5 }).map((_, i) => (
    <span
      key={i}
      className={i < fullStars ? "text-amber-400" : "text-slate-300"}
      aria-hidden="true"
    >
      ★
    </span>
  ));

  const showBonus = Boolean(game.bonus && game.bonus.trim() !== "");

  return (
    <div className="soft-panel rounded-[22px] overflow-hidden">
      <div className="p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
        <div className="relative w-[72px] h-[72px] sm:w-[82px] sm:h-[82px] shrink-0">
          <div className="w-full h-full rounded-[18px] overflow-hidden relative bg-white ring-1 ring-slate-200 shadow-sm">
            <Image
              src={game.image || "/placeholder-game.jpg"}
              alt={game.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          {game.isHot && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
              HOT
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <Link href={`/game/${game.id}`}>
            <h3 className="text-[15px] sm:text-lg font-bold text-slate-900 truncate hover:text-emerald-700 transition-colors">
              {game.name}
            </h3>
          </Link>

          <div className="mt-1 text-xs sm:text-sm text-slate-600 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>↓ {game.downloads || "0"}</span>
            {showBonus && <span>| {game.bonus}</span>}
          </div>

          {game.minWithdrawal && (
            <div className="mt-1 text-xs sm:text-sm font-semibold text-emerald-700">
              Min. Withdrawal {game.minWithdrawal}
            </div>
          )}

          <div className="mt-1 flex items-center gap-1 text-[11px] sm:text-xs text-slate-500">
            <span className="flex gap-0.5 leading-none">{stars}</span>
            <span>{rating.toFixed(1)}/5</span>
          </div>
        </div>

        <div className="shrink-0 self-center">
          <Link
            href={`/game/${game.id}`}
            className="bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-red-700 transition font-semibold text-xs sm:text-sm inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
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
