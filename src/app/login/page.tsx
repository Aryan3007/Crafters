"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, show error for empty fields
      if (!email || !password) {
        throw new Error("Please fill in all fields")
      }

      // Success would redirect or update state
      console.log("Login successful", { email, password, rememberMe })
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    setError(null)
    // Implement Google login logic here
    console.log("Google login clicked")
  }



  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden">
      {/* Decorative background elements */}
      <motion.div
        className="absolute -z-10 w-64 h-64 rounded-full bg-[#c4ff00]/5 blur-[80px]"
        style={{ top: "20%", right: "-10%" }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute -z-10 w-64 h-64 rounded-full bg-[#c4ff00]/5 blur-[80px]"
        style={{ bottom: "10%", left: "-10%" }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 2,
        }}
      />

      {/* Header */}
      <header className="py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
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
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md mx-auto">
          <motion.div
            className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-8 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <motion.div
                className="w-12 h-12 rounded-full bg-[#c4ff00] flex items-center justify-center text-black mx-auto mb-4"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
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
              </motion.div>

              <motion.h2
                className="text-2xl font-bold text-white mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Welcome Back
              </motion.h2>

              <motion.p
                className="text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Sign in to your account
              </motion.p>
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

            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                    Email Address
                  </label>
                  <motion.div
                    className={cn("relative rounded-lg overflow-hidden", error && !email ? "ring-1 ring-red-500" : "")}
                    whileFocus="focus"
                    initial="blur"
                    animate={error && !email ? "error" : "blur"}
                  >
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#1e1e1e] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c4ff00]/50 focus:border-transparent transition-all duration-200 pl-10"
                      placeholder="name@example.com"
                    />
                  </motion.div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                      Password
                    </label>
                    <Link href="/forgot-password" className="text-sm text-[#c4ff00] hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <motion.div
                    className={cn(
                      "relative rounded-lg overflow-hidden",
                      error && !password ? "ring-1 ring-red-500" : "",
                    )}
                    whileFocus="focus"
                    initial="blur"
                    animate={error && !password ? "error" : "blur"}
                  >
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Lock className="w-5 h-5" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#1e1e1e] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c4ff00]/50 focus:border-transparent transition-all duration-200 pl-10 pr-10"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </motion.div>
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
                  className="w-full bg-[#c4ff00] hover:bg-[#d8ff4d] text-black font-medium py-3 rounded-lg transition-all duration-300 flex items-center justify-center"
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
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
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

                <div className="relative flex items-center justify-center my-4">
                  <div className="border-t border-gray-800 w-full"></div>
                  <div className="bg-[#0a0a0a] text-gray-500 text-sm px-3 absolute">or continue with</div>
                </div>

                <motion.button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full bg-[#1e1e1e] hover:bg-[#252525] text-white font-medium py-3 rounded-lg transition-all duration-300 border border-gray-800 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Image src="/google.svg" alt="Google" width={20} height={20} />
                  <span>Sign in with Google</span>
                </motion.button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm text-gray-400">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-[#c4ff00] hover:underline">
                Sign up
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 md:px-8 text-center text-sm text-gray-500">
        <div className="max-w-7xl mx-auto">
          <p>© {new Date().getFullYear()} Creative Studio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

