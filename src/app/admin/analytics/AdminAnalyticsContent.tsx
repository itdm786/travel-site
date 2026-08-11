"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "../AdminLayout";
import { BarChart3, Users, TrendingUp, Globe, Eye, Download, Calendar } from "lucide-react";

interface User {
  email: string;
  role: string;
  name: string;
}

export function AdminAnalyticsContent() {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [period, setPeriod] = useState("30days");

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

  const stats = [
    { label: "Total Visitors", value: "45,231", change: "+12.5%", icon: Users, color: "bg-blue-500" },
    { label: "Page Views", value: "128,492", change: "+8.2%", icon: Eye, color: "bg-emerald-500" },
    { label: "Bounce Rate", value: "34.2%", change: "-2.1%", icon: TrendingUp, color: "bg-amber-500" },
    { label: "Avg. Session", value: "3m 42s", change: "+15.3%", icon: Globe, color: "bg-purple-500" },
  ];

  const topPages = [
    { path: "/", views: 15420, change: "+12%" },
    { path: "/umrah", views: 8932, change: "+24%" },
    { path: "/visa-services", views: 6541, change: "+8%" },
    { path: "/holiday-packages", views: 5210, change: "+18%" },
    { path: "/flights", views: 4875, change: "-3%" },
  ];

  const trafficSources = [
    { source: "Organic Search", percentage: 42, color: "bg-emerald-500" },
    { source: "Direct", percentage: 28, color: "bg-blue-500" },
    { source: "Social Media", percentage: 18, color: "bg-purple-500" },
    { source: "Referral", percentage: 12, color: "bg-amber-500" },
  ];

  const monthlyData = [
    { month: "Aug", visitors: 3200, conversions: 128 },
    { month: "Sep", visitors: 3800, conversions: 152 },
    { month: "Oct", visitors: 4100, conversions: 186 },
    { month: "Nov", visitors: 4800, conversions: 224 },
    { month: "Dec", visitors: 5600, conversions: 268 },
    { month: "Jan", visitors: 6200, conversions: 312 },
  ];

  const maxVisitors = Math.max(...monthlyData.map((m) => m.visitors));

  return (
    <AdminLayout user={user} onLogout={() => { localStorage.removeItem("admin_session"); window.location.href = "/admin"; }}>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-text">Analytics Dashboard</h2>
            <p className="text-sm text-gray-500">Track website performance and traffic</p>
          </div>
          <div className="flex gap-3">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-accent"
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
              <option value="year">Last year</option>
            </select>
            <button className="flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-accent-light">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const isPositive = stat.change.startsWith("+");
            return (
              <div key={stat.label} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <span className={`text-xs font-semibold ${isPositive ? "text-emerald-600" : "text-red-600"}`}>
                    {stat.change}
                  </span>
                </div>
                <p className="mt-4 text-sm text-gray-500">{stat.label}</p>
                <p className="font-display text-2xl font-bold text-text">{stat.value}</p>
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Traffic Chart */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="font-display text-lg font-bold text-text">Visitors & Conversions</h3>
            <p className="text-sm text-gray-500">Monthly overview</p>
            <div className="mt-6 flex h-56 items-end justify-between gap-4">
              {monthlyData.map((m, i) => (
                <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex w-full items-end justify-center gap-1">
                    <div className="w-1/2">
                      <div
                        className="w-full rounded-t bg-gradient-to-t from-primary to-primary-light"
                        style={{ height: `${(m.visitors / maxVisitors) * 100}%` }}
                      />
                    </div>
                    <div className="w-1/2">
                      <div
                        className="w-full rounded-t bg-gradient-to-t from-accent to-accent-light"
                        style={{ height: `${(m.conversions / maxVisitors) * 100 * 4}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{m.month}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center gap-6">
              <span className="flex items-center gap-2 text-xs text-gray-600">
                <span className="h-3 w-3 rounded bg-primary" /> Visitors
              </span>
              <span className="flex items-center gap-2 text-xs text-gray-600">
                <span className="h-3 w-3 rounded bg-accent" /> Conversions
              </span>
            </div>
          </div>

          {/* Traffic Sources */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="font-display text-lg font-bold text-text">Traffic Sources</h3>
            <p className="text-sm text-gray-500">Where your visitors come from</p>
            <div className="mt-6 space-y-4">
              {trafficSources.map((source) => (
                <div key={source.source}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium text-text">{source.source}</span>
                    <span className="text-sm font-semibold text-gray-600">{source.percentage}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={`h-full rounded-full ${source.color}`}
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Pages */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="font-display text-lg font-bold text-text">Top Pages</h3>
          <p className="text-sm text-gray-500">Most visited pages this period</p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase">Page</th>
                  <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase">Views</th>
                  <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase">Change</th>
                  <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase">Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {topPages.map((page) => {
                  const share = ((page.views / topPages.reduce((a, b) => a + b.views, 0)) * 100).toFixed(1);
                  const isPositive = page.change.startsWith("+");
                  return (
                    <tr key={page.path} className="transition-colors hover:bg-gray-50">
                      <td className="py-4 font-mono text-sm text-text">{page.path}</td>
                      <td className="py-4 text-sm font-semibold text-text">{page.views.toLocaleString()}</td>
                      <td className={`py-4 text-sm font-semibold ${isPositive ? "text-emerald-600" : "text-red-600"}`}>
                        {page.change}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-100">
                            <div className="h-full rounded-full bg-accent" style={{ width: `${share}%` }} />
                          </div>
                          <span className="text-xs text-gray-500">{share}%</span>
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
