import { Metadata } from "next";
import { AdminContent } from "./AdminContent";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Easy Travel & Tours admin dashboard — manage packages, destinations, blog, leads, and more.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminContent />;
}
