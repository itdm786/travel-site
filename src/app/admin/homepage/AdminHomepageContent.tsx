"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "../AdminLayout";
import { Layout, Eye, EyeOff, GripVertical, Save, Plus, Trash2 } from "lucide-react";

interface User {
  email: string;
  role: string;
  name: string;
}

interface Section {
  id: string;
  name: string;
  enabled: boolean;
}

const defaultSections: Section[] = [
  { id: "hero", name: "Hero Section", enabled: true },
  { id: "destinations", name: "Popular Destinations", enabled: true },
  { id: "packages", name: "Top Selling Packages", enabled: true },
  { id: "whyChooseUs", name: "Why Choose Us", enabled: true },
  { id: "visa", name: "Visa Services", enabled: true },
  { id: "umrah", name: "Umrah Packages", enabled: true },
  { id: "reviews", name: "Customer Reviews", enabled: true },
  { id: "blog", name: "Latest Blog", enabled: true },
  { id: "cta", name: "CTA Banner", enabled: true },
  { id: "partners", name: "Partners", enabled: true },
  { id: "newsletter", name: "Newsletter", enabled: false },
  { id: "gallery", name: "Gallery Preview", enabled: false },
];

export function AdminHomepageContent() {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [sections, setSections] = useState(defaultSections);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("admin_session");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const toggleSection = (id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const moveSection = (index: number, direction: "up" | "down") => {
    setSections((prev) => {
      const newSections = [...prev];
      const newIndex = direction === "up" ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= newSections.length) return prev;
      [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
      return newSections;
    });
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
            <h2 className="font-display text-2xl font-bold text-text">Homepage Builder</h2>
            <p className="text-sm text-gray-500">Drag to reorder sections and toggle visibility</p>
          </div>
          <button className="flex items-center gap-2 self-start rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-accent-light">
            <Save className="h-4 w-4" />
            Save Layout
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Sections List */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 font-display font-bold text-text">
              <Layout className="h-5 w-5 text-accent" />
              Page Sections
            </h3>
            <div className="space-y-2">
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  className={`flex items-center gap-3 rounded-xl border p-3 transition-all ${
                    section.enabled
                      ? "border-accent/30 bg-accent/5"
                      : "border-gray-100 bg-gray-50"
                  }`}
                >
                  <GripVertical className="h-5 w-5 text-gray-300" />
                  <span className="flex-1 font-medium text-text">{section.name}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveSection(index, "up")}
                      disabled={index === 0}
                      className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 disabled:opacity-30"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveSection(index, "down")}
                      disabled={index === sections.length - 1}
                      className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 disabled:opacity-30"
                    >
                      ↓
                    </button>
                  </div>
                  <button
                    onClick={() => toggleSection(section.id)}
                    className={`rounded-lg p-2 transition-all ${
                      section.enabled
                        ? "bg-accent text-primary"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {section.enabled ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Preview & Settings */}
          <div className="space-y-6">
            {/* Hero Settings */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-display font-bold text-text">Hero Section Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-500 uppercase">Main Heading</label>
                  <input
                    type="text"
                    defaultValue="Discover the World In Luxury"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-500 uppercase">Subheading</label>
                  <textarea
                    rows={2}
                    defaultValue="From breathtaking destinations to seamless travel experiences — let Easy Travel & Tours craft your perfect journey."
                    className="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-500 uppercase">Background Image URL</label>
                  <input
                    type="text"
                    defaultValue="https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-accent"
                  />
                </div>
              </div>
            </div>

            {/* Section Counts */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-display font-bold text-text">Items to Display</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Destinations", value: 8 },
                  { label: "Packages", value: 6 },
                  { label: "Reviews", value: 6 },
                  { label: "Blog Posts", value: 3 },
                ].map((item) => (
                  <div key={item.label}>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500 uppercase">{item.label}</label>
                    <input
                      type="number"
                      defaultValue={item.value}
                      min={1}
                      max={20}
                      className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-accent"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Preview Button */}
            <a
              href="/"
              target="_blank"
              className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-white transition-all hover:bg-primary-light"
            >
              <Eye className="h-4 w-4" />
              Preview Homepage
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
