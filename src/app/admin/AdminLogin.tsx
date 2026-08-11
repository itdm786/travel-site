"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Compass, Mail, Lock, Eye, EyeOff, Shield } from "lucide-react";
import { AdminCredentials } from "@/lib/admin-config";

interface AdminLoginProps {
  onLogin: (email: string, role: "admin" | "manager" | "editor") => void;
  credentials: AdminCredentials[];
}

export function AdminLogin({ onLogin, credentials }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    const credential = credentials.find(
      (c) => c.email === email && c.password === password
    );

    if (credential) {
      onLogin(credential.email, credential.role);
    } else {
      setError("Invalid email or password. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary p-6">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl shadow-2xl">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent">
              <Compass className="h-9 w-9 text-primary" />
            </div>
            <h1 className="font-display text-2xl font-bold text-white">
              Admin <span className="text-accent">Portal</span>
            </h1>
            <p className="mt-1 text-sm text-white/50">
              Easy Travel & Tours Management System
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/50 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-accent" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@easytravel.com.pk"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-accent focus:bg-white/10"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/50 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-accent" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-11 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-accent focus:bg-white/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-white/40 transition-colors hover:text-accent"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-accent py-3.5 font-semibold text-primary transition-all hover:bg-accent-light hover:shadow-lg disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In to Dashboard"}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold text-accent">
              <Shield className="h-3.5 w-3.5" />
              Demo Credentials
            </p>
            <div className="space-y-1.5 text-xs text-white/50">
              <p><span className="text-white/70">Admin:</span> admin@easytravel.com.pk / admin123</p>
              <p><span className="text-white/70">Manager:</span> manager@easytravel.com.pk / manager123</p>
              <p><span className="text-white/70">Editor:</span> editor@easytravel.com.pk / editor123</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
