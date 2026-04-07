import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getBlogBySlug } from "@/lib/blogs";

export const dynamic = "force-dynamic";

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
    keywords: [
      blog.title,
      `${blog.category} blog`,
      "rummy article",
      "rummy tips",
      "gaming update",
    ],
    openGraph: {
      type: "article",
      url: `https://rummys.online/blogs/${blog.slug}`,
      title: blog.title,
      description: blog.excerpt,
      images: [blog.image],
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,
      authors: [blog.author],
    },
    twitter: {
      card: "summary_large_image",
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

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.excerpt,
    image: [blog.image],
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt,
    author: {
      "@type": "Person",
      name: blog.author,
    },
    publisher: {
      "@type": "Organization",
      name: "rummys.online",
      logo: {
        "@type": "ImageObject",
        url: "https://rummys.online/websitelogo.png",
      },
    },
    mainEntityOfPage: `https://rummys.online/blogs/${blog.slug}`,
    articleSection: blog.category,
  };

  return (
    <div className="page-shell min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Header />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6 md:py-10">
        <Link
          href="/blogs"
          className="mb-6 inline-flex items-center rounded-full border border-emerald-900/10 bg-white/80 px-4 py-2 text-sm font-semibold text-emerald-900 shadow-sm transition hover:bg-white"
        >
          Back to Blogs
        </Link>

        <article className="overflow-hidden rounded-[2rem] border border-emerald-900/10 bg-white/85 shadow-[0_24px_80px_rgba(20,83,45,0.12)]">
          <div className="relative h-72 bg-emerald-100 sm:h-80 md:h-[28rem]">
            <Image
              src={blog.image || "/websitelogo.png"}
              alt={blog.title}
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 via-emerald-900/15 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 md:p-10">
              <div className="flex flex-wrap items-center gap-3 text-sm text-white/90">
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 font-semibold backdrop-blur-sm">
                  {blog.category}
                </span>
                <span>{publishedDate}</span>
                <span>By {blog.author}</span>
              </div>
              <h1 className="mt-4 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
                {blog.title}
              </h1>
            </div>
          </div>

          <div className="p-6 md:p-10">
            <div className="mx-auto max-w-3xl">
              <p className="rounded-[1.5rem] border border-orange-200 bg-orange-50 px-5 py-4 text-base leading-8 text-slate-700">
                {blog.excerpt}
              </p>

              <div className="my-8 h-px bg-gradient-to-r from-transparent via-emerald-900/15 to-transparent" />

              <div className="space-y-6 text-base leading-8 text-slate-700 md:text-lg">
                {contentParagraphs.map((paragraph, index) => (
                  <p key={`${blog.id}-${index}`}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-10 rounded-[1.75rem] border border-emerald-900/10 bg-gradient-to-r from-emerald-950 to-emerald-700 px-6 py-6 text-white shadow-[0_14px_40px_rgba(20,83,45,0.15)]">
                <p className="text-xs font-bold uppercase tracking-[0.26em] text-emerald-100/80">
                  Keep Exploring
                </p>
                <p className="mt-3 text-xl font-black tracking-tight">
                  Want more updates like this?
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-emerald-50/85">
                  Return to the blogs page to browse more published articles,
                  game updates, and bonus-focused content from rummys.online.
                </p>
                <Link
                  href="/blogs"
                  className="mt-5 inline-flex min-w-52 items-center justify-center rounded-full border border-white/70 bg-white px-6 py-3 no-underline shadow-[0_10px_30px_rgba(255,255,255,0.18)] transition hover:scale-[1.02] hover:bg-emerald-50"
                >
                  <span
                    className="text-sm font-bold uppercase tracking-[0.16em] text-slate-950"
                    style={{ color: "#0f172a" }}
                  >
                    Browse All Blogs
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
