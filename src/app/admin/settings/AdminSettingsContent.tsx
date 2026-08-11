"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "../AdminLayout";
import { Settings, Save, Building2, Mail, Phone, MapPin, Users, Shield, Bell, Database } from "lucide-react";

interface User {
  email: string;
  role: string;
  name: string;
}

export function AdminSettingsContent() {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

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

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "company", label: "Company Info", icon: Building2 },
    { id: "users", label: "Users & Roles", icon: Users },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "backup", label: "Backup", icon: Database },
  ];

  return (
    <AdminLayout user={user} onLogout={() => { localStorage.removeItem("admin_session"); window.location.href = "/admin"; }}>
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-text">Settings</h2>
          <p className="text-sm text-gray-500">Manage system configuration and preferences</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Tabs Sidebar */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm transition-all ${
                      activeTab === tab.id
                        ? "bg-primary text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              {activeTab === "general" && (
                <div className="space-y-6">
                  <h3 className="font-display text-lg font-bold text-text">General Settings</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-500 uppercase">Site Name</label>
                      <input type="text" defaultValue="Easy Travel & Tours" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-accent" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-500 uppercase">Site Tagline</label>
                      <input type="text" defaultValue="Your Journey, Our Passion" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-accent" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-500 uppercase">Default Currency</label>
                      <select className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-accent">
                        <option>PKR - Pakistani Rupee</option>
                        <option>USD - US Dollar</option>
                        <option>AED - UAE Dirham</option>
                        <option>SAR - Saudi Riyal</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-500 uppercase">Timezone</label>
                      <select className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-accent">
                        <option>Asia/Karachi (UTC+5)</option>
                        <option>Asia/Dubai (UTC+4)</option>
                        <option>Asia/Riyadh (UTC+3)</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
                    <div>
                      <p className="font-medium text-text">Maintenance Mode</p>
                      <p className="text-sm text-gray-500">Temporarily disable the website for visitors</p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input type="checkbox" className="peer sr-only" />
                      <div className="peer h-6 w-11 rounded-full bg-gray-300 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-accent peer-checked:after:translate-x-5" />
                    </label>
                  </div>
                </div>
              )}

              {activeTab === "company" && (
                <div className="space-y-6">
                  <h3 className="font-display text-lg font-bold text-text">Company Information</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-500 uppercase">Company Name</label>
                      <input type="text" defaultValue="Easy Travel & Tours" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-accent" />
                    </div>
                    <div>
                      <label className="mb-1.5 flex items-center gap-1 text-xs font-medium text-gray-500 uppercase">
                        <Mail className="h-3 w-3" /> Email
                      </label>
                      <input type="email" defaultValue="info@easytravel.com.pk" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-accent" />
                    </div>
                    <div>
                      <label className="mb-1.5 flex items-center gap-1 text-xs font-medium text-gray-500 uppercase">
                        <Phone className="h-3 w-3" /> Phone
                      </label>
                      <input type="text" defaultValue="+92 51 2719103" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-accent" />
                    </div>
                    <div>
                      <label className="mb-1.5 flex items-center gap-1 text-xs font-medium text-gray-500 uppercase">
                        <Phone className="h-3 w-3" /> Mobile / WhatsApp
                      </label>
                      <input type="text" defaultValue="+92 332 0007024" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-accent" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mb-1.5 flex items-center gap-1 text-xs font-medium text-gray-500 uppercase">
                        <MapPin className="h-3 w-3" /> Address
                      </label>
                      <input type="text" defaultValue="Office #22, 1st Floor, Rose Plaza, I-8 Markaz, Islamabad" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-accent" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mb-1.5 block text-xs font-medium text-gray-500 uppercase">Company Description</label>
                      <textarea rows={3} defaultValue="IATA certified premium travel agency in Islamabad offering international flights, hotel bookings, visa services, Umrah & Hajj packages." className="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-accent" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "users" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-text">Users & Roles</h3>
                    <button className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-primary transition-all hover:bg-accent-light">
                      Add User
                    </button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: "Super Admin", email: "admin@easytravel.com.pk", role: "admin", status: "active" },
                      { name: "Travel Manager", email: "manager@easytravel.com.pk", role: "manager", status: "active" },
                      { name: "Content Editor", email: "editor@easytravel.com.pk", role: "editor", status: "active" },
                    ].map((u) => (
                      <div key={u.email} className="flex items-center gap-4 rounded-xl border border-gray-100 p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white">
                          {u.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-text">{u.name}</p>
                          <p className="text-xs text-gray-500">{u.email}</p>
                        </div>
                        <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold capitalize text-accent">
                          {u.role}
                        </span>
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                          {u.status}
                        </span>
                        <button className="text-sm font-medium text-gray-400 transition-colors hover:text-accent">
                          Edit
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <h3 className="font-display text-lg font-bold text-text">Notification Preferences</h3>
                  <div className="space-y-4">
                    {[
                      { label: "New Contact Form", desc: "Get notified when someone submits a contact form", enabled: true },
                      { label: "New Visa Request", desc: "Get notified for new visa applications", enabled: true },
                      { label: "New Umrah Booking", desc: "Get notified for Umrah package bookings", enabled: true },
                      { label: "New Flight Request", desc: "Get notified for flight inquiries", enabled: false },
                      { label: "New Hotel Request", desc: "Get notified for hotel inquiries", enabled: false },
                      { label: "New Review", desc: "Get notified when a customer leaves a review", enabled: true },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
                        <div>
                          <p className="font-medium text-text">{item.label}</p>
                          <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input type="checkbox" defaultChecked={item.enabled} className="peer sr-only" />
                          <div className="peer h-6 w-11 rounded-full bg-gray-300 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-accent peer-checked:after:translate-x-5" />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="space-y-6">
                  <h3 className="font-display text-lg font-bold text-text">Security Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-500 uppercase">Current Password</label>
                      <input type="password" placeholder="••••••••" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-accent" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-500 uppercase">New Password</label>
                      <input type="password" placeholder="••••••••" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-accent" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-500 uppercase">Confirm New Password</label>
                      <input type="password" placeholder="••••••••" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-accent" />
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
                      <div>
                        <p className="font-medium text-text">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input type="checkbox" className="peer sr-only" />
                        <div className="peer h-6 w-11 rounded-full bg-gray-300 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-accent peer-checked:after:translate-x-5" />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "backup" && (
                <div className="space-y-6">
                  <h3 className="font-display text-lg font-bold text-text">Backup & Data</h3>
                  <div className="space-y-4">
                    <div className="rounded-xl bg-gray-50 p-4">
                      <p className="font-medium text-text">Last Backup</p>
                      <p className="text-sm text-gray-500">January 20, 2026 at 02:00 AM</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-light">
                        Create Backup Now
                      </button>
                      <button className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-text transition-all hover:bg-gray-50">
                        Download Backup
                      </button>
                      <button className="rounded-xl border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 transition-all hover:bg-red-50">
                        Restore from Backup
                      </button>
                    </div>
                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                      <p className="text-sm text-amber-800">
                        <strong>Warning:</strong> Restoring from a backup will overwrite all current data. This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 border-t border-gray-100 pt-6">
                <button className="flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-primary transition-all hover:bg-accent-light">
                  <Save className="h-4 w-4" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
