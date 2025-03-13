"use client"

import { motion } from "framer-motion"
import { Shield, LogOut } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function SettingsPage() {
  const router = useRouter()
  interface User {
    id: string;
    email?: string;
    user_metadata?: {
      full_name?: string;
    };
  }

  const [user, setUser] = useState<User | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function getUser() {
      // Get the user profile data
      const { data: userData, error: userError } = await supabase.auth.getUser()

      if (userError || !userData.user) {
        console.error("Error fetching user:", userError)
        return
      }

      setUser(userData.user)
    }

    getUser()
  }, [supabase.auth])

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error("Error signing out:", error)
    } else {
      router.push("/login")
    }
  }

  if (!user) return null

  // Parse the user's name from email if name is not available
  const displayName = user.user_metadata?.full_name || (user.email ? user.email.split("@")[0] : "Creative User")

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-medium mb-6">Account Settings</h3>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-400 mb-2">Email Address</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full bg-[#1e1e1e] border border-gray-800 rounded-lg px-4 py-2.5 text-white"
            />
            <p className="text-xs text-gray-500 mt-1">Your email address cannot be changed</p>
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Display Name</label>
            <input
              type="text"
              defaultValue={user.user_metadata?.full_name || displayName}
              className="w-full bg-[#1e1e1e] border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#c4ff00]/50 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <div className="relative">
                <input type="checkbox" className="sr-only" defaultChecked />
                <div className="h-6 w-11 bg-[#1e1e1e] rounded-full"></div>
                <div className="dot absolute left-1 top-1 h-4 w-4 bg-[#c4ff00] rounded-full transition"></div>
              </div>
              <span>Email Notifications</span>
            </label>
            <p className="text-xs text-gray-500 mt-1 ml-14">Receive email notifications about project updates</p>
          </div>

          <div className="pt-2">
            <button className="bg-[#c4ff00] hover:bg-[#d8ff4d] text-black font-medium px-4 py-2 rounded-lg transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-medium mb-6">Security</h3>

        <div className="space-y-4">
          <button className="w-full bg-[#1e1e1e] hover:bg-[#252525] text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
            <Shield className="w-5 h-5" />
            Change Password
          </button>

          <div className="pt-4 mt-4 border-t border-gray-800">
            <button
              onClick={handleSignOut}
              className="text-red-500 hover:text-red-400 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

