"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "../AdminLayout";
import { BLOG_POSTS } from "@/lib/data";
import { Search, Plus, Edit, Trash2, Eye, FileText, Clock, Tag } from "lucide-react";

interface User {
  email: string;
  role: string;
  name: string;
}

export function AdminBlogContent() {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("admin_session");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    if (typeof window !== "undefined") window.location.href = "/admin";
    return null;
  }

  return (
    <AdminLayout user={user} onLogout={() => { localStorage.removeItem("admin_session"); window.location.href = "/admin"; }}>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-text">Blog Posts</h2>
            <p className="text-sm text-gray-500">Manage travel articles and guides</p>
          </div>
          <button className="flex items-center gap-2 self-start rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-accent-light">
            <Plus className="h-4 w-4" />
            New Post
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post, i) => (
            <div key={post.id} className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-lg">
              <div className="relative h-44 overflow-hidden">
                <div
                  className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${post.image})` }}
                />
                <div className="absolute top-3 right-3 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button className="rounded-lg bg-white/90 p-2 backdrop-blur-sm transition-colors hover:text-accent">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="rounded-lg bg-white/90 p-2 backdrop-blur-sm transition-colors hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <div className="mb-2 flex items-center gap-3">
                  <span className="flex items-center gap-1 text-xs text-accent">
                    <Tag className="h-3 w-3" />
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-text line-clamp-2">{post.title}</h3>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
                <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                  <span className="text-xs text-gray-400">{post.date}</span>
                  <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                    Published
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
