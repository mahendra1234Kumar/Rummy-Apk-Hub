import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-8 md:mt-16">
      <div className="w-full px-3 sm:px-4 py-4 sm:py-6 md:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-4">About</h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Your trusted source for the best rummy and gaming apps. Download and play safely.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-4">Legal</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-gray-400 text-xs sm:text-sm">
              <li>
                <Link href="/terms" className="hover:text-white transition block py-1">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-white transition block py-1">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-4 sm:mt-6 md:mt-8 pt-4 sm:pt-6 md:pt-8 text-center text-gray-400 text-xs sm:text-sm max-w-6xl mx-auto">
          <p className="mb-2 leading-relaxed">
            <strong className="text-white text-xs sm:text-sm">*You must be 18 years or older to Play Real Money Rummy</strong>
          </p>
          <p className="mb-2 leading-relaxed">
            <strong className="text-yellow-500">Warning:</strong> This game involves financial risk, play responsibly and at your own risk.
          </p>
          <p className="text-xs sm:text-sm">Copyright © AllRummy41.com All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}

