"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "../AdminLayout";
import { FolderOpen, Image as ImageIcon, Upload, Trash2, Grid, List, Search } from "lucide-react";

interface User {
  email: string;
  role: string;
  name: string;
}

const mediaFiles = [
  { id: 1, name: "hero-banner.jpg", size: "2.4 MB", type: "image", folder: "Banners", date: "2026-01-15" },
  { id: 2, name: "dubai-tour-1.jpg", size: "1.8 MB", type: "image", folder: "Packages", date: "2026-01-14" },
  { id: 3, name: "umrah-guide.pdf", size: "3.2 MB", type: "document", folder: "Documents", date: "2026-01-13" },
  { id: 4, name: "logo-primary.svg", size: "24 KB", type: "image", folder: "Branding", date: "2026-01-10" },
  { id: 5, name: "turkey-tour.jpg", size: "2.1 MB", type: "image", folder: "Packages", date: "2026-01-09" },
  { id: 6, name: "visa-form.pdf", size: "450 KB", type: "document", folder: "Documents", date: "2026-01-08" },
  { id: 7, name: "og-image.jpg", size: "890 KB", type: "image", folder: "SEO", date: "2026-01-05" },
  { id: 8, name: "office-photo.jpg", size: "1.5 MB", type: "image", folder: "About", date: "2026-01-04" },
];

export function AdminMediaContent() {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [folder, setFolder] = useState("all");

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("admin_session");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const folders = ["all", "Banners", "Packages", "Documents", "Branding", "SEO", "About"];

  const filtered =
    folder === "all" ? mediaFiles : mediaFiles.filter((f) => f.folder === folder);

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
            <h2 className="font-display text-2xl font-bold text-text">Media Library</h2>
            <p className="text-sm text-gray-500">Upload and organize website files</p>
          </div>
          <div className="flex gap-3">
            <div className="flex rounded-xl border border-gray-200">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 ${viewMode === "grid" ? "bg-primary text-white" : "text-gray-400"}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 ${viewMode === "list" ? "bg-primary text-white" : "text-gray-400"}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
            <button className="flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-accent-light">
              <Upload className="h-4 w-4" />
              Upload Files
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Folders Sidebar */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <h3 className="mb-3 font-display font-bold text-text">Folders</h3>
              <div className="space-y-1">
                {folders.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFolder(f)}
                    className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm capitalize transition-all ${
                      folder === f
                        ? "bg-primary text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <FolderOpen className="h-4 w-4" />
                    {f === "all" ? "All Files" : f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Files */}
          <div className="lg:col-span-3">
            {viewMode === "grid" ? (
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {filtered.map((file) => (
                  <div key={file.id} className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md">
                    <div className="flex h-32 items-center justify-center bg-gray-50">
                      {file.type === "image" ? (
                        <ImageIcon className="h-10 w-10 text-gray-300" />
                      ) : (
                        <span className="font-display text-3xl font-bold text-gray-300">PDF</span>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-medium text-text truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">{file.size} • {file.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Folder</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Size</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filtered.map((file) => (
                      <tr key={file.id} className="transition-colors hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {file.type === "image" ? (
                              <ImageIcon className="h-5 w-5 text-gray-400" />
                            ) : (
                              <span className="text-xs font-bold text-gray-400">PDF</span>
                            )}
                            <span className="text-sm font-medium text-text">{file.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                            {file.folder}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{file.size}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{file.date}</td>
                        <td className="px-6 py-4">
                          <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
