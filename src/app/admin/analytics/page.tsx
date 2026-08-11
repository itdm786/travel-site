import { Metadata } from "next";
import { AdminAnalyticsContent } from "./AdminAnalyticsContent";

export const metadata: Metadata = {
  title: "Analytics",
  robots: { index: false, follow: false },
};

export default function AdminAnalyticsPage() {
  return <AdminAnalyticsContent />;
}
