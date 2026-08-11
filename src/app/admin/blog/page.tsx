import { Metadata } from "next";
import { AdminBlogContent } from "./AdminBlogContent";

export const metadata: Metadata = {
  title: "Blog Management",
  robots: { index: false, follow: false },
};

export default function AdminBlogPage() {
  return <AdminBlogContent />;
}
