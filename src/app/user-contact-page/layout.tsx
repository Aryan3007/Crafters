import type React from "react"
import { GlassNavbar } from "@/components/glass-navbar"

export default function UserContactPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-black">
      <GlassNavbar />
      <main>{children}</main>
    </div>
  )
}

