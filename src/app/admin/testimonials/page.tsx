import { Metadata } from "next";
import { AdminTestimonialsContent } from "./AdminTestimonialsContent";

export const metadata: Metadata = {
  title: "Testimonials",
  robots: { index: false, follow: false },
};

export default function AdminTestimonialsPage() {
  return <AdminTestimonialsContent />;
}
