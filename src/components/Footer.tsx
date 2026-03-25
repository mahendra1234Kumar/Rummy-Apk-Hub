import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 md:mt-20 border-t border-emerald-200/70 bg-emerald-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-200/70 mb-3">
              rummys.online
            </p>
            <h3 className="text-xl sm:text-2xl font-bold mb-3">
              Discover apps with a cleaner, faster browsing experience.
            </h3>
            <p className="text-emerald-50/75 text-sm sm:text-base leading-7 max-w-xl">
              rummys.online helps you explore rummy and gaming apps in one
              polished place with quick access, clean listings, and easy mobile
              browsing.
            </p>
          </div>
          <div className="sm:justify-self-end">
            <h3 className="text-base sm:text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-emerald-50/75 text-sm sm:text-base">
              <li>
                <Link
                  href="/terms"
                  className="hover:text-white transition block py-1"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="hover:text-white transition block py-1"
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-emerald-900 mt-8 pt-6 text-sm text-emerald-50/60">
          <p className="mb-2 leading-relaxed">
            <strong className="text-white">
              *You must be 18 years or older to play real money rummy.
            </strong>
          </p>
          <p className="mb-2 leading-relaxed">
            <strong className="text-orange-400">Warning:</strong> This game
            involves financial risk. Play responsibly and at your own risk.
          </p>
          <p>Copyright © rummys.online All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
