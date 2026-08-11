"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "../AdminLayout";
import { Search, Mail, Phone, Calendar, CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";

interface User {
  email: string;
  role: string;
  name: string;
}

interface Request {
  id: number;
  name: string;
  email: string;
  phone: string;
  country: string;
  visaType: string;
  date: string;
  status: "pending" | "processing" | "approved" | "rejected";
  amount: string;
}

const requests: Request[] = [
  { id: 1, name: "Ahmed Hassan", email: "ahmed@email.com", phone: "+92 300 1234567", country: "UAE", visaType: "Tourist", date: "2026-01-20", status: "pending", amount: "PKR 35,000" },
  { id: 2, name: "Fatima Khan", email: "fatima@email.com", phone: "+92 333 9876543", country: "Turkey", visaType: "Tourist", date: "2026-01-19", status: "processing", amount: "PKR 25,000" },
  { id: 3, name: "Usman Ali", email: "usman@email.com", phone: "+92 321 5551234", country: "Saudi Arabia", visaType: "Umrah", date: "2026-01-18", status: "approved", amount: "PKR 45,000" },
  { id: 4, name: "Sara Malik", email: "sara@email.com", phone: "+92 300 7778899", country: "Thailand", visaType: "Tourist", date: "2026-01-17", status: "pending", amount: "PKR 28,000" },
  { id: 5, name: "Bilal Ahmed", email: "bilal@email.com", phone: "+92 311 2223344", country: "Malaysia", visaType: "Business", date: "2026-01-16", status: "rejected", amount: "PKR 22,000" },
  { id: 6, name: "Ayesha Tariq", email: "ayesha@email.com", phone: "+92 345 6667788", country: "Azerbaijan", visaType: "Tourist", date: "2026-01-15", status: "processing", amount: "PKR 20,000" },
];

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: "Pending", color: "bg-amber-100 text-amber-700", icon: Clock },
  processing: { label: "Processing", color: "bg-blue-100 text-blue-700", icon: AlertCircle },
  approved: { label: "Approved", color: "bg-emerald-100 text-emerald-700", icon: CheckCircle },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-700", icon: XCircle },
};

export function AdminRequestsContent({
  type,
  title,
  icon,
}: {
  type: string;
  title: string;
  icon: string;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [data, setData] = useState(requests);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("admin_session");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const filtered = data.filter(
    (r) =>
      (statusFilter === "all" || r.status === statusFilter) &&
      (r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.email.toLowerCase().includes(search.toLowerCase()) ||
        r.country.toLowerCase().includes(search.toLowerCase()))
  );

  const updateStatus = (id: number, status: "pending" | "processing" | "approved" | "rejected") => {
    setData((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
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
            <h2 className="font-display text-2xl font-bold text-text">{title}</h2>
            <p className="text-sm text-gray-500">Review and manage visa applications</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-accent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-accent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          {[
            { label: "Total", value: data.length, color: "bg-gray-500" },
            { label: "Pending", value: data.filter((d) => d.status === "pending").length, color: "bg-amber-500" },
            { label: "Processing", value: data.filter((d) => d.status === "processing").length, color: "bg-blue-500" },
            { label: "Approved", value: data.filter((d) => d.status === "approved").length, color: "bg-emerald-500" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className={`h-11 w-11 rounded-xl ${s.color}`} />
              <div>
                <p className="text-xs text-gray-500">{s.label}</p>
                <p className="font-display text-xl font-bold text-text">{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Applicant</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Country</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((req) => {
                  const status = statusConfig[req.status];
                  const StatusIcon = status.icon;
                  return (
                    <tr key={req.id} className="transition-colors hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-text">{req.name}</p>
                        <p className="text-xs text-gray-500">{req.email}</p>
                        <p className="text-xs text-gray-500">{req.phone}</p>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-text">{req.country}</td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                          {req.visaType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-primary">{req.amount}</td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          {req.date}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${status.color}`}>
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          <button
                            onClick={() => updateStatus(req.id, "approved")}
                            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-emerald-50 hover:text-emerald-600"
                            title="Approve"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => updateStatus(req.id, "rejected")}
                            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                            title="Reject"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                          <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-accent/10 hover:text-accent" title="Email">
                            <Mail className="h-4 w-4" />
                          </button>
                          <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600" title="Call">
                            <Phone className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
