"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  Users,
  Package,
  FileCheck,
  TrendingUp,
  TrendingDown,
  Plane,
  Building2,
  Moon,
  Mail,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface User {
  email: string;
  role: string;
  name: string;
}

export function AdminDashboard({ user }: { user: User }) {
  const stats = [
    {
      title: "Total Revenue",
      value: "PKR 24.5M",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "bg-emerald-500",
    },
    {
      title: "Active Customers",
      value: "1,247",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Packages Sold",
      value: "486",
      change: "+23.1%",
      trend: "up",
      icon: Package,
      color: "bg-accent",
    },
    {
      title: "Visa Applications",
      value: "892",
      change: "-2.4%",
      trend: "down",
      icon: FileCheck,
      color: "bg-purple-500",
    },
  ];

  const requests = [
    { type: "Flight Requests", count: 42, icon: Plane, color: "text-blue-500" },
    { type: "Hotel Requests", count: 19, icon: Building2, color: "text-amber-500" },
    { type: "Umrah Requests", count: 34, icon: Moon, color: "text-emerald-500" },
    { type: "Contact Forms", count: 7, icon: Mail, color: "text-purple-500" },
  ];

  const recentActivity = [
    { action: "New Umrah booking received", user: "Ahmed Hassan", time: "2 min ago", amount: "PKR 395,000" },
    { action: "Visa application submitted", user: "Fatima Khan", time: "15 min ago", amount: "PKR 35,000" },
    { action: "Flight ticket booked", user: "Mohammad Usman", time: "1 hour ago", amount: "PKR 185,000" },
    { action: "Hotel reservation confirmed", user: "Sara Ali", time: "2 hours ago", amount: "PKR 120,000" },
    { action: "New review submitted", user: "Bilal Mahmood", time: "3 hours ago", amount: "—" },
  ];

  const monthlyRevenue = [
    { month: "Jul", value: 2.1 },
    { month: "Aug", value: 2.8 },
    { month: "Sep", value: 2.4 },
    { month: "Oct", value: 3.2 },
    { month: "Nov", value: 3.9 },
    { month: "Dec", value: 4.8 },
    { month: "Jan", value: 5.3 },
  ];

  const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.value));

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-primary p-8"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-white">
              Welcome back, {user.name}! 👋
            </h2>
            <p className="mt-1 text-white/60">
              Here&apos;s what&apos;s happening with your travel business today.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-accent-light">
              Generate Report
            </button>
            <button className="rounded-xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10">
              View Analytics
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <span
                  className={`flex items-center gap-1 text-xs font-semibold ${
                    stat.trend === "up" ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  <TrendIcon className="h-3 w-3" />
                  {stat.change}
                </span>
              </div>
              <p className="mt-4 text-sm text-gray-500">{stat.title}</p>
              <p className="font-display text-2xl font-bold text-text">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
        >
          <h3 className="font-display text-lg font-bold text-text">Revenue Overview</h3>
          <p className="text-sm text-gray-500">Monthly revenue in millions (PKR)</p>
          <div className="mt-6 flex h-48 items-end justify-between gap-2">
            {monthlyRevenue.map((m, i) => (
              <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(m.value / maxRevenue) * 100}%` }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                    className="w-full rounded-t-lg bg-gradient-to-t from-primary to-accent"
                  />
                </div>
                <span className="text-xs text-gray-500">{m.month}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Requests Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
        >
          <h3 className="font-display text-lg font-bold text-text">Pending Requests</h3>
          <p className="text-sm text-gray-500">Awaiting your response</p>
          <div className="mt-6 space-y-4">
            {requests.map((req, i) => {
              const Icon = req.icon;
              return (
                <div key={req.type} className="flex items-center gap-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50`}>
                    <Icon className={`h-5 w-5 ${req.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text">{req.type}</p>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-100">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(req.count / 50) * 100}%` }}
                        transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                        className="h-full rounded-full bg-accent"
                      />
                    </div>
                  </div>
                  <span className="font-bold text-text">{req.count}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
      >
        <h3 className="font-display text-lg font-bold text-text">Recent Activity</h3>
        <p className="text-sm text-gray-500">Latest transactions and submissions</p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase">Activity</th>
                <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase">Customer</th>
                <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase">Amount</th>
                <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentActivity.map((activity, i) => (
                <tr key={i} className="transition-colors hover:bg-gray-50">
                  <td className="py-4 text-sm text-text">{activity.action}</td>
                  <td className="py-4 text-sm font-medium text-text">{activity.user}</td>
                  <td className="py-4 text-sm font-semibold text-accent">{activity.amount}</td>
                  <td className="py-4 text-sm text-gray-500">{activity.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
