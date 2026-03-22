"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden relative">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              About
            </h1>
            <button
              onClick={() => router.back()}
              className="text-gray-500 hover:text-gray-700 transition text-sm font-medium"
              aria-label="Close modal"
            >
              Close modal
            </button>
          </div>

          <div className="p-4 sm:p-6 overflow-y-auto max-h-[70vh]">
            <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed">
              <p>
                <strong>rummys.online</strong> is built for users who want to
                find rummy, teen patti, and other popular gaming APKs in one
                place.
              </p>
              <p>
                Our goal is to keep game listings easy to browse so visitors can
                quickly check available apps, download options, and basic game
                details without jumping across multiple websites.
              </p>
              <p>
                We try to keep the platform simple, fast, and mobile-friendly so
                users can discover new apps and offers more easily.
              </p>

              <div className="space-y-2 pt-2">
                <Link
                  href="/contact"
                  className="text-green-600 hover:text-green-700 font-semibold underline block"
                >
                  Contact Us
                </Link>
                <Link
                  href="/"
                  className="text-green-600 hover:text-green-700 font-semibold underline block"
                >
                  Browse Games on rummys.online
                </Link>
              </div>

              <div className="pt-4 border-t border-gray-200 mt-4">
                <p className="font-semibold text-gray-800 mb-2">Note:</p>
                <p className="text-gray-600 text-sm">
                  Some listed apps may involve financial risk. Please review the
                  details carefully and play responsibly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
