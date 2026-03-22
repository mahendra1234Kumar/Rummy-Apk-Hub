import mongoose, { Schema, models } from "mongoose";

const BlogSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    image: { type: String, default: "/websitelogo.png" },
    author: { type: String, default: "Admin", trim: true },
    category: { type: String, default: "Rummy", trim: true },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Blog = models.Blog || mongoose.model("Blog", BlogSchema);
