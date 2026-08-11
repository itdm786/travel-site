"use client";

import { useState, useEffect } from "react";
import { AdminLogin } from "./AdminLogin";
import { AdminLayout } from "./AdminLayout";
import { AdminDashboard } from "./AdminDashboard";
import { ADMIN_CREDENTIALS } from "@/lib/admin-config";

export function AdminContent() {
  const [user, setUser] = useState<{ email: string; role: string; name: string } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage for existing session
    const saved = localStorage.getItem("admin_session");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        localStorage.removeItem("admin_session");
      }
    }
  }, []);

  const handleLogin = (email: string, role: "admin" | "manager" | "editor") => {
    const credential = ADMIN_CREDENTIALS.find((c) => c.email === email);
    const userData = { email, role, name: credential?.name || "Admin" };
    setUser(userData);
    localStorage.setItem("admin_session", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("admin_session");
  };

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-primary">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <AdminLogin onLogin={handleLogin} credentials={ADMIN_CREDENTIALS} />;
  }

  return (
    <AdminLayout user={user} onLogout={handleLogout}>
      <AdminDashboard user={user} />
    </AdminLayout>
  );
}
