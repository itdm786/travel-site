"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "../AdminLayout";
import { Image as ImageIcon, Upload, Trash2, Eye, Search, Plus } from "lucide-react";

interface User {
  email: string;
  role: string;
  name: string;
}

const galleryItems = [
  { id: 1, title: "Dubai Skyline", category: "Destinations", url: "https://images.pexels.com/photos/2404656/pexels-photo-2404656.jpeg" },
  { id: 2, title: "Istanbul Hagia Sophia", category: "Destinations", url: "https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg" },
  { id: 3, title: "Bangkok Temple", category: "Destinations", url: "https://images.pexels.com/photos/1822481/pexels-photo-1822481.jpeg" },
  { id: 4, title: "Kuala Lumpur Towers", category: "Destinations", url: "https://images.pexels.com/photos/22804/pexels-photo.jpg" },
  { id: 5, title: "Baku Flame Towers", category: "Destinations", url: "https://images.pexels.com/photos/17395806/pexels-photo-17395806.jpeg" },
  { id: 6, title: "Cappadocia Balloons", category: "Tours", url: "https://images.pexels.com/photos/4388161/pexels-photo-4388161.jpeg" },
  { id: 7, title: "Antalya Coast", category: "Tours", url: "https://images.pexels.com/photos/18207966/pexels-photo-18207966.jpeg" },
  { id: 8, title: "Makkah Haram", category: "Umrah", url: "https://images.pexels.com/photos/11148384/pexels-photo-11148384.jpeg" },
  { id: 9, title: "Sri Lanka Tea Plantation", category: "Destinations", url: "https://images.pexels.com/photos/28792455/pexels-photo-28792455.jpeg" },
  { id: 10, title: "Travel Adventure", category: "General", url: "https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg" },
  { id: 11, title: "Beach Paradise", category: "Tours", url: "https://images.pexels.com/photos/2087391/pexels-photo-2087391.jpeg" },
  { id: 12, title: "Mountain Escape", category: "Tours", url: "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg" },
];

export function AdminGalleryContent() {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("admin_session");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const categories = ["all", "Destinations", "Tours", "Umrah", "General"];

  const filtered =
    category === "all"
      ? galleryItems
      : galleryItems.filter((g) => g.category === category);

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
            <h2 className="font-display text-2xl font-bold text-text">Gallery</h2>
            <p className="text-sm text-gray-500">Manage website photos and images</p>
          </div>
          <button className="flex items-center gap-2 self-start rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-accent-light">
            <Upload className="h-4 w-4" />
            Upload Photos
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-5 py-2 text-sm font-medium capitalize transition-all ${
                category === c
                  ? "bg-primary text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent">
            <ImageIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Total Images</p>
            <p className="font-display text-xl font-bold text-text">{galleryItems.length}</p>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-lg">
              <div className="relative h-48 overflow-hidden">
                <div
                  className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${item.url})` }}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="flex h-full items-center justify-center gap-2">
                    <button className="rounded-lg bg-white/90 p-2 backdrop-blur-sm transition-colors hover:text-accent">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg bg-white/90 p-2 backdrop-blur-sm transition-colors hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-text truncate">{item.title}</p>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
