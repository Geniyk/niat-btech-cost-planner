import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "B.Tech Cost & College Planner",
  description: "Explore your college budget and prepare questions for a counsellor.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}