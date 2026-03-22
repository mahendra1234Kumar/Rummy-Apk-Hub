import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/app/models/Blog";

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

type BlogPayload = {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  image?: string;
  author?: string;
  category?: string;
  isPublished?: boolean;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function createUniqueSlug(title: string, currentId?: string) {
  const baseSlug = slugify(title) || `blog-${Date.now()}`;
  let candidate = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await Blog.findOne({ slug: candidate }).select("_id").lean();
    if (!existing || existing._id.toString() === currentId) {
      return candidate;
    }

    counter += 1;
    candidate = `${baseSlug}-${counter}`;
  }
}

function formatBlog(blog: BlogDocument) {
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

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const publishedOnly =
      new URL(request.url).searchParams.get("published") === "true";
    const query = publishedOnly ? { isPublished: true } : {};
    const blogs = (await Blog.find(query).sort({ createdAt: -1 }).lean()) as BlogDocument[];

    return NextResponse.json({
      success: true,
      blogs: blogs.map(formatBlog),
    });
  } catch (error) {
    console.error("GET blogs error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = (await request.json()) as BlogPayload;

    if (!body.title || !body.excerpt || !body.content) {
      return NextResponse.json(
        { success: false, error: "Title, excerpt, and content are required" },
        { status: 400 }
      );
    }

    const slug = await createUniqueSlug(body.title);

    const newBlog = await Blog.create({
      title: body.title,
      slug,
      excerpt: body.excerpt,
      content: body.content,
      image: body.image || "/websitelogo.png",
      author: body.author || "Admin",
      category: body.category || "Rummy",
      isPublished: body.isPublished ?? true,
    });

    return NextResponse.json(
      {
        success: true,
        blog: formatBlog(newBlog.toObject() as BlogDocument),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST blogs error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create blog" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const body = (await request.json()) as BlogPayload;

    if (!body.id) {
      return NextResponse.json(
        { success: false, error: "Blog ID is required" },
        { status: 400 }
      );
    }

    const updates: BlogPayload = { ...body };
    delete updates.id;

    if (updates.title) {
      updates.slug = await createUniqueSlug(updates.title, body.id);
    }

    const updatedBlog = await Blog.findByIdAndUpdate(body.id, updates, {
      new: true,
    }).lean();

    if (!updatedBlog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      blog: formatBlog(updatedBlog as BlogDocument),
    });
  } catch (error) {
    console.error("PUT blogs error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update blog" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB();

    const id = new URL(request.url).searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Blog ID is required" },
        { status: 400 }
      );
    }

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("DELETE blogs error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
