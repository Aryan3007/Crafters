"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function GlassNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#", label: "Home" },
    { href: "#", label: "Services" },
    { href: "#", label: "Protfolio" },
    { href: "#", label: "About" },
    { href: "#", label: "Contact" },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-[9999] px-4 md:px-6 py-4 transition-all duration-300",
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
            <span className="text-white font-bold text-xl">The Crafters</span>
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
          {/* <button className="px-4 py-2 rounded-full bg-[#c4ff00] text-black text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300">
           Get Started
            </button> */}
            <button className="px-4 py-2 rounded-full bg-[#c4ff00] text-black text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300">
            Contact Us
            </button>
        
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
                className="mt-6 flex flex-col gap-2"
              >
                <button className="px-6 py-3 rounded-full bg-[#c4ff00] text-black font-medium hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300">
                  Contact Us
                </button>
                {/* <button className="px-6 py-3 rounded-full bg-[#c4ff00] text-black font-medium hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300">
            Sign In
            </button> */}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

