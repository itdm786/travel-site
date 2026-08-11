import { Metadata } from "next";
import { AdminHomepageContent } from "./AdminHomepageContent";

export const metadata: Metadata = {
  title: "Homepage Builder",
  robots: { index: false, follow: false },
};

export default function AdminHomepagePage() {
  return <AdminHomepageContent />;
}
