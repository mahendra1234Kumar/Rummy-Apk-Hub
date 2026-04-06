import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogList from "@/components/BlogList";
import { getBlogs } from "@/lib/blogs";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Read the latest rummy, teen patti, and gaming blog posts on rummys.online.",
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
        <section className="relative overflow-hidden rounded-[2.25rem] border border-emerald-900/10 bg-[linear-gradient(135deg,rgba(20,83,45,0.96),rgba(34,197,94,0.78),rgba(132,204,22,0.78))] px-6 py-8 text-white shadow-[0_24px_80px_rgba(20,83,45,0.18)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-0 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-orange-300/20 blur-2xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-emerald-50/90">
                News, Tips & Updates
              </p>
              <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                Blogs that match the style and speed of your site.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-emerald-50/90 sm:text-lg">
                Explore app updates, gaming tips, and bonus-focused articles in
                a cleaner blog experience built to feel like part of
                rummys.online, not a separate page.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="rounded-3xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-sm">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-50/80">
                  Published
                </p>
                <p className="mt-3 text-3xl font-black">{blogs.length}</p>
              </div>
              <div className="rounded-3xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-sm">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-50/80">
                  Focus
                </p>
                <p className="mt-3 text-base font-bold leading-6">
                  Guides and game updates
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 md:mt-10">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-orange-700">
                Blog Hub
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                Helpful reads for your visitors
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              Every published post from the admin panel appears here in a
              cleaner, more premium layout designed to fit your existing site
              theme.
            </p>
          </div>

          <BlogList blogs={blogs} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
