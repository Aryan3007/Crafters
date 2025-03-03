"use client"

import { motion, AnimatePresence } from "framer-motion"
import type React from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
]

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-4 mt-8">
          <AnimatePresence>
            {menuItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-lg font-medium transition-colors duration-200 hover:bg-gray-100"
                  onClick={onClose}
                >
                  <span>{item.label}</span>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="pt-4 space-y-4"
          >
            <Button
              variant="default"
              className="w-full bg-gray-900 hover:bg-gray-800 text-white transition-colors duration-200"
              onClick={onClose}
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              className="w-full border-gray-200 hover:bg-gray-100 transition-colors duration-200"
              onClick={onClose}
            >
              Login
            </Button>
          </motion.div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

