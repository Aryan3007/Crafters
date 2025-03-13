"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Loader2 } from "lucide-react"
import ContactForm from "@/sections/contact-form"
import { Profile } from "../../../types/database"

export default function UserContactPage() {
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState<{
    fullName?: string
    email?: string
    companyName?: string
  } | null>(null)

  const supabase = createClientComponentClient<Profile>()

  useEffect(() => {
    async function loadUserData() {
      try {
        // Get the current user
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          setLoading(false)
          return
        }

        // Get the user's profile
        const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

        if (profile) {
          setUserData({
            fullName: profile.full_name || user.user_metadata?.full_name,
            email: profile.email || user.email,
            companyName: profile.company_name || user.user_metadata?.company_name,
          })
        } else {
          // Fallback to user metadata if profile not found
          setUserData({
            fullName: user.user_metadata?.full_name,
            email: user.email,
          })
        }
      } catch (error) {
        console.error("Error loading user data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [supabase])

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 text-[#c4ff00] animate-spin" />
            </div>
          ) : (
            <ContactForm prefillData={userData || undefined} />
          )}
        </div>
      </div>
    </div>
  )
}

