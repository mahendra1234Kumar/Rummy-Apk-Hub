import { Game } from "@/types/game";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GameList from "@/components/GameList";
import type { Metadata } from "next";

// Always fetch fresh data from the API so new games from the admin panel
// are reflected on the user side.

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const metadata: Metadata = {
  title: "rummys.online - All Rummy & Teen Patti Game APKs Download",
  description:
    "rummys.online brings top rummy, teen patti, ludo, and poker game APKs together in one place with signup bonus offers and trusted gaming apps.",
  keywords:
    "rummys.online, rummy apk, rummy app download, game rummy download, teen patti apk, ludo game apk, poker game apk, online rummy, rummy cash games, real cash game apps",
  openGraph: {
    title: "rummys.online - Download Best Rummy & Game APKs",
    description:
      "rummys.online lists the best rummy, teen patti, ludo, and casino game APKs with bonuses and fast withdrawal.",
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

async function fetchAllGames(): Promise<Game[]> {
  try {
    // Build an absolute base URL that works in both dev and production
    const vercelUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : null;

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      vercelUrl ||
      "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/games`, {
      // no-store so we always see latest data after admin changes
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch games from /api/games:", response.status);
      return [];
    }

    const data = await response.json();

    if (!data.success || !Array.isArray(data.games)) {
      console.error("Invalid response format from /api/games:", data);
      return [];
    }

    return data.games as Game[];
  } catch (error: unknown) {
    console.error("Error calling /api/games:", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return [];
  }
}

export default async function Home() {
  const games = await fetchAllGames();
  const hotGames = games.filter((game) => game.isHot);
  const normalGames = games.filter((game) => !game.isHot);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "rummys.online",
    description:
      "rummys.online lets users discover top rummy, teen patti, ludo, and poker game APKs from one place.",
    url: "https://rummys.online",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://rummys.online/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
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
      <div className="min-h-screen flex flex-col">
        <Header />
        <main
          id="games"
          className="grow container mx-auto px-4 py-4 md:py-8 scroll-mt-24 sm:scroll-mt-28"
        >
          {hotGames.length > 0 && (
            <section className="mb-8 md:mb-12">
              <div className="flex flex-col sm:flex-row sm:items-center mb-4 md:mb-6 gap-2">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Hot Games
                </h2>
                <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold w-fit">
                  Trending
                </span>
              </div>
              <GameList games={hotGames} />
            </section>
          )}

          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">
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
