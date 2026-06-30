import { getGameByIdentifier, getGamePath } from "@/lib/games";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ id: string }>;
}

function normalizeDownloadUrl(downloadUrl: string) {
  const trimmed = downloadUrl.trim();

  if (!trimmed || trimmed === "#") {
    return null;
  }

  try {
    return encodeURI(new URL(trimmed).toString());
  } catch {
    try {
      return encodeURI(new URL(`https://${trimmed}`).toString());
    } catch {
      return null;
    }
  }
}

function hasItems(items?: string[]) {
  return Array.isArray(items) && items.length > 0;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const game = await getGameByIdentifier(id);

  if (!game) {
    return {
      title: "Game Not Found",
    };
  }

  return {
    title: `${game.name} - Download APK | rummys.online`,
    description: game.description,
    keywords: `${game.name}, ${game.name} apk, ${game.name} download, rummy games, online rummy`,
    openGraph: {
      type: "website",
      url: `https://rummys.online${getGamePath(game)}`,
      title: `${game.name} - Download APK`,
      description: game.description,
      images: game.image ? [game.image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${game.name} - Download APK`,
      description: game.description,
      images: game.image ? [game.image] : [],
    },
    alternates: {
      canonical: getGamePath(game),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function GameDetailPage({ params }: PageProps) {
  const { id } = await params;
  const game = await getGameByIdentifier(id);

  if (!game) {
    notFound();
  }

  if (id !== game.slug) {
    redirect(getGamePath(game));
  }

  const rating = Math.max(0, Math.min(5, Number(game.rating) || 0));
  const fullStars = Math.round(rating);
  const gameName = game.name;
  const shortName = gameName.replace(" Apk", "").replace(" APK", "");
  const downloadUrl = normalizeDownloadUrl(game.downloadUrl);

  const stars = Array.from({ length: 5 }).map((_, i) => (
    <span
      key={i}
      className={i < fullStars ? "text-amber-400" : "text-emerald-100"}
      aria-hidden="true"
    >
      ★
    </span>
  ));

  const detailFacts = [
    { label: "Version", value: game.latestVersion },
    { label: "App Size", value: game.appSize },
    { label: "Updated", value: game.lastUpdated },
    { label: "Category", value: game.category },
    { label: "Withdrawal Time", value: game.withdrawalTime },
  ].filter((item) => item.value);

  const contentSections = [
    {
      title: `What is ${gameName}?`,
      content:
        game.longReview ||
        `${gameName} is listed on rummys.online for users who want to compare mobile gaming apps, bonus details, download information, and basic app highlights before installing.`,
    },
    {
      title: `How to download ${gameName} APK`,
      content:
        game.howToDownload ||
        `Use the download button on this page to visit the official download source for ${gameName}. Review the app details, permissions, and source page before installing any APK file.`,
    },
    {
      title: `How to register on ${gameName}`,
      content:
        game.howToRegister ||
        `After installing ${gameName}, open the app and follow its signup flow. Check bonus terms, account requirements, and verification details inside the app before adding personal or payment information.`,
    },
    {
      title: "Withdrawal process",
      content:
        game.withdrawalProcess ||
        `Withdrawal rules can vary by app. Check ${gameName}'s in-app wallet, payment method support, minimum withdrawal amount, and verification requirements before playing with real-money features.`,
    },
    {
      title: `Is ${gameName} safe?`,
      content:
        game.safetyNote ||
        `Only download ${gameName} from a source you trust, review permissions carefully, and play responsibly. Real-money games may be restricted in some locations, so confirm local rules before use.`,
    },
  ];

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: game.name,
    description: game.description,
    applicationCategory: "GameApplication",
    operatingSystem: "Android",
    image: game.image,
    url: `https://rummys.online${getGamePath(game)}`,
    softwareVersion: game.latestVersion || undefined,
    fileSize: game.appSize || undefined,
    dateModified: game.lastUpdated || game.updatedAt,
    author: {
      "@type": "Organization",
      name: "rummys.online",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating.toFixed(1),
      ratingCount: "1000",
    },
  };

  const faqJsonLd =
    game.faq && game.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: game.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://rummys.online/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: game.name,
        item: `https://rummys.online${getGamePath(game)}`,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-white to-lime-50/60">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <Header />
      <main className="grow">
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8 lg:py-12">
          <div className="bg-white/85 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-[0_24px_60px_rgba(22,49,39,0.12)] overflow-hidden border border-emerald-100">
            <div className="bg-gradient-to-br from-emerald-50 via-white to-lime-50 p-4 sm:p-6 md:p-8 lg:p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-to-br from-emerald-200/30 to-lime-200/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-to-tr from-lime-200/20 to-emerald-300/20 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <div className="inline-flex flex-col items-center mb-5 sm:mb-7">
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-48 lg:h-48">
                    <div className="absolute inset-0 rounded-[30px] bg-gradient-to-br from-emerald-200/40 to-lime-100/30 blur-2xl scale-110"></div>
                    <div className="relative w-full h-full rounded-[28px] sm:rounded-[32px] border border-emerald-200 shadow-[0_18px_50px_rgba(22,49,39,0.14)] overflow-hidden bg-white p-2">
                      <div className="relative w-full h-full rounded-[22px] sm:rounded-[26px] overflow-hidden bg-gradient-to-br from-white to-emerald-50">
                        {game.image ? (
                          <Image
                            src={game.image}
                            alt={gameName}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center text-white text-3xl sm:text-4xl md:text-5xl font-bold">
                            {gameName.charAt(0)}
                          </div>
                        )}
                      </div>
                    </div>
                    {game.isHot && (
                      <span className="absolute top-3 right-3 bg-white/95 text-red-500 text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full shadow-md border border-red-100">
                        HOT
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex justify-center items-center gap-1 sm:gap-1.5 mb-2 sm:mb-3 text-xl sm:text-2xl md:text-3xl">
                  {stars}
                </div>
                <p className="text-slate-500 text-xs sm:text-sm mb-4 sm:mb-5 font-medium">
                  {rating.toFixed(1)}/5 Rating
                </p>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-3 sm:mb-4 bg-gradient-to-r from-emerald-950 via-emerald-800 to-emerald-600 bg-clip-text text-transparent px-2">
                  {gameName}
                </h1>

                <p className="text-slate-700 text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
                  {game.description}
                </p>

                <div className="mb-6 sm:mb-8">
                  <a
                    href={downloadUrl || "#"}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="bg-gradient-to-r from-emerald-600 via-green-500 to-lime-500 hover:from-emerald-700 hover:via-green-600 hover:to-lime-600 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg md:text-xl inline-flex items-center gap-2 sm:gap-3 transition-all shadow-2xl hover:shadow-emerald-500/35 transform hover:scale-105 active:scale-95"
                  >
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    <span>Download Apk</span>
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto mb-4 sm:mb-6">
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg border border-emerald-100">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="bg-emerald-100 rounded-lg p-1.5 sm:p-2 shrink-0">
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 truncate">
                          {game.downloads || "1M+"}
                        </p>
                        <p className="text-[10px] sm:text-xs text-slate-600">
                          Downloads
                        </p>
                      </div>
                    </div>
                  </div>

                  {game.bonus && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg border border-emerald-100">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="bg-green-100 rounded-lg p-1.5 sm:p-2 shrink-0">
                          <svg
                            className="w-5 h-5 sm:w-6 sm:h-6 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-base sm:text-lg md:text-xl font-bold text-slate-900 truncate">
                            {game.bonus}
                          </p>
                          <p className="text-[10px] sm:text-xs text-slate-600">
                            Signup Bonus
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {game.minWithdrawal && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg border border-emerald-100 sm:col-span-2 lg:col-span-1">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="bg-lime-100 rounded-lg p-1.5 sm:p-2 shrink-0">
                          <svg
                            className="w-5 h-5 sm:w-6 sm:h-6 text-lime-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-base sm:text-lg md:text-xl font-bold text-slate-900 truncate">
                            {game.minWithdrawal}
                          </p>
                          <p className="text-[10px] sm:text-xs text-slate-600">
                            Min. Withdrawal
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-green-200 text-xs sm:text-sm">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <span className="font-semibold">Safe and Secure</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 space-y-6 sm:space-y-8 md:space-y-10">
              {detailFacts.length > 0 && (
                <section className="rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-emerald-100 bg-white">
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-slate-950 mb-4">
                    {gameName} APK Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {detailFacts.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-lg border border-emerald-100 bg-emerald-50/50 p-4"
                      >
                        <p className="text-xs font-semibold uppercase text-emerald-700">
                          {item.label}
                        </p>
                        <p className="mt-1 text-base font-bold text-slate-950">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {hasItems(game.features) && (
                <section className="rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-lime-100 bg-lime-50/50">
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-slate-950 mb-4">
                    {gameName} Features
                  </h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {game.features!.map((feature) => (
                      <li
                        key={feature}
                        className="rounded-lg bg-white border border-lime-100 p-4 text-slate-700"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {contentSections.map((section, index) => (
                <section
                  key={section.title}
                  className="rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-l-4 border-emerald-500 bg-gradient-to-r from-emerald-50 to-lime-50"
                >
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 sm:mb-4 flex items-start sm:items-center gap-2 sm:gap-3">
                    <span
                      className="bg-emerald-600 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-base sm:text-xl shrink-0 mt-0.5 sm:mt-0"
                    >
                      {index + 1}
                    </span>
                    <span className="flex-1">{section.title}</span>
                  </h2>
                  <p className="text-slate-700 leading-relaxed text-sm sm:text-base md:text-lg">
                    {section.content}
                  </p>
                </section>
              ))}

              {(hasItems(game.paymentMethods) || game.bonus || game.minWithdrawal) && (
                <section className="rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-green-100 bg-white">
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-slate-950 mb-4">
                    Bonus, Payments and Withdrawals
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {game.bonus && (
                      <div className="rounded-lg bg-green-50 border border-green-100 p-4">
                        <p className="text-xs font-semibold uppercase text-green-700">
                          Welcome Bonus
                        </p>
                        <p className="mt-1 text-lg font-bold text-slate-950">
                          {game.bonus}
                        </p>
                      </div>
                    )}
                    {game.minWithdrawal && (
                      <div className="rounded-lg bg-green-50 border border-green-100 p-4">
                        <p className="text-xs font-semibold uppercase text-green-700">
                          Minimum Withdrawal
                        </p>
                        <p className="mt-1 text-lg font-bold text-slate-950">
                          {game.minWithdrawal}
                        </p>
                      </div>
                    )}
                    {hasItems(game.paymentMethods) && (
                      <div className="rounded-lg bg-green-50 border border-green-100 p-4">
                        <p className="text-xs font-semibold uppercase text-green-700">
                          Payment Methods
                        </p>
                        <p className="mt-1 text-base font-bold text-slate-950">
                          {game.paymentMethods!.join(", ")}
                        </p>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {(hasItems(game.pros) || hasItems(game.cons)) && (
                <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hasItems(game.pros) && (
                    <div className="rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-emerald-100 bg-emerald-50/60">
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-950 mb-4">
                        Pros
                      </h2>
                      <ul className="space-y-3 text-slate-700">
                        {game.pros!.map((item) => (
                          <li key={item} className="rounded-lg bg-white p-3">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {hasItems(game.cons) && (
                    <div className="rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-orange-100 bg-orange-50/60">
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-950 mb-4">
                        Cons
                      </h2>
                      <ul className="space-y-3 text-slate-700">
                        {game.cons!.map((item) => (
                          <li key={item} className="rounded-lg bg-white p-3">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              )}

              {game.faq && game.faq.length > 0 && (
                <section className="rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-200 bg-white">
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-slate-950 mb-4">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-3">
                    {game.faq.map((item) => (
                      <div
                        key={item.question}
                        className="rounded-lg border border-slate-200 p-4"
                      >
                        <h3 className="font-bold text-slate-950">
                          {item.question}
                        </h3>
                        <p className="mt-2 text-slate-700 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <div className="bg-gradient-to-r from-emerald-700 via-green-600 to-lime-500 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 text-center shadow-2xl">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
                  Ready to Start Playing?
                </h3>
                <p className="text-emerald-50/90 mb-4 sm:mb-6 text-sm sm:text-base md:text-lg px-2">
                  Download {gameName} now and get started with a cleaner mobile
                  gaming experience.
                </p>
                <a
                  href={downloadUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-emerald-50 text-emerald-700 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg md:text-xl inline-flex items-center gap-2 sm:gap-3 transition-all shadow-2xl hover:shadow-white/50 transform hover:scale-105 active:scale-95 w-full sm:w-auto justify-center"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span>Download {shortName}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
