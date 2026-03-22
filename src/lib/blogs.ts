import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/app/models/Blog";
import { Blog as BlogType } from "@/types/blog";

type BlogDocument = {
  _id: { toString(): string };
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  author?: string;
  category?: string;
  isPublished?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

function formatBlog(blog: BlogDocument): BlogType {
  return {
    id: blog._id.toString(),
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    content: blog.content,
    image: blog.image || "/websitelogo.png",
    author: blog.author || "Admin",
    category: blog.category || "Rummy",
    isPublished: blog.isPublished ?? true,
    createdAt: blog.createdAt
      ? new Date(blog.createdAt).toISOString()
      : new Date().toISOString(),
    updatedAt: blog.updatedAt
      ? new Date(blog.updatedAt).toISOString()
      : new Date().toISOString(),
  };
}

export async function getBlogs(options?: {
  publishedOnly?: boolean;
}): Promise<BlogType[]> {
  try {
    await connectDB();

    const query = options?.publishedOnly ? { isPublished: true } : {};
    const blogs = (await Blog.find(query).sort({ createdAt: -1 }).lean()) as BlogDocument[];

    return blogs.map(formatBlog);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export async function getBlogBySlug(
  slug: string
): Promise<BlogType | undefined> {
  try {
    await connectDB();
    const blog = (await Blog.findOne({ slug, isPublished: true }).lean()) as
      | BlogDocument
      | null;

    if (!blog) {
      return undefined;
    }

    return formatBlog(blog);
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return undefined;
  }
}
