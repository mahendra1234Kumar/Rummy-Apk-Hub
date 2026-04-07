import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogList from "@/components/BlogList";
import { getBlogs } from "@/lib/blogs";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Rummy Blogs, APK Tips & Game Updates",
  description:
    "Read the latest rummy blogs, teen patti updates, APK guides, and gaming tips on rummys.online.",
  keywords: [
    "rummy blogs",
    "rummy tips",
    "rummy apk blog",
    "teen patti blog",
    "gaming updates",
    "rummy guide",
  ],
  openGraph: {
    title: "Rummy Blogs, APK Tips & Game Updates",
    description:
      "Explore published rummy blogs, APK updates, and helpful gaming articles on rummys.online.",
    type: "website",
    url: "https://rummys.online/blogs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rummy Blogs, APK Tips & Game Updates",
    description:
      "Explore published rummy blogs, APK updates, and helpful gaming articles on rummys.online.",
  },
  alternates: {
    canonical: "/blogs",
  },
};

export default async function BlogsPage() {
  const blogs = await getBlogs({ publishedOnly: true });

  return (
    <div className="page-shell min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6 md:py-10">
        <section className="mb-8 md:mb-10">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-emerald-800">
              News, Tips & Updates
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Latest Blogs
            </h1>
            <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
              Read published updates, gaming tips, and helpful articles from
              rummys.online in one clean, easy-to-browse place.
            </p>
          </div>
        </section>

        <section>
          <div className="mb-6">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                Recent Articles
              </h2>
            </div>
          </div>

          <BlogList blogs={blogs} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
