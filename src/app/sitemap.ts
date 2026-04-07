import type { MetadataRoute } from "next";
import { getGamePath, getGames } from "@/lib/games";
import { getBlogs } from "@/lib/blogs";

const siteUrl = "https://rummys.online";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [games, blogs] = await Promise.all([
    getGames(),
    getBlogs({ publishedOnly: true }),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  const gamePages: MetadataRoute.Sitemap = games.map((game) => ({
    url: `${siteUrl}${getGamePath(game)}`,
    lastModified: new Date(game.updatedAt || game.createdAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${siteUrl}/blogs/${blog.slug}`,
    lastModified: new Date(blog.updatedAt || blog.createdAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...gamePages, ...blogPages];
}
