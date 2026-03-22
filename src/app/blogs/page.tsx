import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogList from "@/components/BlogList";
import { getBlogs } from "@/lib/blogs";

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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <section className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Blogs
          </h1>
          <p className="text-gray-600 mt-3 max-w-2xl leading-7">
            Explore helpful articles, app updates, and gaming tips published on
            rummys.online.
          </p>
        </section>
        <BlogList blogs={blogs} />
      </main>
      <Footer />
    </div>
  );
}
