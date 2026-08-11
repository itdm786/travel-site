"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "../AdminLayout";
import { DESTINATIONS } from "@/lib/data";
import { Search, Plus, Edit, Trash2, MapPin, Star } from "lucide-react";

interface User {
  email: string;
  role: string;
  name: string;
}

export function AdminDestinationsContent() {
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
            <h2 className="font-display text-2xl font-bold text-text">Destinations</h2>
            <p className="text-sm text-gray-500">Manage travel destinations</p>
          </div>
          <button className="flex items-center gap-2 self-start rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-accent-light">
            <Plus className="h-4 w-4" />
            Add Destination
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {DESTINATIONS.map((dest, i) => (
            <div key={dest.id} className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-lg">
              <div className="relative h-40 overflow-hidden">
                <div
                  className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${dest.image})` }}
                />
                <div className="absolute top-3 right-3 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button className="rounded-lg bg-white/90 p-2 text-gray-600 backdrop-blur-sm transition-colors hover:text-accent">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="rounded-lg bg-white/90 p-2 text-gray-600 backdrop-blur-sm transition-colors hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg font-bold text-text">{dest.name}</h3>
                <p className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin className="h-3 w-3" />
                  {dest.country}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="text-sm font-medium">{dest.rating}</span>
                  </span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                    {dest.packages} packages
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
