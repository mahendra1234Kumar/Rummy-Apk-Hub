import { getHotGames, getNormalGames } from "@/lib/games";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GameList from "@/components/GameList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Game Rummy APK Hub - All Rummy & Teen Patti Game APKs Download",
  description: "Game Rummy APK Hub – Download top rummy, teen patti, ludo & poker game APKs in one place. Get signup bonus offers, real cash games, and trusted gaming apps with fast withdrawal.",
  keywords: "game rummy apk hub, rummy apk, rummy app download, game rummy download, teen patti apk, ludo game apk, poker game apk, online rummy, rummy cash games, real cash game apps, all rummy apps",
  openGraph: {
    title: "Game Rummy APK Hub - Download Best Rummy & Game APKs",
    description: "Game Rummy APK Hub lists the best rummy, teen patti, ludo & casino game APKs with bonuses and fast withdrawal.",
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

export default function Home() {
  const hotGames = getHotGames();
  const normalGames = getNormalGames();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Game Rummy APK Hub",
    "description": "Game Rummy APK Hub – Download top rummy, teen patti, ludo & poker game APKs from one place.",
    "url": "https://allrummyapps.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://allrummyapps.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const gameJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      ...hotGames.map((game, index) => ({
        "@type": "SoftwareApplication",
        "position": index + 1,
        "name": game.name,
        "description": game.description,
        "applicationCategory": "GameApplication",
        "operatingSystem": "Android",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": game.rating.toString(),
          "ratingCount": "1000"
        }
      }))
    ]
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
      <div className="min-h-screen flex flex-col">
        <Header />
        <main id="games" className="grow container mx-auto px-4 py-4 md:py-8">
          {/* Hot Games Section */}
          {hotGames.length > 0 && (
            <section className="mb-8 md:mb-12">
              <div className="flex flex-col sm:flex-row sm:items-center mb-4 md:mb-6 gap-2">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Hot Games</h2>
                <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold w-fit">
                  Trending
                </span>
              </div>
              <GameList games={hotGames} />
            </section>
          )}

          {/* Recommended Games Section */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">Recommended Apps</h2>
            <GameList games={normalGames} />
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
