import { Metadata } from "next";
import { AdminSEOContent } from "./AdminSEOContent";

export const metadata: Metadata = {
  title: "SEO Manager",
  robots: { index: false, follow: false },
};

export default function AdminSEOPage() {
  return <AdminSEOContent />;
}
