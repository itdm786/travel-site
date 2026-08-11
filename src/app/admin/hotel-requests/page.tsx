import { Metadata } from "next";
import { AdminHotelRequestsContent } from "./AdminHotelRequestsContent";

export const metadata: Metadata = {
  title: "Hotel Requests",
  robots: { index: false, follow: false },
};

export default function AdminHotelRequestsPage() {
  return <AdminHotelRequestsContent />;
}
