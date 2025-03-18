"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, AlertCircle } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function VerifyEmailPage() {
  const [email, setEmail] = useState<string | null>(null)
  const [isResending, setIsResending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    // Try to get the email from URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const emailParam = urlParams.get("email")

    if (emailParam) {
      setEmail(emailParam)
    }
  }, [])

  const handleResendVerification = async () => {
    if (!email) return

    setIsResending(true)
    setError(null)
    setSuccess(null)

    try {
      const supabase = createClientComponentClient()
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
      })

      if (error) throw error

      setSuccess("Verification email has been resent. Please check your inbox.")
    } catch (err) {
      console.error("Error resending verification:", err)
      setError(err instanceof Error ? err.message : "Failed to resend verification email")
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#0a0a0a] rounded-xl border border-gray-800 p-8">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#c4ff00]/10 flex items-center justify-center text-[#c4ff00] mb-4">
            <Mail className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Check your email</h1>
          <p className="text-gray-400">
            We've sent a verification link to{" "}
            <span className="text-white font-medium">{email || "your email address"}</span>
          </p>
        </div>

        {error && (
          <motion.div
            className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-6 flex items-center gap-2 text-sm text-red-200"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        {success && (
          <motion.div
            className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-6 flex items-center gap-2 text-sm text-green-200"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            <span>{success}</span>
          </motion.div>
        )}

        <div className="space-y-4">
          <motion.button
            onClick={handleResendVerification}
            className="w-full bg-[#1e1e1e] hover:bg-[#252525] text-white font-medium py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isResending || !email}
          >
            {isResending ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Resend Verification Email"
            )}
          </motion.button>

          <Link href="/login">
            <motion.button
              className="w-full bg-transparent border border-gray-800 text-white font-medium py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Back to Login
            </motion.button>
          </Link>
        </div>

        <p className="mt-8 text-sm text-gray-400 text-center">
          Didn't receive an email? Check your spam folder or contact{" "}
          <Link href="/contact" className="text-[#c4ff00] hover:underline">
            support
          </Link>
        </p>
      </div>
    </div>
  )
}

