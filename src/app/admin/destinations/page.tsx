import { Metadata } from "next";
import { AdminDestinationsContent } from "./AdminDestinationsContent";

export const metadata: Metadata = {
  title: "Destinations Management",
  robots: { index: false, follow: false },
};

export default function AdminDestinationsPage() {
  return <AdminDestinationsContent />;
}
