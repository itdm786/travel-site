import { Metadata } from "next";
import { AdminLeadsContent } from "./AdminLeadsContent";

export const metadata: Metadata = {
  title: "Leads Management",
  robots: { index: false, follow: false },
};

export default function AdminLeadsPage() {
  return <AdminLeadsContent />;
}
