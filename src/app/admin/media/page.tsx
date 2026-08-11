import { Metadata } from "next";
import { AdminMediaContent } from "./AdminMediaContent";

export const metadata: Metadata = {
  title: "Media Library",
  robots: { index: false, follow: false },
};

export default function AdminMediaPage() {
  return <AdminMediaContent />;
}
