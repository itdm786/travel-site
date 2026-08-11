"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "../AdminLayout";
import { Search, Moon, Calendar, Users, MapPin, Phone, Mail } from "lucide-react";

interface User {
  email: string;
  role: string;
  name: string;
}

interface UmrahRequest {
  id: number;
  name: string;
  email: string;
  phone: string;
  packageType: string;
  travelDate: string;
  pilgrims: number;
  city: string;
  status: "new" | "contacted" | "confirmed" | "completed";
  amount: string;
}

const umrahRequests: UmrahRequest[] = [
  { id: 1, name: "Ahmed Raza", email: "ahmed@email.com", phone: "+92 300 1234567", packageType: "5-Star VIP Umrah", travelDate: "2026-02-20", pilgrims: 2, city: "Islamabad", status: "new", amount: "PKR 790,000" },
  { id: 2, name: "Muhammad Siddiq", email: "siddiq@email.com", phone: "+92 333 9876543", packageType: "Economy Umrah", travelDate: "2026-03-05", pilgrims: 4, city: "Lahore", status: "contacted", amount: "PKR 980,000" },
  { id: 3, name: "Abdul Qadir", email: "qadir@email.com", phone: "+92 321 5551234", packageType: "Ramadan Special", travelDate: "2026-03-15", pilgrims: 2, city: "Karachi", status: "confirmed", amount: "PKR 1,050,000" },
  { id: 4, name: "Zainab Bibi", email: "zainab@email.com", phone: "+92 300 7778899", packageType: "5-Star VIP Umrah", travelDate: "2026-02-28", pilgrims: 6, city: "Rawalpindi", status: "new", amount: "PKR 2,370,000" },
  { id: 5, name: "Farhan Ahmed", email: "farhan@email.com", phone: "+92 311 2223344", packageType: "Economy Umrah", travelDate: "2026-01-25", pilgrims: 2, city: "Peshawar", status: "completed", amount: "PKR 490,000" },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  new: { label: "New", color: "bg-blue-100 text-blue-700" },
  contacted: { label: "Contacted", color: "bg-amber-100 text-amber-700" },
  confirmed: { label: "Confirmed", color: "bg-emerald-100 text-emerald-700" },
  completed: { label: "Completed", color: "bg-purple-100 text-purple-700" },
};

export function AdminUmrahRequestsContent() {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("admin_session");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const filtered = umrahRequests.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.packageType.toLowerCase().includes(search.toLowerCase()) ||
      r.city.toLowerCase().includes(search.toLowerCase())
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
            <h2 className="font-display text-2xl font-bold text-text">Umrah Requests</h2>
            <p className="text-sm text-gray-500">Manage pilgrimage package inquiries</p>
          </div>
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search pilgrims..."
              className="rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-accent"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          {[
            { label: "Total Requests", value: umrahRequests.length, icon: Moon, color: "bg-emerald-500" },
            { label: "New", value: umrahRequests.filter((u) => u.status === "new").length, icon: Users, color: "bg-blue-500" },
            { label: "Confirmed", value: umrahRequests.filter((u) => u.status === "confirmed").length, icon: MapPin, color: "bg-amber-500" },
            { label: "Pilgrims", value: umrahRequests.reduce((a, b) => a + b.pilgrims, 0), icon: Users, color: "bg-purple-500" },
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

        {/* Cards */}
        <div className="grid gap-4 lg:grid-cols-2">
          {filtered.map((req) => {
            const status = statusConfig[req.status];
            return (
              <div key={req.id} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                      <Moon className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-text">{req.name}</p>
                      <p className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPin className="h-3 w-3" />
                        {req.city}
                      </p>
                    </div>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status.color}`}>
                    {status.label}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-gray-50 p-3">
                    <p className="text-xs text-gray-500">Package</p>
                    <p className="text-sm font-semibold text-text">{req.packageType}</p>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-3">
                    <p className="text-xs text-gray-500">Travel Date</p>
                    <p className="flex items-center gap-1 text-sm font-semibold text-text">
                      <Calendar className="h-3 w-3" />
                      {req.travelDate}
                    </p>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-3">
                    <p className="text-xs text-gray-500">Pilgrims</p>
                    <p className="flex items-center gap-1 text-sm font-semibold text-text">
                      <Users className="h-3 w-3" />
                      {req.pilgrims} persons
                    </p>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-3">
                    <p className="text-xs text-gray-500">Amount</p>
                    <p className="text-sm font-semibold text-accent">{req.amount}</p>
                  </div>
                </div>

                <div className="mt-4 flex gap-2 border-t border-gray-100 pt-4">
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary/5 py-2.5 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-white">
                    <Phone className="h-4 w-4" />
                    Call
                  </button>
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent/10 py-2.5 text-sm font-medium text-accent transition-all hover:bg-accent hover:text-primary">
                    <Mail className="h-4 w-4" />
                    Email
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
