import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "The Pipe Dream",
  description: "High-energy cover band. All bangers. Book us or buy Weldon a drink.",
  openGraph: {
    title: "The Pipe Dream",
    description: "High-energy cover band. All bangers.",
    url: "https://pipedreamband.com",
    siteName: "The Pipe Dream",
    images: [
      {
        url: "/logo.png", // or use a better image below
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
