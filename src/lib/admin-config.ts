export interface AdminCredentials {
  email: string;
  password: string;
  role: "admin" | "manager" | "editor";
  name: string;
}

export const ADMIN_CREDENTIALS: AdminCredentials[] = [
  {
    email: "admin@easytravel.com.pk",
    password: "admin123",
    role: "admin",
    name: "Super Admin",
  },
  {
    email: "manager@easytravel.com.pk",
    password: "manager123",
    role: "manager",
    name: "Travel Manager",
  },
  {
    email: "editor@easytravel.com.pk",
    password: "editor123",
    role: "editor",
    name: "Content Editor",
  },
];

export interface MenuItem {
  label: string;
  href: string;
  icon: string;
  roles: ("admin" | "manager" | "editor")[];
  badge?: string;
}

export const ADMIN_MENU: MenuItem[] = [
  { label: "Dashboard", href: "/admin", icon: "LayoutDashboard", roles: ["admin", "manager", "editor"] },
  { label: "Packages", href: "/admin/packages", icon: "Package", roles: ["admin", "manager", "editor"], badge: "24" },
  { label: "Destinations", href: "/admin/destinations", icon: "MapPin", roles: ["admin", "manager", "editor"], badge: "12" },
  { label: "Blog", href: "/admin/blog", icon: "FileText", roles: ["admin", "manager", "editor"], badge: "8" },
  { label: "Leads", href: "/admin/leads", icon: "Users", roles: ["admin", "manager"], badge: "15" },
  { label: "Customers", href: "/admin/customers", icon: "UserCheck", roles: ["admin", "manager"], badge: "1.2k" },
  { label: "Visa Requests", href: "/admin/visa-requests", icon: "FileCheck", roles: ["admin", "manager"], badge: "28" },
  { label: "Flight Requests", href: "/admin/flight-requests", icon: "Plane", roles: ["admin", "manager"], badge: "42" },
  { label: "Hotel Requests", href: "/admin/hotel-requests", icon: "Building2", roles: ["admin", "manager"], badge: "19" },
  { label: "Umrah Requests", href: "/admin/umrah-requests", icon: "Moon", roles: ["admin", "manager"], badge: "34" },
  { label: "Contact Forms", href: "/admin/contacts", icon: "Mail", roles: ["admin", "manager", "editor"], badge: "7" },
  { label: "Testimonials", href: "/admin/testimonials", icon: "Star", roles: ["admin", "manager", "editor"], badge: "56" },
  { label: "Gallery", href: "/admin/gallery", icon: "Image", roles: ["admin", "manager", "editor"] },
  { label: "SEO Manager", href: "/admin/seo", icon: "Search", roles: ["admin"] },
  { label: "Homepage Builder", href: "/admin/homepage", icon: "Layout", roles: ["admin"] },
  { label: "Media Library", href: "/admin/media", icon: "FolderOpen", roles: ["admin", "manager", "editor"] },
  { label: "Analytics", href: "/admin/analytics", icon: "BarChart3", roles: ["admin", "manager"] },
  { label: "Settings", href: "/admin/settings", icon: "Settings", roles: ["admin"] },
];
