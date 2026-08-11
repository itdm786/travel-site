import { Metadata } from "next";
import { AdminFlightRequestsContent } from "./AdminFlightRequestsContent";

export const metadata: Metadata = {
  title: "Flight Requests",
  robots: { index: false, follow: false },
};

export default function AdminFlightRequestsPage() {
  return <AdminFlightRequestsContent />;
}
