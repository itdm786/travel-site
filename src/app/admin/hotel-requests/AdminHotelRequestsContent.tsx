"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "../AdminLayout";
import { Search, Building2, Calendar, Users, Star, CheckCircle, Clock } from "lucide-react";

interface User {
  email: string;
  role: string;
  name: string;
}

interface HotelRequest {
  id: number;
  name: string;
  email: string;
  phone: string;
  hotel: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  status: "pending" | "quoted" | "confirmed";
}

const hotelRequests: HotelRequest[] = [
  { id: 1, name: "Ahmed Hassan", email: "ahmed@email.com", phone: "+92 300 1234567", hotel: "Burj Al Arab", location: "Dubai, UAE", checkIn: "2026-02-15", checkOut: "2026-02-20", guests: 2, rooms: 1, status: "pending" },
  { id: 2, name: "Fatima Khan", email: "fatima@email.com", phone: "+92 333 9876543", hotel: "Pullman ZamZam", location: "Makkah, Saudi Arabia", checkIn: "2026-03-01", checkOut: "2026-03-10", guests: 4, rooms: 2, status: "quoted" },
  { id: 3, name: "Usman Ali", email: "usman@email.com", phone: "+92 321 5551234", hotel: "Ciragan Palace", location: "Istanbul, Turkey", checkIn: "2026-02-25", checkOut: "2026-03-05", guests: 2, rooms: 1, status: "confirmed" },
  { id: 4, name: "Sara Malik", email: "sara@email.com", phone: "+92 300 7778899", hotel: "Mandarin Oriental", location: "Bangkok, Thailand", checkIn: "2026-03-10", checkOut: "2026-03-17", guests: 3, rooms: 2, status: "pending" },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  pending: { label: "Pending", color: "bg-amber-100 text-amber-700" },
  quoted: { label: "Quoted", color: "bg-blue-100 text-blue-700" },
  confirmed: { label: "Confirmed", color: "bg-emerald-100 text-emerald-700" },
};

export function AdminHotelRequestsContent() {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("admin_session");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const filtered = hotelRequests.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.hotel.toLowerCase().includes(search.toLowerCase()) ||
      r.location.toLowerCase().includes(search.toLowerCase())
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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-text">Hotel Requests</h2>
            <p className="text-sm text-gray-500">Manage hotel booking inquiries</p>
          </div>
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search requests..."
              className="rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-accent"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Total Requests", value: hotelRequests.length, icon: Building2, color: "bg-blue-500" },
            { label: "Pending", value: hotelRequests.filter((f) => f.status === "pending").length, icon: Clock, color: "bg-amber-500" },
            { label: "Confirmed", value: hotelRequests.filter((f) => f.status === "confirmed").length, icon: CheckCircle, color: "bg-emerald-500" },
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

        <div className="grid gap-4">
          {filtered.map((req) => {
            const status = statusConfig[req.status];
            const nights = Math.ceil((new Date(req.checkOut).getTime() - new Date(req.checkIn).getTime()) / (1000 * 60 * 60 * 24));
            return (
              <div key={req.id} className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50">
                    <Building2 className="h-6 w-6 text-amber-500" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-text">{req.hotel}</p>
                    <p className="flex items-center gap-1 text-sm text-gray-500">
                      <Star className="h-3 w-3 fill-accent text-accent" />
                      {req.location}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">{req.name} • {req.phone}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {req.checkIn} → {req.checkOut}
                    </span>
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs">{nights} nights</span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {req.guests} guests / {req.rooms} rooms
                    </span>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status.color}`}>
                    {status.label}
                  </span>
                  <button className="rounded-xl bg-accent/10 px-4 py-2 text-sm font-semibold text-accent transition-all hover:bg-accent hover:text-primary">
                    Send Quote
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
