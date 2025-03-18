"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Eye, EyeOff, AlertCircle, Users, Shield, Zap } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

const features = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Collaborate with creatives",
    description: "Join our community of designers, developers, and creative professionals to bring your ideas to life.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure workspace",
    description: "Your creative assets and projects are protected with enterprise-grade security and encryption.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Powerful tools",
    description: "Access our suite of creative tools and resources to streamline your workflow and boost productivity.",
  },
]

export default function SignupPage() {
  const router = useRouter()

  // Update the formData state to include all required fields
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    companyName: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

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

  // Replace the handleSubmit function with this implementation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)
    setIsLoading(true)

    try {
      const supabase = createClientComponentClient()

      // First, sign up the user with Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            company_name: formData.companyName,
          },
          emailRedirectTo: `${window.location.origin}/api/auth/callback`,
        },
      })

      if (signUpError) throw signUpError

      // Check if email confirmation is required
      if (data?.user?.identities?.length === 0) {
        setSuccessMessage("This email is already registered. Please check your email for the confirmation link.")
      } else {
        // Redirect to verification page
        router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`)
        return
      }

      // Clear form after successful submission
      setFormData({
        email: "",
        password: "",
        fullName: "",
        companyName: "",
      })
    } catch (err) {
      console.error("Signup error:", err)
      setError(err instanceof Error ? err.message : "An error occurred during signup")
    } finally {
      setIsLoading(false)
    }
  }

  // Replace the existing handleGoogleSignUp function with this improved version
  const handleGoogleSignUp = async () => {
    setError(null)
    setIsLoading(true)

    try {
      const supabase = createClientComponentClient()

      // Use a more robust OAuth sign-in with proper state handling
      const { error } = await supabase.auth.signInWithOAuth({
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
      console.error("Google sign-up error:", err)
      setError(err instanceof Error ? err.message : "Failed to sign up with Google")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left side */}
      <div className="w-0 lg:w-[55%] bg-[#0a0a0a] p-8 lg:p-12 hidden lg:flex flex-col">
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

          <h1 className="text-4xl font-bold text-white mb-3">Start creating with Creative Studio</h1>
          <p className="text-gray-400 text-sm mb-12">No credit card required</p>

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
      <div className="flex-1 flex max-w-xl mx-auto flex-col p-8 lg:p-12">
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

        <div className=" w-full mx-auto">
          <div className="mb-8">
            <h2 className="text-xl text-white mb-2">Sign up with</h2>
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={handleGoogleSignUp}
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
             
            </div>
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

        {successMessage && (
          <motion.div
            className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-6 flex items-center gap-2 text-sm text-green-200"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            <span>{successMessage}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1.5">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-[#1e1e1e] border border-gray-800 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c4ff00]/50 focus:border-transparent transition-all duration-200"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
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
            <p className="text-xs text-gray-500 mt-1.5">Minimum length is 8 characters</p>
          </div>

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-400 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full bg-[#1e1e1e] border border-gray-800 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c4ff00]/50 focus:border-transparent transition-all duration-200"
              placeholder="Alaska Young"
            />
          </div>

          {/* Add company name field to the form */}
          <div className="mb-4">
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-400 mb-1">
              Company Name (Optional)
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full bg-[#1e1e1e] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c4ff00]/50 focus:border-transparent transition-all duration-200"
              placeholder="Your Company Ltd."
            />
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
              "Sign Up"
            )}
          </motion.button>
        </form>

        <p className="mt-4 text-sm text-gray-400 text-center">
          By creating an account, you agree to our{" "}
          <Link href="/terms" className="text-[#c4ff00] hover:underline">
            Terms of Service
          </Link>
        </p>

        <p className="mt-6 text-sm text-gray-400 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-[#c4ff00] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

