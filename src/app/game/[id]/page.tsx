import { getGameById } from "@/lib/games";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const game = await getGameById(id);

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
      title: `${game.name} - Download APK`,
      description: game.description,
      images: game.image ? [game.image] : [],
    },
  };
}

export default async function GameDetailPage({ params }: PageProps) {
  const { id } = await params;
  const game = await getGameById(id);

  if (!game) {
    notFound();
  }

  const rating = Math.max(0, Math.min(5, Number(game.rating) || 0));
  const fullStars = Math.round(rating);

  const stars = Array.from({ length: 5 }).map((_, i) => (
    <span
      key={i}
      className={`text-2xl sm:text-3xl md:text-4xl transition-transform ${
        i < fullStars ? "text-yellow-400 drop-shadow-lg" : "text-gray-300"
      }`}
    >
      ★
    </span>
  ));

  const gameName = game.name;
  const gameDescription = game.description;
  const shortName = gameName.replace(" Apk", "").replace(" APK", "");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header />
      <main className="grow">
        {/* Hero Section */}
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8 lg:py-12">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {/* App Icon & Header Section */}
            <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 sm:p-6 md:p-8 lg:p-12 text-center relative overflow-hidden">
              {/* Decorative Background Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-to-tr from-pink-200/20 to-red-200/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                {/* App Icon */}
                <div className="inline-block relative mb-4 sm:mb-6 transform hover:scale-105 transition-transform duration-300">
                  <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48">
                    <div className="w-full h-full rounded-2xl sm:rounded-3xl border-3 sm:border-4 border-yellow-400 shadow-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 ring-2 sm:ring-4 ring-yellow-300/50">
                      {game.image ? (
                        <Image
                          src={game.image}
                          alt={gameName}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white text-2xl sm:text-3xl md:text-4xl font-bold">
                          {gameName.charAt(0)}
                        </div>
                      )}
                    </div>
                    {game.isHot && (
                      <span className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1.5 rounded-full shadow-lg animate-pulse">
                        🔥 HOT
                      </span>
                    )}
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex justify-center items-center gap-0.5 sm:gap-1 mb-2 sm:mb-4">
                  {stars}
                </div>
                <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6">
                  {rating.toFixed(1)}/5 रेटिंग | {rating.toFixed(1)}/5 Rating
                </p>

                {/* Game Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-3 sm:mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text px-2">
                  {gameName}
                </h1>

                {/* Description */}
                <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
                  {gameDescription}
                </p>

                {/* Primary Download Button */}
                <div className="mb-6 sm:mb-8">
                  <Link
                    href={game.downloadUrl}
                    className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg md:text-xl inline-flex items-center gap-2 sm:gap-3 transition-all shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 active:scale-95"
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
                    <span className="text-xs sm:text-sm opacity-90 hidden sm:inline">| APK डाउनलोड करें</span>
                  </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto mb-4 sm:mb-6">
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg border border-gray-200">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="bg-blue-100 rounded-lg p-1.5 sm:p-2 shrink-0">
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
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
                        <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">{game.downloads || "1M+"}</p>
                        <p className="text-[10px] sm:text-xs text-gray-600">Downloads | डाउनलोड</p>
                      </div>
                    </div>
                  </div>

                  {game.bonus && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg border border-gray-200">
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
                          <p className="text-base sm:text-lg md:text-xl font-bold text-gray-900 truncate">{game.bonus}</p>
                          <p className="text-[10px] sm:text-xs text-gray-600">Signup Bonus | बोनस</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {game.minWithdrawal && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg border border-gray-200 sm:col-span-2 lg:col-span-1">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="bg-purple-100 rounded-lg p-1.5 sm:p-2 shrink-0">
                          <svg
                            className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600"
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
                          <p className="text-base sm:text-lg md:text-xl font-bold text-gray-900 truncate">{game.minWithdrawal}</p>
                          <p className="text-[10px] sm:text-xs text-gray-600">Min. Withdrawal | न्यूनतम निकासी</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Security Badge */}
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
                    <span className="font-semibold">100% Safe & Secure | 100% सुरक्षित</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Sections */}
            <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 space-y-6 sm:space-y-8 md:space-y-10">
              {/* Section 1 */}
              <section className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-l-4 border-red-500">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-red-600 mb-3 sm:mb-4 flex items-start sm:items-center gap-2 sm:gap-3">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-base sm:text-xl shrink-0 mt-0.5 sm:mt-0">1</span>
                  <span className="flex-1">Welcome to {gameName} - आपके रोमांचकारी कार्ड गेमप्ले का प्रवेश द्वार!</span>
                </h2>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
                  {gameName} के साथ ऑनलाइन कार्ड गेम्स के रोमांच का अनुभव करें। Experience the thrill of online card games with {gameName}. चाहे आप एक आकस्मिक खिलाड़ी हों या एक गंभीर गेमर, हमारा प्लेटफॉर्म एक immersive experience प्रदान करता है जो strategy, skill, और excitement को जोड़ता है। Whether you're a casual player or a serious gamer, our platform offers an immersive experience that combines strategy, skill, and excitement. हजारों खिलाड़ियों में शामिल हों जिन्होंने {gameName} को ऑनलाइन कार्ड गेमिंग के लिए अपना preferred destination बनाया है। Join thousands of players who have made {gameName} their preferred destination for online card gaming.
                </p>
              </section>

              {/* Section 2 */}
              <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-l-4 border-blue-500">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-blue-600 mb-3 sm:mb-4 flex items-start sm:items-center gap-2 sm:gap-3">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-base sm:text-xl shrink-0 mt-0.5 sm:mt-0">2</span>
                  <span className="flex-1">About {gameName} - भारतीय कार्ड गेम्स की आत्मा</span>
                </h2>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
                  {gameName} एक captivating online platform है जो traditional Indian card game of Rummy को आपकी उंगलियों पर लाता है। {gameName} is a captivating online platform that brings the traditional Indian card game of Rummy to your fingertips. strategy, skill, और excitement के संगम वाली दुनिया में खुद को डुबोएं, जो सभी स्तरों के खिलाड़ियों के लिए endless entertainment प्रदान करती है। Immerse yourself in a world where strategy, skill, and excitement converge, providing endless entertainment for players of all levels. चाहे आप एक novice हों या एक seasoned pro, {gameName} एक unique experience प्रदान करता है जो भारतीय कार्ड गेम्स की rich heritage का जश्न मनाता है। Whether you're a novice or a seasoned pro, {gameName} offers a unique experience that celebrates the rich heritage of Indian card games.
                </p>
              </section>

              {/* Section 3 */}
              <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-l-4 border-purple-500 relative">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-purple-600 mb-3 sm:mb-4 flex items-start sm:items-center gap-2 sm:gap-3">
                  <span className="bg-purple-600 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-base sm:text-xl shrink-0 mt-0.5 sm:mt-0">3</span>
                  <span className="flex-1">Game Overview, Rules, and Regional Variants | गेम अवलोकन, नियम और क्षेत्रीय वेरिएंट</span>
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
                    {gameName} में, खिलाड़ी रोमांचकारी matches में संलग्न होते हैं जो उनके card skills और strategic thinking का परीक्षण करते हैं। In {gameName}, players engage in thrilling matches that test their card skills and strategic thinking. नियम simple yet engaging हैं, जो खिलाड़ियों को sets और sequences बनाने की अनुमति देते हैं जबकि अपने opponents पर नजर रखते हैं। The rules are simple yet engaging, allowing players to form sets and sequences while keeping an eye on their opponents.
                  </p>
                  
                  {/* Download Button in Content */}
                  <div className="my-4 sm:my-6 flex justify-center">
                    <Link
                      href={game.downloadUrl}
                      className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base md:text-lg inline-flex items-center gap-2 sm:gap-3 transition-all shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 active:scale-95 w-full sm:w-auto justify-center"
                    >
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 shrink-0"
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
                      <span className="hidden sm:inline">| APK डाउनलोड करें</span>
                    </Link>
                  </div>

                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
                    प्लेटफॉर्म में regional variants हैं जो आपके gaming experience में local flavor जोड़ते हैं, हर session को unique और enjoyable बनाते हैं। The platform features regional variants that add a local flavor to your gaming experience, making every session unique and enjoyable. विभिन्न game modes में महारत हासिल करें और विभिन्न levels of gameplay के माध्यम से progress करते हुए नई challenges खोजें। Master different game modes and discover new challenges as you progress through various levels of gameplay.
                  </p>
                </div>
              </section>

              {/* Section 4 */}
              <section className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-l-4 border-green-500">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-green-600 mb-3 sm:mb-4 flex items-start sm:items-center gap-2 sm:gap-3">
                  <span className="bg-green-600 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-base sm:text-xl shrink-0 mt-0.5 sm:mt-0">4</span>
                  <span className="flex-1">Play with Friends, Private Tables, and Chat Features | दोस्तों के साथ खेलें, निजी टेबल और चैट सुविधाएं</span>
                </h2>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
                  {gameName} की social features के माध्यम से friends और family के साथ connect करें। Connect with friends and family through {gameName}'s social features. अपने loved ones के साथ exclusive games के लिए private tables बनाएं, और gameplay के दौरान communicate करने के लिए built-in chat feature का उपयोग करें। Create private tables for exclusive games with your loved ones, and use the built-in chat feature to communicate during gameplay. प्लेटफॉर्म आपके favorite card games का आनंद लेते हुए connected रहना आसान बनाता है। The platform makes it easy to stay connected while enjoying your favorite card games.
                </p>
              </section>

              {/* Section 5 */}
              <section className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-l-4 border-yellow-500">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-yellow-600 mb-3 sm:mb-4 flex items-start sm:items-center gap-2 sm:gap-3">
                  <span className="bg-yellow-500 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-base sm:text-xl shrink-0 mt-0.5 sm:mt-0">5</span>
                  <span className="flex-1">Real Money Gaming and Secure Transactions | रियल मनी गेमिंग और सुरक्षित लेनदेन</span>
                </h2>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
                  {gameName} secure और fast transactions के साथ real money gaming opportunities प्रदान करता है। {gameName} offers real money gaming opportunities with secure and fast transactions. multiple payment options और instant withdrawals के साथ, आप एक seamless gaming experience का आनंद ले सकते हैं। With multiple payment options and instant withdrawals, you can enjoy a seamless gaming experience. प्लेटफॉर्म आपके सभी transactions के लिए 100% security सुनिश्चित करता है, आपको play करते समय peace of mind देता है। The platform ensures 100% security for all your transactions, giving you peace of mind while you play.
                </p>
              </section>

              {/* Section 6 */}
              <section className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-l-4 border-indigo-500">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-indigo-600 mb-3 sm:mb-4 flex items-start sm:items-center gap-2 sm:gap-3">
                  <span className="bg-indigo-600 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-base sm:text-xl shrink-0 mt-0.5 sm:mt-0">6</span>
                  <span className="flex-1">Tournaments and Rewards | टूर्नामेंट और पुरस्कार</span>
                </h2>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
                  {gameName} पर exciting tournaments और competitions में participate करें। Participate in exciting tournaments and competitions on {gameName}. देश भर के players के साथ compete करते हुए amazing rewards, bonuses, और cash prizes जीतें। Win amazing rewards, bonuses, and cash prizes as you compete with players from across the country. regular tournaments excitement को जीवित रखते हैं और आपको अपने skills showcase करने और बड़ा जीतने के multiple opportunities प्रदान करते हैं। Regular tournaments keep the excitement alive and offer you multiple opportunities to showcase your skills and win big.
                </p>
              </section>

              {/* Final Download Section */}
              <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 text-center shadow-2xl">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
                  Ready to Start Playing? | खेलना शुरू करने के लिए तैयार हैं?
                </h3>
                <p className="text-red-100 mb-4 sm:mb-6 text-sm sm:text-base md:text-lg px-2">
                  Download {gameName} now and join thousands of happy players! | अभी {gameName} डाउनलोड करें और हजारों खुश खिलाड़ियों में शामिल हों!
                </p>
                <Link
                  href={game.downloadUrl}
                  className="bg-white hover:bg-gray-100 text-red-600 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg md:text-xl inline-flex items-center gap-2 sm:gap-3 transition-all shadow-2xl hover:shadow-white/50 transform hover:scale-105 active:scale-95 w-full sm:w-auto justify-center"
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
                  <span>+ Download {shortName}</span>
                  <span className="text-xs sm:text-sm opacity-75 hidden sm:inline">| + {shortName} डाउनलोड करें</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
