"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "../AdminLayout";
import { Search, Mail, Phone, Calendar, CheckCircle, MessageSquare, Trash2 } from "lucide-react";

interface User {
  email: string;
  role: string;
  name: string;
}

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  date: string;
  read: boolean;
}

const contacts: Contact[] = [
  { id: 1, name: "Ahmed Hassan", email: "ahmed@email.com", phone: "+92 300 1234567", service: "Umrah Package", message: "I need information about your VIP Umrah package for 2 people in February.", date: "2026-01-20", read: false },
  { id: 2, name: "Fatima Khan", email: "fatima@email.com", phone: "+92 333 9876543", service: "International Tour", message: "Looking for a family tour to Turkey for 4 people during summer holidays.", date: "2026-01-19", read: false },
  { id: 3, name: "Usman Ali", email: "usman@email.com", phone: "+92 321 5551234", service: "Visa Services", message: "Need tourist visa for Thailand. Please send requirements and processing time.", date: "2026-01-18", read: true },
  { id: 4, name: "Sara Malik", email: "sara@email.com", phone: "+92 300 7778899", service: "Flight Booking", message: "Looking for cheapest flights from Islamabad to London in March.", date: "2026-01-17", read: true },
  { id: 5, name: "Bilal Ahmed", email: "bilal@email.com", phone: "+92 311 2223344", service: "Corporate Travel", message: "Our company needs corporate travel management for 50+ employees annually.", date: "2026-01-16", read: false },
];

export function AdminContactsContent() {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState(contacts);
  const [selected, setSelected] = useState<Contact | null>(null);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("admin_session");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const markRead = (id: number) => {
    setData((prev) => prev.map((c) => (c.id === id ? { ...c, read: true } : c)));
    const contact = data.find((c) => c.id === id);
    if (contact) setSelected({ ...contact, read: true });
  };

  const filtered = data.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.service.toLowerCase().includes(search.toLowerCase())
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
            <h2 className="font-display text-2xl font-bold text-text">Contact Forms</h2>
            <p className="text-sm text-gray-500">Messages from website visitors</p>
          </div>
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search messages..."
              className="rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-accent"
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Messages List */}
          <div className="space-y-3">
            {filtered.map((contact) => (
              <div
                key={contact.id}
                onClick={() => markRead(contact.id)}
                className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                  contact.read
                    ? "border-gray-100 bg-white"
                    : "border-accent/30 bg-accent/5 shadow-sm"
                } ${selected?.id === contact.id ? "ring-2 ring-accent" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      contact.read ? "bg-gray-100" : "bg-accent"
                    }`}>
                      <Mail className={`h-5 w-5 ${contact.read ? "text-gray-400" : "text-primary"}`} />
                    </div>
                    <div>
                      <p className="font-display font-bold text-text">{contact.name}</p>
                      <p className="text-xs text-gray-500">{contact.email}</p>
                    </div>
                  </div>
                  {!contact.read && (
                    <span className="rounded-full bg-blue-500 px-2 py-0.5 text-xs font-medium text-white">
                      New
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{contact.message}</p>
                <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">
                  <span className="rounded-full bg-gray-100 px-2 py-0.5">{contact.service}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {contact.date}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Message Detail */}
          <div className="lg:sticky lg:top-6 lg:h-fit">
            {selected ? (
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold text-text">{selected.name}</h3>
                    <p className="text-sm text-gray-500">{selected.email}</p>
                    <p className="text-sm text-gray-500">{selected.phone}</p>
                  </div>
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                    {selected.service}
                  </span>
                </div>

                <div className="mt-4 border-t border-gray-100 pt-4">
                  <p className="text-sm leading-relaxed text-gray-600">{selected.message}</p>
                </div>

                <div className="mt-6 flex gap-2">
                  <a
                    href={`mailto:${selected.email}`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-light"
                  >
                    <Mail className="h-4 w-4" />
                    Reply via Email
                  </a>
                  <a
                    href={`tel:${selected.phone}`}
                    className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-text transition-all hover:bg-gray-50"
                  >
                    <Phone className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50">
                <MessageSquare className="h-10 w-10 text-gray-300" />
                <p className="mt-3 text-sm text-gray-400">Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
