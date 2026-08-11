"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ADMIN_MENU, ADMIN_CREDENTIALS, type MenuItem } from "@/lib/admin-config";
import {
  LayoutDashboard,
  Package,
  MapPin,
  FileText,
  Users,
  UserCheck,
  FileCheck,
  Plane,
  Building2,
  Moon,
  Mail,
  Star,
  Image as ImageIcon,
  Search,
  Layout,
  FolderOpen,
  BarChart3,
  Settings,
  Menu,
  X,
  LogOut,
  Bell,
  ChevronDown,
  Compass,
  Sun,
  Home,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  Package,
  MapPin,
  FileText,
  Users,
  UserCheck,
  FileCheck,
  Plane,
  Building2,
  Moon,
  Mail,
  Star,
  Image: ImageIcon,
  Search,
  Layout,
  FolderOpen,
  BarChart3,
  Settings,
};

interface AdminLayoutProps {
  children: React.ReactNode;
  user: { email: string; role: string; name?: string };
  onLogout: () => void;
}

export function AdminLayout({ children, user, onLogout }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const pathname = usePathname();

  const userRole = user.role as "admin" | "manager" | "editor";
  const menuItems = ADMIN_MENU.filter((item) => item.roles.includes(userRole));

  const isActive = (href: string) =>
    href === "/admin" ? pathname === href : pathname.startsWith(href);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen border-r border-gray-200 bg-white transition-all duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "w-64" : "w-20"
        } ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-gray-100 px-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent">
            <Compass className="h-5 w-5 text-primary" />
          </div>
          {sidebarOpen && (
            <span className="font-display text-sm font-bold text-primary">
              Easy Travel Admin
            </span>
          )}
        </div>

        {/* Menu */}
        <nav className="h-[calc(100vh-4rem)] overflow-y-auto p-3">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = iconMap[item.icon] || LayoutDashboard;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                    active
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                  }`}
                  title={!sidebarOpen ? item.label : undefined}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {sidebarOpen && (
                    <>
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge && (
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                            active ? "bg-accent text-primary" : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setMobileMenuOpen(!mobileMenuOpen);
                } else {
                  setSidebarOpen(!sidebarOpen);
                }
              }}
              className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <h1 className="font-display text-lg font-bold text-primary">
              {menuItems.find((m) => isActive(m.href))?.label || "Dashboard"}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {/* View Site */}
            <Link
              href="/"
              className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 sm:flex"
            >
              <Home className="h-4 w-4" />
              View Site
            </Link>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative rounded-xl p-2 text-gray-600 transition-colors hover:bg-gray-100"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-80 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl"
                  >
                    <h3 className="mb-3 font-semibold text-text">Notifications</h3>
                    <div className="space-y-3">
                      {[
                        { text: "New visa request from Ahmed", time: "5 min ago", type: "visa" },
                        { text: "New contact form submission", time: "15 min ago", type: "contact" },
                        { text: "Package booking confirmed", time: "1 hour ago", type: "booking" },
                      ].map((n, i) => (
                        <div key={i} className="flex items-start gap-3 rounded-xl bg-gray-50 p-3">
                          <div className="h-2 w-2 mt-1.5 rounded-full bg-accent" />
                          <div className="flex-1">
                            <p className="text-sm text-text">{n.text}</p>
                            <p className="text-xs text-gray-400">{n.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-white">
                {user.name?.charAt(0).toUpperCase() || "A"}
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-medium text-text">{user.name}</p>
                <p className="text-[10px] capitalize text-gray-500">{user.role}</p>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="rounded-xl p-2 text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
