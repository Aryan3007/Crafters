"use client"

import type React from "react"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export function ResendVerification() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClientComponentClient()

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setMessage({ type: "error", text: "Please enter your email address" })
      return
    }

    setIsLoading(true)
    setMessage(null)

    try {
      // Get the current origin for the redirect URL
      const origin = window.location.origin
      const redirectTo = `${origin}/api/auth/callback`

      // Send the verification email
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
        options: {
          emailRedirectTo: redirectTo,
        },
      })

      if (error) {
        console.error("Error resending verification:", error)

        if (error.message.includes("rate limit")) {
          setMessage({
            type: "error",
            text: "Too many requests. Please wait a few minutes before trying again.",
          })
        } else {
          setMessage({ type: "error", text: error.message })
        }
      } else {
        setMessage({
          type: "success",
          text: "Verification email sent! Please check your inbox and spam folder.",
        })
        setEmail("")
      }
    } catch (err) {
      console.error("Unexpected error:", err)
      setMessage({
        type: "error",
        text: "An unexpected error occurred. Please try again later.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-[#0a0a0a] rounded-lg border border-gray-800">
      <h2 className="text-xl font-bold text-white mb-4">Resend Verification Email</h2>

      <form onSubmit={handleResend} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="bg-[#1a1a1a] border-gray-700 text-white"
            required
          />
        </div>

        {message && (
          <div
            className={`p-3 rounded-md flex items-start gap-2 ${
              message.type === "error"
                ? "bg-red-500/10 border border-red-500/30"
                : "bg-green-500/10 border border-green-500/30"
            }`}
          >
            {message.type === "error" ? (
              <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
            ) : (
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
            )}
            <p className={`text-sm ${message.type === "error" ? "text-red-300" : "text-green-300"}`}>{message.text}</p>
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-[#c4ff00] hover:bg-[#d4ff4d] text-black font-medium"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Resend Verification Email"}
        </Button>
      </form>
    </div>
  )
}

