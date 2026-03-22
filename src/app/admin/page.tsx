"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { Game } from "@/types/game";
import { Blog } from "@/types/blog";

type AdminTab = "games" | "blogs";

type GameFormData = {
  name: string;
  description: string;
  image: string;
  downloadUrl: string;
  rating: number;
  bonus: string;
  downloads: string;
  minWithdrawal: string;
  isHot: boolean;
  category: string;
};

type BlogFormData = {
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  isPublished: boolean;
};

const initialGameForm: GameFormData = {
  name: "",
  description: "",
  image: "",
  downloadUrl: "",
  rating: 3,
  bonus: "",
  downloads: "",
  minWithdrawal: "",
  isHot: false,
  category: "Rummy",
};

const initialBlogForm: BlogFormData = {
  title: "",
  excerpt: "",
  content: "",
  image: "",
  author: "Admin",
  category: "Rummy",
  isPublished: true,
};

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong";
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>("games");
  const [games, setGames] = useState<Game[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [showGameForm, setShowGameForm] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [gameFormData, setGameFormData] =
    useState<GameFormData>(initialGameForm);
  const [blogFormData, setBlogFormData] =
    useState<BlogFormData>(initialBlogForm);

  useEffect(() => {
    if (!authenticated) {
      return;
    }

    void Promise.all([fetchGames(), fetchBlogs()]);
  }, [authenticated]);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json()) as { success?: boolean };

      if (data.success) {
        setAuthenticated(true);
      } else {
        alert("Invalid password");
      }
    } catch (error) {
      alert(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  async function fetchGames() {
    try {
      const response = await fetch("/api/games");
      const data = (await response.json()) as {
        success?: boolean;
        games?: Game[];
      };

      if (data.success && Array.isArray(data.games)) {
        setGames(data.games);
      }
    } catch (error) {
      console.error("Failed to fetch games:", error);
    }
  }

  async function fetchBlogs() {
    try {
      const response = await fetch("/api/blogs");
      const data = (await response.json()) as {
        success?: boolean;
        blogs?: Blog[];
      };

      if (data.success && Array.isArray(data.blogs)) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  }

  async function handleImageUpload(file: File, type: "game" | "blog") {
    if (!file) {
      return;
    }

    setImageUploading(true);

    try {
      const uploadData = new FormData();
      uploadData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });
      const data = (await response.json()) as {
        success?: boolean;
        path?: string;
        error?: string;
      };

      if (!data.success || !data.path) {
        alert(data.error || "Image upload failed");
        return;
      }

      if (type === "game") {
        setGameFormData((prev) => ({ ...prev, image: data.path! }));
      } else {
        setBlogFormData((prev) => ({ ...prev, image: data.path! }));
      }
    } catch (error) {
      alert(getErrorMessage(error));
    } finally {
      setImageUploading(false);
    }
  }

  async function handleGameSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const isEditing = Boolean(editingGame);
      const response = await fetch("/api/games", {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isEditing ? { id: editingGame?.id, ...gameFormData } : gameFormData
        ),
      });
      const data = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to save game");
      }

      await fetchGames();
      resetGameForm();
      alert(isEditing ? "Game updated successfully" : "Game added successfully");
    } catch (error) {
      alert(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  async function handleBlogSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const isEditing = Boolean(editingBlog);
      const response = await fetch("/api/blogs", {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isEditing ? { id: editingBlog?.id, ...blogFormData } : blogFormData
        ),
      });
      const data = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to save blog");
      }

      await fetchBlogs();
      resetBlogForm();
      alert(isEditing ? "Blog updated successfully" : "Blog added successfully");
    } catch (error) {
      alert(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteGame(id: string) {
    if (!confirm("Are you sure you want to delete this game?")) {
      return;
    }

    try {
      const response = await fetch(`/api/games?id=${id}`, { method: "DELETE" });
      const data = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Delete failed");
      }

      await fetchGames();
      alert("Game deleted successfully");
    } catch (error) {
      alert(getErrorMessage(error));
    }
  }

  async function handleDeleteBlog(id: string) {
    if (!confirm("Are you sure you want to delete this blog?")) {
      return;
    }

    try {
      const response = await fetch(`/api/blogs?id=${id}`, { method: "DELETE" });
      const data = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Delete failed");
      }

      await fetchBlogs();
      alert("Blog deleted successfully");
    } catch (error) {
      alert(getErrorMessage(error));
    }
  }

  function editGame(game: Game) {
    setEditingGame(game);
    setGameFormData({
      name: game.name,
      description: game.description,
      image: game.image,
      downloadUrl: game.downloadUrl,
      rating: game.rating,
      bonus: game.bonus || "",
      downloads: game.downloads || "",
      minWithdrawal: game.minWithdrawal || "",
      isHot: game.isHot,
      category: game.category || "Rummy",
    });
    setShowGameForm(true);
    setActiveTab("games");
  }

  function editBlog(blog: Blog) {
    setEditingBlog(blog);
    setBlogFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      image: blog.image,
      author: blog.author,
      category: blog.category,
      isPublished: blog.isPublished,
    });
    setShowBlogForm(true);
    setActiveTab("blogs");
  }

  function resetGameForm() {
    setGameFormData(initialGameForm);
    setEditingGame(null);
    setShowGameForm(false);
  }

  function resetBlogForm() {
    setBlogFormData(initialBlogForm);
    setEditingBlog(null);
    setShowBlogForm(false);
  }

  function renderGamesSection() {
    return (
      <>
        <div className="mb-6">
          <button
            onClick={() => {
              resetGameForm();
              setShowGameForm(true);
            }}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            + Add New Game
          </button>
        </div>

        {showGameForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {editingGame ? "Edit Game" : "Add New Game"}
            </h2>
            <form onSubmit={handleGameSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Game Name *</label>
                  <input
                    type="text"
                    value={gameFormData.name}
                    onChange={(e) =>
                      setGameFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Category</label>
                  <input
                    type="text"
                    value={gameFormData.category}
                    onChange={(e) =>
                      setGameFormData((prev) => ({ ...prev, category: e.target.value }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Description *</label>
                <textarea
                  value={gameFormData.description}
                  onChange={(e) =>
                    setGameFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Image (URL or Upload)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={gameFormData.image}
                      onChange={(e) =>
                        setGameFormData((prev) => ({ ...prev, image: e.target.value }))
                      }
                      className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="/games/image.jpg"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          void handleImageUpload(file, "game");
                          e.target.value = "";
                        }
                      }}
                      className="text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Download URL</label>
                  <input
                    type="text"
                    value={gameFormData.downloadUrl}
                    onChange={(e) =>
                      setGameFormData((prev) => ({
                        ...prev,
                        downloadUrl: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Rating (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={gameFormData.rating}
                    onChange={(e) =>
                      setGameFormData((prev) => ({
                        ...prev,
                        rating: Number(e.target.value) || 1,
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Signup Bonus</label>
                  <input
                    type="text"
                    value={gameFormData.bonus}
                    onChange={(e) =>
                      setGameFormData((prev) => ({ ...prev, bonus: e.target.value }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Downloads</label>
                  <input
                    type="text"
                    value={gameFormData.downloads}
                    onChange={(e) =>
                      setGameFormData((prev) => ({
                        ...prev,
                        downloads: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Min. Withdrawal</label>
                  <input
                    type="text"
                    value={gameFormData.minWithdrawal}
                    onChange={(e) =>
                      setGameFormData((prev) => ({
                        ...prev,
                        minWithdrawal: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center mt-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={gameFormData.isHot}
                      onChange={(e) =>
                        setGameFormData((prev) => ({ ...prev, isHot: e.target.checked }))
                      }
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700 font-medium">Mark as Hot Game</span>
                  </label>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={loading || imageUploading}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {imageUploading
                    ? "Uploading image..."
                    : loading
                      ? "Saving..."
                      : editingGame
                        ? "Update Game"
                        : "Add Game"}
                </button>
                <button
                  type="button"
                  onClick={resetGameForm}
                  className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Games List ({games.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bonus</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {games.map((game) => (
                  <tr key={game.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{game.name}</div>
                      <div className="text-sm text-gray-500 line-clamp-1">{game.description}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{game.category || "-"}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{game.rating}/5</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{game.bonus || "-"}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{game.isHot ? "Hot" : "Normal"}</td>
                    <td className="px-6 py-4 text-sm font-medium space-x-3">
                      <button onClick={() => editGame(game)} className="text-blue-600 hover:text-blue-900">
                        Edit
                      </button>
                      <button
                        onClick={() => void handleDeleteGame(game.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }

  function renderBlogsSection() {
    return (
      <>
        <div className="mb-6">
          <button
            onClick={() => {
              resetBlogForm();
              setShowBlogForm(true);
            }}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            + Add New Blog
          </button>
        </div>

        {showBlogForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {editingBlog ? "Edit Blog" : "Add New Blog"}
            </h2>
            <form onSubmit={handleBlogSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Blog Title *</label>
                  <input
                    type="text"
                    value={blogFormData.title}
                    onChange={(e) =>
                      setBlogFormData((prev) => ({ ...prev, title: e.target.value }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Author</label>
                  <input
                    type="text"
                    value={blogFormData.author}
                    onChange={(e) =>
                      setBlogFormData((prev) => ({ ...prev, author: e.target.value }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Category</label>
                  <input
                    type="text"
                    value={blogFormData.category}
                    onChange={(e) =>
                      setBlogFormData((prev) => ({ ...prev, category: e.target.value }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center mt-8">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={blogFormData.isPublished}
                      onChange={(e) =>
                        setBlogFormData((prev) => ({
                          ...prev,
                          isPublished: e.target.checked,
                        }))
                      }
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700 font-medium">Publish this blog</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Excerpt *</label>
                <textarea
                  value={blogFormData.excerpt}
                  onChange={(e) =>
                    setBlogFormData((prev) => ({ ...prev, excerpt: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Full Content *</label>
                <textarea
                  value={blogFormData.content}
                  onChange={(e) =>
                    setBlogFormData((prev) => ({ ...prev, content: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={10}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Blog Image</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={blogFormData.image}
                    onChange={(e) =>
                      setBlogFormData((prev) => ({ ...prev, image: e.target.value }))
                    }
                    className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="/games/blog-image.jpg"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        void handleImageUpload(file, "blog");
                        e.target.value = "";
                      }
                    }}
                    className="text-sm"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={loading || imageUploading}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {imageUploading
                    ? "Uploading image..."
                    : loading
                      ? "Saving..."
                      : editingBlog
                        ? "Update Blog"
                        : "Add Blog"}
                </button>
                <button
                  type="button"
                  onClick={resetBlogForm}
                  className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Blogs List ({blogs.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                      <div className="text-sm text-gray-500 line-clamp-1">{blog.excerpt}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{blog.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{blog.author}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">/blogs/{blog.slug}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {blog.isPublished ? "Published" : "Draft"}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium space-x-3">
                      <button onClick={() => editBlog(blog)} className="text-blue-600 hover:text-blue-900">
                        Edit
                      </button>
                      <button
                        onClick={() => void handleDeleteBlog(blog.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Admin Login
            </h1>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            <p className="text-sm text-gray-500 mt-4 text-center">
              Default password: admin123
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
            <p className="text-gray-500 mt-1">
              Manage games and blogs from one place.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              View Website
            </Link>
            <button
              onClick={() => setAuthenticated(false)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setActiveTab("games")}
            className={`px-4 py-2 rounded font-medium transition ${
              activeTab === "games"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-300"
            }`}
          >
            Games
          </button>
          <button
            onClick={() => setActiveTab("blogs")}
            className={`px-4 py-2 rounded font-medium transition ${
              activeTab === "blogs"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-300"
            }`}
          >
            Blogs
          </button>
        </div>

        {activeTab === "games" ? renderGamesSection() : renderBlogsSection()}
      </div>
    </div>
  );
}
