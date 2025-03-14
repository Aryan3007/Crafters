"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Eye, EyeOff, AlertCircle, Shield, Zap, Lock } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure workspace",
    description: "Your creative assets and projects are protected with enterprise-grade security and encryption.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Instant access",
    description: "Get immediate access to all your projects, assets, and collaboration tools.",
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Privacy first",
    description: "We prioritize your privacy with end-to-end encryption and secure data handling.",
  },
]

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Add this near the top of the component, after the useState declarations
  // This will extract error information from the URL
  useEffect(() => {
    // Check for error parameters in the URL
    const urlParams = new URLSearchParams(window.location.search)
    const urlError = urlParams.get("error")
    const urlErrorDescription = urlParams.get("error_description")

    if (urlError) {
      let errorMessage = urlError

      // Format the error message for better readability
      if (urlError === "bad_oauth_state" || urlError === "invalid_request") {
        errorMessage = "Authentication session expired or invalid. Please try again."
      } else if (urlErrorDescription) {
        errorMessage = urlErrorDescription
      }

      setError(errorMessage)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      if (!formData.email || !formData.password) {
        throw new Error("Please fill in all fields")
      }
      console.log("Login successful", formData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  // Replace the existing handleGoogleSignIn function with this improved version
  const handleGoogleSignIn = async () => {
    setError(null)
    setIsLoading(true)

    try {
      const supabase = createClientComponentClient()

      // Use a more robust OAuth sign-in with proper state handling
      const {  error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      })

      if (error) throw error

      // The user will be redirected to Google for authentication
      // No need to handle anything else here as the redirect will happen automatically
    } catch (err) {
      console.error("Google sign-in error:", err)
      setError(err instanceof Error ? err.message : "Failed to sign in with Google")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left side */}
      <div className="w-0 lg:w-[45%] bg-[#0a0a0a] p-8 lg:p-12 hidden lg:flex flex-col">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-16">
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

          <h1 className="text-4xl font-bold text-white mb-3">Welcome back to Creative Studio</h1>
          <p className="text-gray-400 text-sm mb-12">Sign in to continue your creative journey</p>

          <div className="space-y-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="flex gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#c4ff00]/10 flex items-center justify-center text-[#c4ff00] flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-auto text-sm text-gray-400 flex gap-4">
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1 flex flex-col p-8 lg:p-12">
        <div className="lg:hidden flex justify-between items-center mb-8">
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

          <Link href="/" className="text-gray-400 hover:text-white transition-colors">
            Back to Home
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto">
          <div className="mb-8">
            <h2 className="text-xl text-white mb-2">Sign in with</h2>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={handleGoogleSignIn}
                type="button"
                className="flex items-center justify-center gap-2 bg-[#1e1e1e] hover:bg-[#252525] text-white rounded-lg p-2.5 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 48 48">
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.15 0 5.64 1.08 7.73 2.85l5.73-5.73C33.64 3.64 29.14 2 24 2 14.94 2 7.48 7.48 4.26 15.26l6.99 5.43C12.94 14.64 17.94 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.5 24c0-1.5-.14-2.94-.41-4.35H24v8.23h12.65c-.55 2.94-2.14 5.44-4.55 7.14l6.99 5.43C43.14 36.94 46.5 30.94 46.5 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.26 28.69c-.64-1.92-1-3.94-1-6.19s.36-4.27 1-6.19l-6.99-5.43C2.14 14.94 1.5 19.34 1.5 24s.64 9.06 1.77 13.12l6.99-5.43z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 46.5c5.14 0 9.64-1.71 13.14-4.64l-6.99-5.43c-1.92 1.28-4.35 2.07-6.99 2.07-6.06 0-11.06-5.14-12.75-11.94l-6.99 5.43C7.48 40.52 14.94 46.5 24 46.5z"
                  />
                </svg>
                <span className="text-sm">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 bg-[#1e1e1e] hover:bg-[#252525] text-white rounded-lg p-2.5 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span className="text-sm">Github</span>
              </button>
              <button className="flex items-center justify-center gap-2 bg-[#1e1e1e] hover:bg-[#252525] text-white rounded-lg p-2.5 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FC6D26">
                  <path d="M23.955 13.587l-1.342-4.135-2.664-8.189a.455.455 0 00-.867 0L16.418 9.45H7.582L4.918 1.263a.455.455 0 00-.867 0L1.386 9.45.045 13.587a.924.924 0 00.331 1.023L12 23.054l11.624-8.443a.92.92 0 00.331-1.024" />
                </svg>
                <span className="text-sm">Gitlab</span>
              </button>
            </div>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-400">Or continue with</span>
              </div>
            </div>
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1.5">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#1e1e1e] border border-gray-800 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c4ff00]/50 focus:border-transparent transition-all duration-200"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                  Password
                </label>
                <Link href="/forgot-password" className="text-sm text-[#c4ff00] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-[#1e1e1e] border border-gray-800 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c4ff00]/50 focus:border-transparent transition-all duration-200 pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-700 bg-[#1e1e1e] text-[#c4ff00] focus:ring-[#c4ff00] focus:ring-offset-0"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-400">
                Remember me
              </label>
            </div>

            <motion.button
              type="submit"
              className="w-full bg-[#c4ff00] hover:bg-[#d8ff4d] text-black font-medium py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center mt-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-black"
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
                "Sign In"
              )}
            </motion.button>
          </form>

          <p className="mt-6 text-sm text-gray-400 text-center">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#c4ff00] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

