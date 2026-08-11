"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "../AdminLayout";
import { ADMIN_CREDENTIALS } from "@/lib/admin-config";
import { TOUR_PACKAGES, UMRAH_PACKAGES } from "@/lib/data";
import { Search, Plus, Edit, Trash2, Eye, Star, MapPin, Clock } from "lucide-react";

interface User {
  email: string;
  role: string;
  name: string;
}

export function AdminPackagesContent() {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("admin_session");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const allPackages = [...TOUR_PACKAGES, ...UMRAH_PACKAGES];
  const filtered = allPackages.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.destination.toLowerCase().includes(search.toLowerCase())
  );

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
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-text">Packages</h2>
            <p className="text-sm text-gray-500">Manage your tour and Umrah packages</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search packages..."
                className="rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-accent"
              />
            </div>
            <button className="flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-accent-light">
              <Plus className="h-4 w-4" />
              Add Package
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Package</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Duration</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Rating</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((pkg) => (
                  <tr key={pkg.id} className="transition-colors hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="h-12 w-16 rounded-lg bg-cover bg-center"
                          style={{ backgroundImage: `url(${pkg.image})` }}
                        />
                        <div>
                          <p className="text-sm font-medium text-text">{pkg.title}</p>
                          <p className="flex items-center gap-1 text-xs text-gray-500">
                            <MapPin className="h-3 w-3" />
                            {pkg.destination}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold capitalize text-accent">
                        {pkg.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="h-3 w-3" />
                        {pkg.duration}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-primary">
                        PKR {pkg.price.toLocaleString()}
                      </span>
                      {pkg.originalPrice && (
                        <span className="ml-2 text-xs text-gray-400 line-through">
                          PKR {pkg.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="text-sm">{pkg.rating}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-accent/10 hover:text-accent">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
