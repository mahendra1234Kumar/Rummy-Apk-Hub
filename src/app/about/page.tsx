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
          {/* Header with title and close button */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">About</h1>
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
            <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed">
              {/* First Paragraph */}
              <p>
                दोस्तों अगर आप लोग भी <strong>New Rummy Application</strong> को डाउनलोड करने में रुचि रखते हैं और आप लोग भी रमी गेम खेलने के शौकीन है, तो आप लोग <strong>RummyBonusApp.Com</strong> के माध्यम से इन सभी एप्लीकेशंस को डाउनलोड कर सकते हैं,
              </p>

              {/* Second Paragraph */}
              <p>
                जिसके माध्यम से आप लोग काफी सारी रमी गेम को इंजॉय कर सकते हैं, और इसके साथ ही इसमें आपको <strong>Sign-Up</strong> भी मिलता है
              </p>

              {/* Third Paragraph */}
              <p>
                इस Website का बनाने का वास्तविक उदेश्य भी यही है कि आप लोगों को <strong>New Rummy & Teen Patti App</strong> की अपडेट सबसे पहले दिया जाए, और आप लोगों को सबसे बेस्ट एप्लीकेशन को सबसे पहले दिया जाए, जिससे आप लोग भी अब हर एक एप्लीकेशन की जानकारी इस वेबसाइट पर ले सकते हैं
              </p>

              {/* Links */}
              <div className="space-y-2 pt-2">
                <Link
                  href="/contact"
                  className="text-green-600 hover:text-green-700 font-semibold underline block"
                >
                  Contact Us – Visit Our Contact Us Page
                </Link>
                <Link
                  href="/"
                  className="text-green-600 hover:text-green-700 font-semibold underline block"
                >
                  Download : All Yono Games
                </Link>
              </div>

              {/* Note Section */}
              <div className="pt-4 border-t border-gray-200 mt-4">
                <p className="font-semibold text-gray-800 mb-2">Note :-</p>
                <p className="text-gray-600 text-sm">
                  इस वेबसाइट पर उपस्थित किसी भी प्रकार की एप्लीकेशन को अगर आप लोग डाउनलोड करते हैं तो हमेशा इस बात का ध्यान रहे कि उसमें वित्तीय जोखिम शामिल है और अपने पैसे को जोड़ने से बचे, वरना आप लोग नुकसान के शिकार हो सकते हैं, ऐसा होने पर उसका जिम्मेदार आप खुद होंगे ।
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

