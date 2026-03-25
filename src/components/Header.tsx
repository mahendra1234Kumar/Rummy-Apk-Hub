"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" && !pathname.includes("/game/");
    }
    if (href === "/#games") {
      return pathname.startsWith("/game/");
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  const getActiveClass = (href: string) => {
    const active = isActive(href);
    return active
      ? "text-emerald-950 bg-white/90 shadow-sm"
      : "text-slate-600 hover:text-emerald-950 hover:bg-white/70";
  };

  return (
    <header className="sticky top-0 z-[100] w-full left-0 right-0">
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-800 to-lime-500 text-white border-b border-white/10 shadow-[0_12px_40px_rgba(20,83,45,0.2)]">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="font-black tracking-tight text-lg sm:text-xl truncate"
              title="rummys.online"
            >
              <span className="bg-gradient-to-r from-white via-lime-100 to-emerald-200 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(255,255,255,0.12)]">
                rummys.online
              </span>
            </Link>
            <span className="hidden md:inline-flex text-xs uppercase tracking-[0.25em] text-emerald-50/80">
              Fresh Picks Daily
            </span>
          </div>
        </div>
      </div>

      <nav className="bg-white/70 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
        <div className="max-w-6xl mx-auto grid grid-cols-5 sm:flex sm:items-center sm:gap-3 text-sm font-semibold py-2 px-2 sm:px-4 w-full">
          <Link
            href="/"
            className={`rounded-full px-2.5 sm:px-4 py-2 text-center sm:text-left transition ${getActiveClass("/")}`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`rounded-full px-2.5 sm:px-4 py-2 text-center sm:text-left transition ${getActiveClass("/about")}`}
          >
            About
          </Link>
          <Link
            href="/blogs"
            className={`rounded-full px-2.5 sm:px-4 py-2 text-center sm:text-left transition ${getActiveClass("/blogs")}`}
          >
            Blogs
          </Link>
          <Link
            href="/contact"
            className={`rounded-full px-2.5 sm:px-4 py-2 text-center sm:text-left transition ${getActiveClass("/contact")}`}
          >
            Contact
          </Link>
          <Link
            href="/privacy"
            className={`rounded-full px-2.5 sm:px-4 py-2 text-center sm:text-left transition ${getActiveClass("/privacy")}`}
          >
            Privacy
          </Link>
        </div>
      </nav>
    </header>
  );
}
