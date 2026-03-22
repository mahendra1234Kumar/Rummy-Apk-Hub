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
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48 w-full bg-gray-100">
        <Image
          src={blog.image || "/websitelogo.png"}
          alt={blog.title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
          <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-medium">
            {blog.category}
          </span>
          <span>{publishedDate}</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          <Link href={`/blogs/${blog.slug}`} className="hover:text-blue-700">
            {blog.title}
          </Link>
        </h2>
        <p className="text-sm text-gray-600 leading-6 line-clamp-3 mb-4">
          {blog.excerpt}
        </p>
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-gray-500">By {blog.author}</span>
          <Link
            href={`/blogs/${blog.slug}`}
            className="text-sm font-semibold text-blue-700 hover:text-blue-800"
          >
            Read More
          </Link>
        </div>
      </div>
    </article>
  );
}
