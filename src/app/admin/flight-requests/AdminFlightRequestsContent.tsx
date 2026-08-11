"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "../AdminLayout";
import { Search, Plane, Calendar, Users, CheckCircle, Clock } from "lucide-react";

interface User {
  email: string;
  role: string;
  name: string;
}

interface FlightRequest {
  id: number;
  name: string;
  email: string;
  phone: string;
  from: string;
  to: string;
  departDate: string;
  passengers: number;
  cabinClass: string;
  status: "pending" | "quoted" | "booked";
}

const flightRequests: FlightRequest[] = [
  { id: 1, name: "Ahmed Hassan", email: "ahmed@email.com", phone: "+92 300 1234567", from: "Islamabad", to: "Dubai", departDate: "2026-02-15", passengers: 2, cabinClass: "Economy", status: "pending" },
  { id: 2, name: "Fatima Khan", email: "fatima@email.com", phone: "+92 333 9876543", from: "Lahore", to: "Istanbul", departDate: "2026-02-20", passengers: 4, cabinClass: "Business", status: "quoted" },
  { id: 3, name: "Usman Ali", email: "usman@email.com", phone: "+92 321 5551234", from: "Karachi", to: "Bangkok", departDate: "2026-03-01", passengers: 2, cabinClass: "Economy", status: "booked" },
  { id: 4, name: "Sara Malik", email: "sara@email.com", phone: "+92 300 7778899", from: "Islamabad", to: "London", departDate: "2026-03-10", passengers: 1, cabinClass: "Premium Economy", status: "pending" },
  { id: 5, name: "Bilal Ahmed", email: "bilal@email.com", phone: "+92 311 2223344", from: "Lahore", to: "Jeddah", departDate: "2026-02-25", passengers: 3, cabinClass: "Economy", status: "quoted" },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  pending: { label: "Pending", color: "bg-amber-100 text-amber-700" },
  quoted: { label: "Quoted", color: "bg-blue-100 text-blue-700" },
  booked: { label: "Booked", color: "bg-emerald-100 text-emerald-700" },
};

export function AdminFlightRequestsContent() {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("admin_session");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const filtered = flightRequests.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.to.toLowerCase().includes(search.toLowerCase()) ||
      r.from.toLowerCase().includes(search.toLowerCase())
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
            <h2 className="font-display text-2xl font-bold text-text">Flight Requests</h2>
            <p className="text-sm text-gray-500">Manage flight booking inquiries</p>
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
            { label: "Total Requests", value: flightRequests.length, icon: Plane, color: "bg-blue-500" },
            { label: "Pending", value: flightRequests.filter((f) => f.status === "pending").length, icon: Clock, color: "bg-amber-500" },
            { label: "Booked", value: flightRequests.filter((f) => f.status === "booked").length, icon: CheckCircle, color: "bg-emerald-500" },
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
            return (
              <div key={req.id} className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                    <Plane className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-text">{req.name}</p>
                    <p className="text-sm text-gray-500">{req.email} • {req.phone}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-primary/5 px-3 py-1 text-xs font-medium text-primary">{req.from}</span>
                      <span className="text-gray-400">→</span>
                      <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">{req.to}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {req.departDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {req.passengers} pax
                    </span>
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs">{req.cabinClass}</span>
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
