import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "RG LOOM | Handmade Potlis", description: "One-of-a-kind handmade potli bags." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
