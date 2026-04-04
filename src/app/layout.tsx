import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FloatingHeader } from "@/components/ui/floating-header";
import { Footer } from "@/components/ui/footer-section";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
        className="min-h-full flex flex-col relative overflow-x-hidden bg-black text-white"
        suppressHydrationWarning
      >
        <FloatingHeader />
        <main className="flex-1 pb-16 scroll-smooth">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
