import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getBlogBySlug } from "@/lib/blogs";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [blog.image],
    },
    alternates: {
      canonical: `/blogs/${blog.slug}`,
    },
  };
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const publishedDate = new Date(blog.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const contentParagraphs = blog.content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <Link
          href="/blogs"
          className="inline-flex items-center text-sm font-medium text-blue-700 hover:text-blue-800 mb-6"
        >
          Back to Blogs
        </Link>

        <article className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm overflow-hidden">
          <div className="relative h-64 sm:h-80 md:h-96 bg-gray-100">
            <Image
              src={blog.image || "/websitelogo.png"}
              alt={blog.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
                {blog.category}
              </span>
              <span>{publishedDate}</span>
              <span>By {blog.author}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
              {blog.title}
            </h1>
            <p className="text-lg text-gray-600 leading-8 mb-8">
              {blog.excerpt}
            </p>

            <div className="space-y-5 text-gray-700 leading-8 text-base md:text-lg">
              {contentParagraphs.map((paragraph, index) => (
                <p key={`${blog.id}-${index}`}>{paragraph}</p>
              ))}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
