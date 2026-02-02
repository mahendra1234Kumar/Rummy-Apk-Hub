"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50 w-full left-0 right-0">
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
      <nav className="bg-white border-b border-gray-200 w-full">
        <div className="w-full flex items-center justify-start gap-4 sm:gap-6 text-sm font-semibold text-gray-700 overflow-x-auto whitespace-nowrap py-2 px-3">
          <Link href="/" className="hover:text-blue-700 transition">
            Home
          </Link>
          <Link href="/#games" className="hover:text-blue-700 transition">
            Games
          </Link>
          <Link href="/about" className="hover:text-blue-700 transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-blue-700 transition">
            Contact
          </Link>
          <Link href="/privacy" className="hover:text-blue-700 transition">
            Privacy
          </Link>
        </div>
      </nav>
    </header>
  );
}
