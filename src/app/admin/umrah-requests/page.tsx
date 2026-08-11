import { Metadata } from "next";
import { AdminUmrahRequestsContent } from "./AdminUmrahRequestsContent";

export const metadata: Metadata = {
  title: "Umrah Requests",
  robots: { index: false, follow: false },
};

export default function AdminUmrahRequestsPage() {
  return <AdminUmrahRequestsContent />;
}
