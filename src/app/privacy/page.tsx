"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden relative">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              Privacy Policy
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
            <div className="space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">
              <section>
                <p className="mb-4">
                  At <strong>rummys.online</strong>, protecting visitor privacy
                  is important. This page explains what information may be
                  collected when you use the website and how that information may
                  be used.
                </p>
                <p className="mb-4">
                  If you have any questions about this policy, you can contact
                  us through the contact details shared on the website.
                </p>
                <p className="mb-4">
                  This policy applies to online activity on rummys.online and
                  does not apply to information collected offline or outside this
                  website.
                </p>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">
                  Consent
                </h2>
                <p>
                  By using this website, you consent to this Privacy Policy and
                  agree to its terms.
                </p>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">
                  Information We Collect
                </h2>
                <p className="mb-4">
                  If you contact us directly, we may receive information such as
                  your name, email address, phone number, message contents, and
                  any attachments you choose to send.
                </p>
                <p>
                  We may also collect standard technical information such as IP
                  address, browser type, device information, referral pages, and
                  timestamps for analytics and security purposes.
                </p>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">
                  How We Use Information
                </h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>To operate and maintain the website</li>
                  <li>To improve website performance and user experience</li>
                  <li>To understand how visitors use the website</li>
                  <li>To respond to support, advertising, or business inquiries</li>
                  <li>To prevent misuse, spam, or fraud</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">
                  Cookies and Log Files
                </h2>
                <p>
                  Like many websites, rummys.online may use cookies and standard
                  log files to understand visitor behavior, improve the site, and
                  support analytics.
                </p>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">
                  Third-Party Services
                </h2>
                <p>
                  Some links, ads, or services on the website may be provided by
                  third parties. Their privacy practices are governed by their
                  own privacy policies, not this one.
                </p>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">
                  Children&apos;s Privacy
                </h2>
                <p>
                  rummys.online does not knowingly collect personal information
                  from children under 13. If you believe a child has shared such
                  information, please contact us so we can review and remove it
                  when appropriate.
                </p>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">
                  Contact Information
                </h2>
                <p className="mb-2">
                  <Link
                    href="mailto:support@rummys.online"
                    className="text-green-600 hover:text-green-700 font-semibold underline"
                  >
                    Contact Us - support@rummys.online
                  </Link>
                </p>
              </section>

              <div className="pt-4 border-t border-gray-200 mt-6">
                <p className="font-semibold text-gray-800 mb-2">Note:</p>
                <p className="text-gray-600 text-sm">
                  If you want to advertise or promote an application on
                  rummys.online, you can contact us through the email above.
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
