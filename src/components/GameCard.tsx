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
      className={i < fullStars ? "text-amber-400" : "text-emerald-100"}
      aria-hidden="true"
    >
      ★
    </span>
  ));

  const showBonus = Boolean(game.bonus && game.bonus.trim() !== "");

  return (
    <div className="rounded-[24px] overflow-hidden border border-emerald-100 bg-gradient-to-r from-white via-white to-emerald-50/80 shadow-[0_16px_40px_rgba(22,49,39,0.08)] hover:shadow-[0_20px_48px_rgba(22,49,39,0.12)] transition-all duration-300">
      <div className="p-3.5 sm:p-4 flex items-center gap-3 sm:gap-4">
        <div className="relative w-[72px] h-[72px] sm:w-[84px] sm:h-[84px] shrink-0">
          <div className="w-full h-full rounded-[20px] overflow-hidden relative bg-white ring-2 ring-emerald-100 shadow-[0_10px_24px_rgba(22,49,39,0.12)]">
            <Image
              src={game.image || "/placeholder-game.jpg"}
              alt={game.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          {game.isHot && (
            <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
              HOT
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <Link href={`/game/${game.id}`}>
            <h3 className="text-[15px] sm:text-lg font-extrabold text-slate-900 truncate hover:text-emerald-700 transition-colors">
              {game.name}
            </h3>
          </Link>

          <div className="mt-1 text-xs sm:text-sm text-slate-600 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="font-medium">↓ {game.downloads || "0"}</span>
            {showBonus && (
              <span className="text-emerald-700 font-semibold">
                | {game.bonus}
              </span>
            )}
          </div>

          {game.minWithdrawal && (
            <div className="mt-1 text-xs sm:text-sm font-bold text-emerald-700">
              Min. Withdrawal {game.minWithdrawal}
            </div>
          )}

          <div className="mt-1.5 flex items-center gap-1 text-[11px] sm:text-xs text-slate-500">
            <span className="flex gap-0.5 leading-none text-[13px] sm:text-sm">
              {stars}
            </span>
            <span className="font-medium">{rating.toFixed(1)}/5</span>
          </div>
        </div>

        <div className="shrink-0 self-center">
          <Link
            href={`/game/${game.id}`}
            className="bg-gradient-to-r from-emerald-600 via-green-500 to-lime-500 text-white px-3.5 sm:px-4.5 py-2.5 rounded-xl hover:brightness-105 transition font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-1.5 whitespace-nowrap shadow-[0_12px_24px_rgba(34,197,94,0.22)]"
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
