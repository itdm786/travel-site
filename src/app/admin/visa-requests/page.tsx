import { Metadata } from "next";
import { AdminRequestsContent } from "./AdminRequestsContent";

export const metadata: Metadata = {
  title: "Visa Requests",
  robots: { index: false, follow: false },
};

export default function AdminVisaRequestsPage() {
  return <AdminRequestsContent type="visa" title="Visa Requests" icon="FileCheck" />;
}
