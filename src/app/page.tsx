import { Game } from "@/types/game";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GameList from "@/components/GameList";
import type { Metadata } from "next";
import { getGames } from "@/lib/games";

// Always fetch fresh data from the API so new games from the admin panel
// are reflected on the user side.

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const metadata: Metadata = {
  title: "rummys.online - All Rummy & Yono Apps Bonus ₹41-₹101",
  description:
    "rummys.online brings top rummy, Yono, teen patti, ludo, and poker game APKs together in one place with bonus offers from ₹41 to ₹101 and trusted gaming apps.",
  keywords:
    "rummys.online, all rummy apps bonus, yono apps bonus, bonus 41 to 101, rummy apk, rummy app download, game rummy download, teen patti apk, ludo game apk, poker game apk, online rummy, rummy cash games, real cash game apps",
  openGraph: {
    title: "rummys.online - All Rummy & Yono Apps Bonus ₹41-₹101",
    description:
      "rummys.online lists rummy, Yono, teen patti, ludo, and casino game APKs with bonus offers from ₹41 to ₹101 and fast withdrawal.",
    type: "website",
    locale: "en_IN",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function Home() {
  const games = await getGames();
  const hotGames = games.filter((game) => game.isHot);
  const normalGames = games.filter((game) => !game.isHot);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "rummys.online",
    description:
      "rummys.online lets users discover rummy and Yono apps with bonus offers from Rs 41 to Rs 101, plus teen patti, ludo, and poker game APKs in one place.",
    url: "https://rummys.online",
  };

  const gameJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      ...hotGames.map((game, index) => ({
        "@type": "SoftwareApplication",
        position: index + 1,
        name: game.name,
        description: game.description,
        applicationCategory: "GameApplication",
        operatingSystem: "Android",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: game.rating.toString(),
          ratingCount: "1000",
        },
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gameJsonLd) }}
      />
      <div className="min-h-screen flex flex-col page-shell">
        <Header />
        <main
          id="games"
          className="grow max-w-6xl mx-auto w-full px-4 py-6 md:py-10 scroll-mt-24 sm:scroll-mt-28"
        >
          <section className="mb-8 md:mb-10">
            <div className="max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-emerald-800">
                Bonus Offers & APK Updates
              </p>
              <h1 className="mt-3 text-4xl md:text-5xl font-black tracking-tight text-slate-950">
                All Rummy & Yono Apps Bonus ₹41-₹101
              </h1>
              <p className="mt-4 text-base md:text-lg leading-8 text-slate-600">
                Explore top rummy, Yono, teen patti, ludo, and poker apps with
                bonus offers, quick comparisons, and easy APK browsing on
                rummys.online.
              </p>
            </div>
          </section>

          {hotGames.length > 0 && (
            <section className="mb-8 md:mb-12">
              <div className="flex flex-col sm:flex-row sm:items-center mb-4 md:mb-6 gap-3">
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-950">
                  Hot Games
                </h2>
                <span className="inline-block bg-gradient-to-r from-emerald-500 to-lime-500 text-white px-3.5 py-1.5 rounded-full text-sm font-bold w-fit shadow-md">
                  Trending
                </span>
              </div>
              <GameList games={hotGames} />
            </section>
          )}

          <section>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-950 mb-4 md:mb-6">
              Recommended Apps
            </h2>
            <GameList games={normalGames} />
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
