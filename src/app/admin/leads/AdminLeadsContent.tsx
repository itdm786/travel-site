"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "../AdminLayout";
import { Search, Mail, Phone, User, Calendar, CheckCircle, Clock } from "lucide-react";

interface User {
  email: string;
  role: string;
  name: string;
}

const leads = [
  { id: 1, name: "Ahmed Raza", email: "ahmed@email.com", phone: "+92 300 1234567", service: "Umrah Package", date: "2026-01-20", status: "new", budget: "PKR 400,000" },
  { id: 2, name: "Fatima Sheikh", email: "fatima@email.com", phone: "+92 333 9876543", service: "Dubai Tour", date: "2026-01-19", status: "contacted", budget: "PKR 185,000" },
  { id: 3, name: "Usman Ali", email: "usman@email.com", phone: "+92 321 5551234", service: "Visa - Turkey", date: "2026-01-18", status: "qualified", budget: "PKR 25,000" },
  { id: 4, name: "Sara Khan", email: "sara@email.com", phone: "+92 300 7778899", service: "Hajj 2026", date: "2026-01-17", status: "converted", budget: "PKR 1,875,000" },
  { id: 5, name: "Bilal Ahmed", email: "bilal@email.com", phone: "+92 311 2223344", service: "Thailand Tour", date: "2026-01-16", status: "new", budget: "PKR 159,000" },
  { id: 6, name: "Ayesha Malik", email: "ayesha@email.com", phone: "+92 345 6667788", service: "Corporate Travel", date: "2026-01-15", status: "contacted", budget: "PKR 850,000" },
];

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-amber-100 text-amber-700",
  qualified: "bg-purple-100 text-purple-700",
  converted: "bg-emerald-100 text-emerald-700",
  lost: "bg-red-100 text-red-700",
};

export function AdminLeadsContent() {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("admin_session");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const filtered = leads.filter(
    (l) =>
      (filter === "all" || l.status === filter) &&
      (l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.email.toLowerCase().includes(search.toLowerCase()))
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
            <h2 className="font-display text-2xl font-bold text-text">Leads</h2>
            <p className="text-sm text-gray-500">Track and manage potential customers</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search leads..."
                className="rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-accent"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-accent"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="converted">Converted</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          {[
            { label: "Total Leads", value: leads.length, icon: User, color: "bg-blue-500" },
            { label: "New", value: leads.filter((l) => l.status === "new").length, icon: Clock, color: "bg-amber-500" },
            { label: "Contacted", value: leads.filter((l) => l.status === "contacted").length, icon: Phone, color: "bg-purple-500" },
            { label: "Converted", value: leads.filter((l) => l.status === "converted").length, icon: CheckCircle, color: "bg-emerald-500" },
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

        {/* Leads Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Lead</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Service</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Budget</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((lead) => (
                  <tr key={lead.id} className="transition-colors hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-text">{lead.name}</p>
                      <p className="text-xs text-gray-500">{lead.email}</p>
                      <p className="text-xs text-gray-500">{lead.phone}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{lead.service}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-primary">{lead.budget}</td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        {lead.date}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusColors[lead.status]}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-accent/10 hover:text-accent">
                          <Mail className="h-4 w-4" />
                        </button>
                        <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600">
                          <Phone className="h-4 w-4" />
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
