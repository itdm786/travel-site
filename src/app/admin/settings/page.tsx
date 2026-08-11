import { Metadata } from "next";
import { AdminSettingsContent } from "./AdminSettingsContent";

export const metadata: Metadata = {
  title: "Settings",
  robots: { index: false, follow: false },
};

export default function AdminSettingsPage() {
  return <AdminSettingsContent />;
}
