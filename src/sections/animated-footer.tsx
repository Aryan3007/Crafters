"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
// import Image from "next/image"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Instagram, Twitter, Linkedin, Github, Dribbble, ArrowRight, Mail, MapPin, Phone, ChevronUp } from 'lucide-react'

export default function AnimatedFooter() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [scrollToTop, setScrollToTop] = useState(false)
  
  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setScrollToTop(true)
      } else {
        setScrollToTop(false)
      }
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
  
  // Animation for elements when they come into view
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])
  
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true)
      setEmail("")
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)
    }, 800)
  }
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.04, 0.62, 0.23, 0.98]
      }
    }
  }
  
  const linkGroups = [
    {
      title: "Services",
      links: [
        { name: "Web Development", href: "/services/web" },
        { name: "App Development", href: "/services/app" },
        { name: "UI/UX Design", href: "/services/design" },
        { name: "Branding", href: "/services/branding" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Our Team", href: "/team" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "/blog" },
        { name: "Case Studies", href: "/case-studies" },
        { name: "FAQ", href: "/faq" },
        { name: "Privacy Policy", href: "/privacy" }
      ]
    }
  ]
  
  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, href: "https://instagram.com", label: "Instagram" },
    { icon: <Twitter className="w-5 h-5" />, href: "https://twitter.com", label: "Twitter" },
    { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <Github className="w-5 h-5" />, href: "https://github.com", label: "GitHub" },
    { icon: <Dribbble className="w-5 h-5" />, href: "https://dribbble.com", label: "Dribbble" }
  ]
  
  return (
    <footer className="relative bg-black text-white overflow-hidden pt-20 pb-10" ref={ref}>
     
      {/* Main footer content */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16"
        >
          {/* Logo and company info */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="mb-6">
              {/* <div className="flex items-center gap-2 mb-4">
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
                <span className="text-2xl font-bold">The Crafters</span>
              </div> */}
              <p className="text-gray-400 mb-6 max-w-md">
                We craft exceptional digital experiences that inspire, engage, and deliver results. 
                Our team of creative experts is dedicated to bringing your vision to life.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1e1e1e] flex items-center justify-center">
                    <Mail className="w-4 h-4 text-[#c4ff00]" />
                  </div>
                  <span className="text-gray-300">hello@creativestudio.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1e1e1e] flex items-center justify-center">
                    <Phone className="w-4 h-4 text-[#c4ff00]" />
                  </div>
                  <span className="text-gray-300">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1e1e1e] flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-[#c4ff00]" />
                  </div>
                  <span className="text-gray-300">123 Creative St, Design District, SF</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Link groups */}
          {linkGroups.map((group, idx) => (
            <motion.div variants={itemVariants} key={idx} className="space-y-4">
              <h3 className="text-lg font-semibold mb-4 relative inline-block">
                {group.title}
                <motion.span 
                  className="absolute -bottom-1 left-0 h-0.5 bg-[#c4ff00]" 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5 + idx * 0.1, duration: 0.8 }}
                />
              </h3>
              <ul className="space-y-2">
                {group.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-[#c4ff00] transition-colors duration-300 flex items-center group"
                    >
                      <span>{link.name}</span>
                      <motion.span 
                        initial={{ opacity: 0, x: -4 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="ml-1 inline-block"
                      >
                        <ArrowRight className="w-3 h-3" />
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Newsletter and social */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="border-t border-gray-800 py-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div variants={itemVariants} className="max-w-md">
              <h3 className="text-xl font-semibold mb-2">Stay in the loop</h3>
              <p className="text-gray-400 mb-4">
                Subscribe to our newsletter for the latest updates, insights, and creative inspiration.
              </p>
              
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-[#1e1e1e] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c4ff00]/50 focus:border-transparent transition-all duration-200 pr-12"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-[#c4ff00] flex items-center justify-center text-black transition-transform duration-300 hover:scale-110"
                  disabled={isSubmitted}
                >
                  {isSubmitted ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </button>
              </form>
              
              {isSubmitted && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[#c4ff00] text-sm mt-2"
                >
                  Thanks for subscribing!
                </motion.p>
              )}
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex flex-wrap justify-start md:justify-end gap-3">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-gray-900  bg-[#c4ff00] transition-colors duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
        
        {/* Copyright */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="border-t border-gray-800 pt-6 mt-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p variants={itemVariants} className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Creative Studio. All rights reserved.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex items-center gap-6">
              <Link href="/terms" className="text-gray-500 hover:text-[#c4ff00] text-sm transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-gray-500 hover:text-[#c4ff00] text-sm transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="text-gray-500 hover:text-[#c4ff00] text-sm transition-colors duration-300">
                Cookies
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll to top button */}
      <motion.button
        onClick={handleScrollToTop}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: scrollToTop ? 1 : 0, 
          scale: scrollToTop ? 1 : 0.8,
          y: scrollToTop ? 0 : 20
        }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-[#c4ff00] text-black flex items-center justify-center shadow-lg z-50 hover:bg-white transition-colors duration-300"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-6 h-6" />
      </motion.button>
    </footer>
  )
}
