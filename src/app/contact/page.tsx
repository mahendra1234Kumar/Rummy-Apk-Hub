"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden relative">
          {/* Header with title and close button */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Contact Us</h1>
            <button
              onClick={() => router.back()}
              className="text-gray-500 hover:text-gray-700 transition text-sm font-medium"
              aria-label="Close modal"
            >
              Close modal
            </button>
          </div>

          {/* Scrollable content */}
          <div className="p-4 sm:p-6 overflow-y-auto max-h-[70vh]">
            <div className="space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">
              {/* Introduction */}
              <p>
                If you want to get any kind of advertising or promotion, you can email us at the address below and talk to us about promotion and corporations...
              </p>

              {/* Contact Information Table */}
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Contact Us</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Title</th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-medium">Email :</td>
                        <td className="border border-gray-300 px-4 py-2">Soon</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-medium">Telegram :</td>
                        <td className="border border-gray-300 px-4 py-2">
                          <a
                            href="https://t.me/TrickyPromotion"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 underline"
                          >
                            @TrickyPromotion
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Note Section */}
              <div className="pt-4 border-t border-gray-200 mt-6">
                <p className="font-semibold text-gray-800 mb-2">Note:</p>
                <p className="text-gray-600 text-sm">
                  We do not own or operate the app. This website is just to share our referral link. The app and app logo and other materials belong to the app owners. we do not claim to own them in anyway.
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

