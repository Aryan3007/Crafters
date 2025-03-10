import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import CursorFollower from "@/components/cursor-follower"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "The Crafters | Elevate Your Digital Vision",
  description: "Creative services for your business",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
          {children}
          <CursorFollower />
      </body>
    </html>
  )
}

