import Image from "next/image";
import Link from "next/link";
import { Blog } from "@/types/blog";

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  const publishedDate = new Date(blog.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-emerald-900/10 bg-white/90 shadow-[0_18px_60px_rgba(20,83,45,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(20,83,45,0.16)]">
      <div className="relative h-52 w-full overflow-hidden bg-emerald-100">
        <Image
          src={blog.image || "/websitelogo.png"}
          alt={blog.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-900/10 to-transparent" />
        <div className="absolute left-4 top-4 inline-flex rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-white backdrop-blur-sm">
          {blog.category}
        </div>
      </div>
      <div className="p-6">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          <span>{publishedDate}</span>
          <span className="h-1 w-1 rounded-full bg-orange-400" />
          <span>{blog.author}</span>
        </div>
        <h2 className="mb-3 text-2xl font-black tracking-tight text-slate-950 line-clamp-2">
          <Link
            href={`/blogs/${blog.slug}`}
            className="transition group-hover:text-emerald-800"
          >
            {blog.title}
          </Link>
        </h2>
        <p className="mb-6 text-sm leading-7 text-slate-600 line-clamp-3">
          {blog.excerpt}
        </p>
        <div className="flex items-center justify-between gap-3 border-t border-emerald-900/8 pt-4">
          <span className="text-sm font-medium text-slate-500">
            Story by {blog.author}
          </span>
          <Link
            href={`/blogs/${blog.slug}`}
            className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-900 via-emerald-700 to-lime-500 px-4 py-2 text-sm font-bold text-white shadow-[0_10px_30px_rgba(22,101,52,0.2)] transition hover:scale-[1.02]"
          >
            Read Article
          </Link>
        </div>
      </div>
    </article>
  );
}
