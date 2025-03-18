"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, User, LayoutDashboard, LogIn } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

export function GlassNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  interface CustomUser {
    id: string;
    email: string;
    // Add other user properties as needed
  }

  const [user, setUser] = useState<CustomUser | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClientComponentClient()

  // Check authentication status
  useEffect(() => {
    async function getUser() {
      try {
        // Get the current session
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || "",
            // Map other properties as needed
          })

          // Get the user's role from the profiles table
          const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

          if (profile) {
            
            setUserRole(profile.role)
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [supabase])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "#", label: "Services" },
    { href: "#", label: "Portfolio" },
    { href: "#", label: "About" },
    { href: "/user-contact-page", label: "Contact" },
  ]

  // Handle sign out
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
    setUser(null)
    setUserRole(null)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-[9999] px-4 md:px-6 py-2 transition-all duration-300",
          scrolled ? "bg-black/30 backdrop-blur-[10px] shadow-lg" : "bg-transparent",
        )}
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="#" className="flex items-center gap-2 z-50">
            <div className="w-10 h-10 rounded-full bg-[#c4ff00] flex items-center justify-center text-black">
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
            </div>
            <span className="text-white font-bold text-xl">Creative Studio</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-white/70 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden gap-2 md:flex">
            {!loading && (
              <>
                {!user ? (
                  <>
                    <Link
                      href="/login"
                      className="px-4 py-2 rounded-full bg-transparent border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
                    >
                      <LogIn size={16} />
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className="px-4 py-2 rounded-full bg-[#c4ff00] text-black text-sm font-medium hover:shadow-lg hover:shadow-[#c4ff00]/20 transition-all duration-300"
                    >
                      Get Started
                    </Link>
                  </>
                ) : (
                    <>
                    {userRole === "admin" ? (
                      <Link
                      href="/dashboard"
                      className="px-4 py-2 rounded-full bg-[#c4ff00] text-black text-sm font-medium hover:shadow-lg hover:shadow-[#c4ff00]/20 transition-all duration-300 flex items-center gap-2"
                      >
                      <LayoutDashboard size={16} />
                      Dashboard
                      </Link>
                    ) : userRole === "user" ? (
                      <Link
                      href="/user-contact-page"
                      className="px-4 py-2 rounded-full bg-[#c4ff00] text-black text-sm font-medium hover:shadow-lg hover:shadow-[#c4ff00]/20 transition-all duration-300 flex items-center gap-2"
                      >
                      <User size={16} />
                      Request Project
                      </Link>
                    ) : (
                      <Link
                      href="/profile"
                      className="px-4 py-2 rounded-full bg-[#c4ff00] text-black text-sm font-medium hover:shadow-lg hover:shadow-[#c4ff00]/20 transition-all duration-300 flex items-center gap-2"
                      >
                      <User size={16} />
                      Profile
                      </Link>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="px-4 py-2 rounded-full bg-transparent border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-all duration-300"
                    >
                      Sign Out
                    </button>
                    </>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden z-50 p-2 rounded-full bg-white/[0.03] border border-white/[0.08]"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="text-white" size={20} /> : <Menu className="text-white" size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-lg md:hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center justify-center h-full gap-8"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white text-2xl font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="mt-6 flex flex-col gap-4 w-64"
              >
                {!loading && (
                  <>
                    {!user ? (
                      <>
                        <Link
                          href="/login"
                          className="w-full px-6 py-3 rounded-full bg-transparent border border-white/20 text-white text-center font-medium hover:bg-white/10 transition-all duration-300"
                          onClick={() => setIsOpen(false)}
                        >
                          Sign In
                        </Link>
                        <Link
                          href="/signup"
                          className="w-full px-6 py-3 rounded-full bg-[#c4ff00] text-black text-center font-medium hover:shadow-lg hover:shadow-[#c4ff00]/20 transition-all duration-300"
                          onClick={() => setIsOpen(false)}
                        >
                          Get Started
                        </Link>
                      </>
                    ) : (
                      <>
                        {userRole === "admin" ? (
                          <Link
                            href="/dashboard"
                            className="w-full px-6 py-3 rounded-full bg-[#c4ff00] text-black text-center font-medium hover:shadow-lg hover:shadow-[#c4ff00]/20 transition-all duration-300"
                            onClick={() => setIsOpen(false)}
                          >
                            Dashboard
                          </Link>
                        ) : (
                          <Link
                            href="/profile"
                            className="w-full px-6 py-3 rounded-full bg-[#c4ff00] text-black text-center font-medium hover:shadow-lg hover:shadow-[#c4ff00]/20 transition-all duration-300"
                            onClick={() => setIsOpen(false)}
                          >
                            Profile
                          </Link>
                        )}
                        <button
                          onClick={() => {
                            handleSignOut()
                            setIsOpen(false)
                          }}
                          className="w-full px-6 py-3 rounded-full bg-transparent border border-white/20 text-white text-center font-medium hover:bg-white/10 transition-all duration-300"
                        >
                          Sign Out
                        </button>
                      </>
                    )}
                  </>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

