import { Metadata } from "next";
import { AdminContactsContent } from "./AdminContactsContent";

export const metadata: Metadata = {
  title: "Contact Forms",
  robots: { index: false, follow: false },
};

export default function AdminContactsPage() {
  return <AdminContactsContent />;
}
