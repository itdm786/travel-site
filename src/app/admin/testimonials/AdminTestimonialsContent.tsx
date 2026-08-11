"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "../AdminLayout";
import { REVIEWS } from "@/lib/data";
import { Search, Star, CheckCircle, XCircle, Eye, Trash2 } from "lucide-react";

interface User {
  email: string;
  role: string;
  name: string;
}

export function AdminTestimonialsContent() {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("admin_session");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const [data, setData] = useState(
    REVIEWS.map((r, i) => ({ ...r, approved: i < 4, featured: i < 2 }))
  );

  const filtered = data.filter(
    (r) =>
      (filter === "all" || (filter === "approved" && r.approved) || (filter === "pending" && !r.approved)) &&
      (r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.comment.toLowerCase().includes(search.toLowerCase()) ||
        r.package.toLowerCase().includes(search.toLowerCase()))
  );

  const toggleApproval = (id: string) => {
    setData((prev) => prev.map((r) => (r.id === id ? { ...r, approved: !r.approved } : r)));
  };

  const toggleFeatured = (id: string) => {
    setData((prev) => prev.map((r) => (r.id === id ? { ...r, featured: !r.featured } : r)));
  };

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
            <h2 className="font-display text-2xl font-bold text-text">Testimonials</h2>
            <p className="text-sm text-gray-500">Manage customer reviews and ratings</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search reviews..."
                className="rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-accent"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-accent"
            >
              <option value="all">All</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Total Reviews", value: data.length, icon: Star, color: "bg-amber-500" },
            { label: "Approved", value: data.filter((d) => d.approved).length, icon: CheckCircle, color: "bg-emerald-500" },
            { label: "Avg Rating", value: (data.reduce((a, b) => a + b.rating, 0) / data.length).toFixed(1), icon: Star, color: "bg-accent" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.color}`}>
                <s.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500">{s.label}</p>
                <p className="font-display text-xl font-bold text-text">{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((review) => (
            <div key={review.id} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "fill-accent text-accent" : "fill-gray-100 text-gray-200"}`}
                    />
                  ))}
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                  review.approved ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                }`}>
                  {review.approved ? "Approved" : "Pending"}
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-gray-600 line-clamp-4">
                &ldquo;{review.comment}&rdquo;
              </p>

              <div className="mt-4 border-t border-gray-100 pt-4">
                <p className="font-semibold text-text">{review.name}</p>
                <p className="text-xs text-gray-500">{review.package}</p>
                <p className="text-xs text-gray-400">{review.date}</p>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => toggleApproval(review.id)}
                  className={`flex flex-1 items-center justify-center gap-1 rounded-xl py-2 text-xs font-semibold transition-all ${
                    review.approved
                      ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                      : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                  }`}
                >
                  {review.approved ? <XCircle className="h-3.5 w-3.5" /> : <CheckCircle className="h-3.5 w-3.5" />}
                  {review.approved ? "Unapprove" : "Approve"}
                </button>
                <button
                  onClick={() => toggleFeatured(review.id)}
                  className={`rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                    review.featured
                      ? "bg-accent text-primary"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Featured
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
