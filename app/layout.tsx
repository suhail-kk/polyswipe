import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/config/QueryProvider";
import { Toaster } from 'sonner'; // Import Toaster

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PolySwipe - Learn Hindi, Malayalam, Kannada & English",
  description:
    "Master multiple languages with PolySwipe — your all-in-one interactive learning platform for Hindi, Malayalam, Kannada, and English. Practice pronunciation, vocabulary, and real-life conversations with engaging lessons and AI-powered feedback.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toaster richColors position="top-center" /> {/* Add Toaster component */}
      </body>
    </html>
  );
}
