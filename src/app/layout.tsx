import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SwyHub - Free Roblox Script Hub | Premium Solutions",
  description: "Secure, reliable, and powerful script execution for Roblox.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body 
        className="min-h-full flex flex-col relative overflow-x-hidden"
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-1 pt-24 pb-16 scroll-smooth">{children}</main>
      </body>
    </html>
  );
}
