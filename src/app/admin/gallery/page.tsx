import { Metadata } from "next";
import { AdminGalleryContent } from "./AdminGalleryContent";

export const metadata: Metadata = {
  title: "Gallery",
  robots: { index: false, follow: false },
};

export default function AdminGalleryPage() {
  return <AdminGalleryContent />;
}
