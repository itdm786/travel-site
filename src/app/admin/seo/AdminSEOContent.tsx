"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "../AdminLayout";
import { Search, Save, Eye, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

interface User {
  email: string;
  role: string;
  name: string;
}

const seoPages = [
  { id: 1, path: "/", title: "Easy Travel & Tours | Premium Travel Agency Pakistan", score: 92, status: "good" },
  { id: 2, path: "/umrah", title: "Umrah Packages 2026 - Premium Umrah Packages from Pakistan", score: 88, status: "good" },
  { id: 3, path: "/flights", title: "Flight Booking - Book Cheap Flights Worldwide", score: 75, status: "warning" },
  { id: 4, path: "/visa-services", title: "Visa Services - Hassle-Free Visa Processing", score: 90, status: "good" },
  { id: 5, path: "/holiday-packages", title: "Holiday Packages - Premium Tour Packages", score: 62, status: "poor" },
  { id: 6, path: "/about", title: "About Us - Easy Travel & Tours", score: 70, status: "warning" },
  { id: 7, path: "/contact", title: "Contact Us - Easy Travel & Tours Islamabad", score: 85, status: "good" },
  { id: 8, path: "/hajj", title: "Hajj Packages 2026 - Comprehensive Hajj Packages", score: 55, status: "poor" },
];

export function AdminSEOContent() {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [selectedPage, setSelectedPage] = useState(seoPages[0]);
  const [seoData, setSeoData] = useState({
    title: selectedPage.title,
    description: "",
    keywords: "",
    ogTitle: "",
    ogDescription: "",
  });

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

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-emerald-500";
    if (score >= 70) return "text-amber-500";
    return "text-red-500";
  };

  const getStatusIcon = (status: string) => {
    if (status === "good") return <CheckCircle className="h-4 w-4 text-emerald-500" />;
    if (status === "warning") return <AlertCircle className="h-4 w-4 text-amber-500" />;
    return <AlertCircle className="h-4 w-4 text-red-500" />;
  };

  return (
    <AdminLayout user={user} onLogout={() => { localStorage.removeItem("admin_session"); window.location.href = "/admin"; }}>
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-text">SEO Manager</h2>
          <p className="text-sm text-gray-500">Optimize meta tags and page SEO</p>
        </div>

        {/* Overview */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Avg SEO Score</p>
              <p className="font-display text-xl font-bold text-text">
                {Math.round(seoPages.reduce((a, b) => a + b.score, 0) / seoPages.length)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500">
              <Search className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Pages Optimized</p>
              <p className="font-display text-xl font-bold text-text">{seoPages.filter((p) => p.score >= 85).length}/{seoPages.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500">
              <AlertCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Needs Attention</p>
              <p className="font-display text-xl font-bold text-text">{seoPages.filter((p) => p.score < 70).length}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Pages List */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-display font-bold text-text">Page SEO Scores</h3>
            <div className="space-y-2">
              {seoPages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => setSelectedPage(page)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all ${
                    selectedPage.id === page.id
                      ? "bg-primary text-white"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {getStatusIcon(page.status)}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${selectedPage.id === page.id ? "text-white" : "text-text"}`}>
                      {page.path}
                    </p>
                    <p className={`text-xs truncate ${selectedPage.id === page.id ? "text-white/70" : "text-gray-500"}`}>
                      {page.title}
                    </p>
                  </div>
                  <span className={`font-bold ${selectedPage.id === page.id ? "text-accent" : getScoreColor(page.score)}`}>
                    {page.score}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* SEO Editor */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-display font-bold text-text">Edit SEO: {selectedPage.path}</h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-500 uppercase">Page Path</label>
                <input
                  type="text"
                  value={selectedPage.path}
                  disabled
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-500 outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-500 uppercase">Meta Title</label>
                <input
                  type="text"
                  value={seoData.title}
                  onChange={(e) => setSeoData({ ...seoData, title: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-accent"
                />
                <p className="mt-1 text-xs text-gray-400">{seoData.title.length}/60 characters</p>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-500 uppercase">Meta Description</label>
                <textarea
                  rows={3}
                  value={seoData.description}
                  onChange={(e) => setSeoData({ ...seoData, description: e.target.value })}
                  placeholder="Enter page description..."
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-accent"
                />
                <p className="mt-1 text-xs text-gray-400">{seoData.description.length}/160 characters</p>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-500 uppercase">Keywords</label>
                <input
                  type="text"
                  value={seoData.keywords}
                  onChange={(e) => setSeoData({ ...seoData, keywords: e.target.value })}
                  placeholder="travel, flights, umrah, visa (comma separated)"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-500 uppercase">Open Graph Title</label>
                <input
                  type="text"
                  value={seoData.ogTitle}
                  onChange={(e) => setSeoData({ ...seoData, ogTitle: e.target.value })}
                  placeholder="Social media title..."
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-accent"
                />
              </div>

              {/* Preview */}
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="mb-2 text-xs font-semibold text-gray-500">Google Preview</p>
                <p className="text-blue-600 text-sm truncate">{seoData.title || "Page Title"}</p>
                <p className="text-xs text-emerald-700">easytravel.com.pk{selectedPage.path}</p>
                <p className="mt-1 text-xs text-gray-600 line-clamp-2">
                  {seoData.description || "Page description will appear here..."}
                </p>
              </div>

              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3 font-semibold text-primary transition-all hover:bg-accent-light">
                <Save className="h-4 w-4" />
                Save SEO Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
