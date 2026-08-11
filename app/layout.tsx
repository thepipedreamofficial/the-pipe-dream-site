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

export const metadata: Metadata = {
  metadataBase: new URL("https://pipedreamband.com"),
  title: "The Pipe Dream | Houston Cover Band",
  description:
    "Five-piece Houston cover band playing crowd favorites from the '90s through today. View upcoming shows or book The Pipe Dream.",
  openGraph: {
    title: "The Pipe Dream | Houston Cover Band",
    description:
      "Five-piece Houston cover band playing crowd favorites from the '90s through today.",
    url: "https://pipedreamband.com",
    siteName: "The Pipe Dream",
    images: [
      {
        url: "/gallery/gallery-taproom-wide.webp",
        width: 1600,
        height: 1067,
        alt: "The Pipe Dream performing live in Houston",
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
