"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const handleGamesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only handle if we're on the home page
    if (pathname === "/") {
      e.preventDefault();
      const gamesSection = document.getElementById("games");
      const header = document.querySelector("header");
      
      if (gamesSection && header) {
        // Get actual header height dynamically
        const headerHeight = header.offsetHeight;
        const elementPosition = gamesSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 10; // 10px extra spacing

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: "smooth",
        });
      } else if (gamesSection) {
        // Fallback if header not found
        gamesSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // Check if current page is active
  const isActive = (href: string) => {
    if (href === "/") {
      // Home is active only on home page, not on game detail pages
      return pathname === "/" && !pathname.includes("/game/");
    }
    if (href === "/#games") {
      // Games is active on game detail pages, or if we're on home with games section
      return pathname.startsWith("/game/");
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  // Get active class for navigation links
  const getActiveClass = (href: string) => {
    const active = isActive(href);
    return active
      ? "text-blue-700 font-bold border-b-2 border-blue-700 pb-1"
      : "text-gray-700 hover:text-blue-700";
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-[100] w-full left-0 right-0">
      {/* Top bar (compact like screenshot) */}
      <div className="bg-blue-700 text-white w-full">
        <div className="w-full px-3 py-2 flex items-center">
          <Link
            href="/"
            className="font-bold text-sm sm:text-base truncate"
            title="Game Rummy APK Hub"
          >
            Game Rummy APK Hub
          </Link>
        </div>
      </div>

      {/* Tabs row */}
      <nav className="bg-white border-b border-gray-200 w-full overflow-hidden">
        <div className="w-full flex items-center gap-3 sm:gap-4 md:gap-6 text-sm font-semibold overflow-x-auto scrollbar-hide py-2 pl-3 sm:px-3">
          <Link 
            href="/" 
            className={`transition whitespace-nowrap flex-shrink-0 ${getActiveClass("/")}`}
          >
            Home
          </Link>
          <Link 
            href="/#games" 
            className={`transition whitespace-nowrap flex-shrink-0 ${getActiveClass("/#games")}`}
            onClick={handleGamesClick}
          >
            Games
          </Link>
          <Link 
            href="/about" 
            className={`transition whitespace-nowrap flex-shrink-0 ${getActiveClass("/about")}`}
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className={`transition whitespace-nowrap flex-shrink-0 ${getActiveClass("/contact")}`}
          >
            Contact
          </Link>
          <Link 
            href="/privacy" 
            className={`transition whitespace-nowrap flex-shrink-0 ${getActiveClass("/privacy")}`}
          >
            Privacy
          </Link>
        </div>
      </nav>
    </header>
  );
}
