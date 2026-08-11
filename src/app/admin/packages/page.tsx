import { Metadata } from "next";
import { AdminPackagesContent } from "./AdminPackagesContent";

export const metadata: Metadata = {
  title: "Packages Management",
  robots: { index: false, follow: false },
};

export default function AdminPackagesPage() {
  return <AdminPackagesContent />;
}
