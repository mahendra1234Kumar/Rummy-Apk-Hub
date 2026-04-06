import { Blog } from "@/types/blog";
import BlogCard from "./BlogCard";
import Image from "next/image";
import Link from "next/link";

interface BlogListProps {
  blogs: Blog[];
}

export default function BlogList({ blogs }: BlogListProps) {
  if (blogs.length === 0) {
    return (
      <div className="rounded-[2rem] border border-dashed border-emerald-900/15 bg-white/75 px-6 py-16 text-center shadow-[0_20px_60px_rgba(20,83,45,0.06)]">
        <div className="mx-auto max-w-xl">
          <span className="inline-flex rounded-full bg-orange-100 px-4 py-1 text-xs font-bold uppercase tracking-[0.28em] text-orange-700">
            Coming Soon
          </span>
          <p className="mt-5 text-2xl font-black tracking-tight text-slate-950">
            Fresh blog updates are on the way.
          </p>
          <p className="mt-3 text-base leading-7 text-slate-600">
            New guides, bonus tips, and app updates will appear here after they
            are published from the admin panel.
          </p>
        </div>
      </div>
    );
  }

  const [featuredBlog, ...otherBlogs] = blogs;

  return (
    <div className="space-y-10">
      <article className="overflow-hidden rounded-[2rem] border border-emerald-900/10 bg-white/85 shadow-[0_22px_70px_rgba(20,83,45,0.1)]">
        <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative min-h-[320px] bg-emerald-100">
            <Image
              src={featuredBlog.image || "/websitelogo.png"}
              alt={featuredBlog.title}
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/80 via-emerald-900/35 to-transparent" />
            <div className="absolute left-6 top-6 inline-flex rounded-full border border-white/20 bg-white/15 px-4 py-1 text-xs font-bold uppercase tracking-[0.28em] text-white backdrop-blur-sm">
              Featured Story
            </div>
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-800">
                {featuredBlog.category}
              </span>
              <span>
                {new Date(featuredBlog.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              {featuredBlog.title}
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              {featuredBlog.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span>By {featuredBlog.author}</span>
              <span className="h-1 w-1 rounded-full bg-orange-400" />
              <span>Published article</span>
            </div>

            <div className="mt-8">
              <Link
                href={`/blogs/${featuredBlog.slug}`}
                className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-950 via-emerald-700 to-lime-500 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-[0_14px_40px_rgba(22,101,52,0.2)] transition hover:scale-[1.02]"
              >
                Read Featured Blog
              </Link>
            </div>
          </div>
        </div>
      </article>

      {otherBlogs.length > 0 && (
        <section className="space-y-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-emerald-800">
                Latest Reads
              </p>
              <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                More stories from rummys.online
              </h3>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-600">
              Browse recent game updates, helpful guides, and bonus-focused
              content curated for your audience.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {otherBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
