/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Bell, LogOut, User, Briefcase, Users, BarChart3, Settings, Search, Globe } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

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

      // Check if user is admin
      if (!profile || profile.role !== "admin") {
        // Redirect non-admin users to profile
        router.push("/profile")
        return
      }

      setLoading(false)
    }

    getUser()
  }, [router, supabase.auth, supabase])

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
          <p className="text-white text-lg">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // Parse the user's name from email if name is not available
  const displayName = user.user_metadata?.full_name || (user.email ? user.email.split("@")[0] : "Admin User")

  // Get user's avatar or use a placeholder
  const userAvatar =
    user.user_metadata?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=c4ff00&color=000&size=128`

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-[#0a0a0a] border-b border-gray-800 fixed top-0 left-0 right-0 z-10">
        <div className=" px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
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

            <div className="flex items-center gap-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#1e1e1e] border border-gray-800 rounded-lg px-4 py-2 pl-10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c4ff00]/50 focus:border-transparent transition-all duration-200 w-64"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>

              <button className="relative text-gray-400 hover:text-white transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#c4ff00] text-black text-xs flex items-center justify-center">
                  5
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
                <div>
                  <p className="text-sm font-medium">{displayName}</p>
                  <p className="text-xs text-gray-400">Admin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Rest of the component remains the same */}
      <div className="flex pt-[73px] min-h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <div className="w-64 bg-[#0a0a0a] border-r border-gray-800 p-4 flex flex-col fixed left-0 top-[73px] bottom-0 overflow-y-auto">
          <div className="space-y-2 flex-1">
            <Link
              href="/dashboard"
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${
                pathname === "/dashboard"
                  ? "bg-[#c4ff00] text-black font-medium"
                  : "text-gray-400 hover:bg-[#1e1e1e] hover:text-white"
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span>Overview</span>
            </Link>

            <Link
              href="/dashboard/projects"
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${
                pathname === "/dashboard/projects"
                  ? "bg-[#c4ff00] text-black font-medium"
                  : "text-gray-400 hover:bg-[#1e1e1e] hover:text-white"
              }`}
            >
              <Briefcase className="w-5 h-5" />
              <span>Projects</span>
            </Link>

            <Link
              href="/dashboard/clients"
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${
                pathname === "/dashboard/clients"
                  ? "bg-[#c4ff00] text-black font-medium"
                  : "text-gray-400 hover:bg-[#1e1e1e] hover:text-white"
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Clients</span>
            </Link>

            <Link
              href="/dashboard/team"
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${
                pathname === "/dashboard/team"
                  ? "bg-[#c4ff00] text-black font-medium"
                  : "text-gray-400 hover:bg-[#1e1e1e] hover:text-white"
              }`}
            >
              <User className="w-5 h-5" />
              <span>Team</span>
            </Link>

            <Link
              href="/dashboard/users"
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${
                pathname === "/dashboard/users"
                  ? "bg-[#c4ff00] text-black font-medium"
                  : "text-gray-400 hover:bg-[#1e1e1e] hover:text-white"
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Users</span>
            </Link>

            <Link
              href="/dashboard/website-management"
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${
                pathname.startsWith("/dashboard/website-management")
                  ? "bg-[#c4ff00] text-black font-medium"
                  : "text-gray-400 hover:bg-[#1e1e1e] hover:text-white"
              }`}
            >
              <Globe className="w-5 h-5" />
              <span>Website Content</span>
            </Link>

            <Link
              href="/dashboard/settings"
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${
                pathname === "/dashboard/settings"
                  ? "bg-[#c4ff00] text-black font-medium"
                  : "text-gray-400 hover:bg-[#1e1e1e] hover:text-white"
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
          </div>

          <div className="pt-4 mt-4 border-t border-gray-800">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left text-red-500 hover:text-red-700 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span >Sign Out</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64 p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}

