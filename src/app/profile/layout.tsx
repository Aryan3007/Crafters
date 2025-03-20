/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Bell, LogOut, User, FileText, Shield, Menu, X } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState<"user" | "client" | "admin">("user")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const supabase = createClientComponentClient()

  useEffect(() => {
    async function getUser() {
      setLoading(true)

      // Get the current user session
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()

      if (sessionError || !session) {
        console.error("No active session:", sessionError)
        router.push("/login")
        return
      }

      // Get the user profile data
      const { data: userData, error: userError } = await supabase.auth.getUser()

      if (userError || !userData.user) {
        console.error("Error fetching user:", userError)
        return
      }

      setUser(userData.user)

      // Get the user's profile to check their role
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

      if (profile) {
        setUserRole(profile.role as "user" | "client" | "admin")

        // If user is admin, redirect to dashboard
        if (profile.role === "admin") {
          router.push("/dashboard")
          return
        }
      }

      setLoading(false)
    }

    getUser()
  }, [router, supabase.auth, supabase])

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error("Error signing out:", error)
    } else {
      router.push("/login")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#c4ff00] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your profile...</p>
        </div>
      </div>
    )
  }

  // Parse the user's name from email if name is not available
  const displayName = user.user_metadata?.full_name || (user.email ? user.email.split("@")[0] : "Creative User")

  // Get user's avatar or use a placeholder
  const userAvatar =
    user.user_metadata?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=c4ff00&color=000&size=128`

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-[#0a0a0a] border-b border-gray-800 fixed top-0 left-0 right-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {/* Mobile menu toggle */}
              <button
                className="md:hidden text-gray-400 hover:text-white mr-2"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle sidebar"
              >
                <Menu className="w-6 h-6" />
              </button>

              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#c4ff00] flex items-center justify-center text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5"></path>
                    <path d="M2 12l10 5 10-5"></path>
                  </svg>
                </div>
                <span className="text-xl font-bold text-white">Creative Studio</span>
              </Link>
            </div>

            <div className="flex items-center gap-6">
              <button className="relative text-gray-400 hover:text-white transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#c4ff00] text-black text-xs flex items-center justify-center">
                  3
                </span>
              </button>

              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={userAvatar || "/placeholder.svg"}
                    alt={displayName}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium">{displayName}</p>
                  <p className="text-xs text-gray-400 capitalize">{userRole}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-[73px] min-h-[calc(100vh-73px)]">
        {/* Overlay for mobile when sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar */}
        <div
          className={`w-64 bg-[#0a0a0a] border-r border-gray-800 p-4 flex flex-col fixed left-0 top-[73px] bottom-0 overflow-y-auto z-30 transition-transform duration-300 ease-in-out md:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Close button for mobile */}
          <button
            className="md:hidden absolute top-4 right-4 text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-[#c4ff00]">
              <Image src={userAvatar || "/placeholder.svg"} alt={displayName} fill className="object-cover" />
            </div>
            <h2 className="text-xl font-bold">{displayName}</h2>
            <p className="text-sm text-gray-400">{user.email}</p>
            <p className="text-xs bg-[#c4ff00] text-black px-2 py-0.5 rounded-full mt-2 capitalize">{userRole}</p>

            <div className="mt-4 flex gap-2">
              <button
                onClick={handleSignOut}
                className="bg-[#1e1e1e] flex justify-center items-center gap-2 hover:bg-[#252525] rounded-lg p-2 text-red-500 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <Link
              href="/profile"
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${
                pathname === "/profile"
                  ? "bg-[#c4ff00] text-black font-medium"
                  : "text-gray-400 hover:bg-[#1e1e1e] hover:text-white"
              }`}
            >
              <User className="w-5 h-5" />
              <span>Overview</span>
            </Link>

            <Link
              href="/profile/projects"
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${
                pathname === "/profile/projects"
                  ? "bg-[#c4ff00] text-black font-medium"
                  : "text-gray-400 hover:bg-[#1e1e1e] hover:text-white"
              }`}
            >
              <FileText className="w-5 h-5" />
              <span>Projects</span>
            </Link>

            <Link
              href="/profile/settings"
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${
                pathname === "/profile/settings"
                  ? "bg-[#c4ff00] text-black font-medium"
                  : "text-gray-400 hover:bg-[#1e1e1e] hover:text-white"
              }`}
            >
              <Shield className="w-5 h-5" />
              <span>Settings</span>
            </Link>
          </div>

          {/* Account Info */}
          <div className="mt-6 bg-[#0a0a0a] border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-medium mb-4">Account Info</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Role</span>
                <span className="text-[#c4ff00] font-medium capitalize">{userRole}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Joined</span>
                <span>{new Date(user.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 md:ml-64 p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}

