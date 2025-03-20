"use client"

import { useState, useEffect } from "react"
import { debugUserMetadata } from "@/app/utils/debug-user-metadata"

export default function DebugUserInfo() {
  interface UserData {
    // Define the structure of your user data here
    id: string;
    name: string;
    email: string;
    // Add other fields as needed
  }

  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUserData() {
      try {
        const data = await debugUserMetadata()
        if (data.error) {
          setError(data.error)
        } else {
          setUserData({
            id: data.id,
            name: data.user_metadata?.name || "Unknown",
            email: data.email || "Unknown",
            // Add other fields as needed
          } as UserData)
        }
      } catch (err) {
        setError(String(err))
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  if (loading) return <div>Loading user data...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="p-4 bg-[#1e1e1e] rounded-lg">
      <h2 className="text-xl font-bold mb-4">User Metadata Debug</h2>
      <pre className="whitespace-pre-wrap overflow-auto max-h-[500px] p-4 bg-black rounded">
        {JSON.stringify(userData, null, 2)}
      </pre>
    </div>
  )
}

