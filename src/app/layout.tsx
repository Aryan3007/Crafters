import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
// import CursorFollower from "@/components/cursor-follower";
import AuthHandler from "@/components/AuthHandler";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Crafters | Elevate Your Digital Vision",
  description: "Creative services for your business",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthHandler />
        {children}
        {/* <CursorFollower /> */}

      </body>
    </html>
  );
}
