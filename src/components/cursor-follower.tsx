"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

export default function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)

  // Mouse position with spring physics for smooth movement
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Apply spring physics for smooth following
  const springConfig = { damping: 25, stiffness: 300 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  // For the smaller dot, use different spring settings for a trailing effect
  const dotSpringConfig = { damping: 40, stiffness: 200 }
  const dotX = useSpring(mouseX, dotSpringConfig)
  const dotY = useSpring(mouseY, dotSpringConfig)

  // States for different cursor behaviors
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    // Don't initialize cursor follower on mobile devices
    if (isMobile) return

    // Update cursor position on mouse move
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    // Handle mouse down event
    const handleMouseDown = () => {
      setIsClicking(true)
    }

    // Handle mouse up event
    const handleMouseUp = () => {
      setIsClicking(false)
    }

    // Handle mouse enter/leave for the document
    const handleMouseEnter = () => {
      setIsHidden(false)
    }

    const handleMouseLeave = () => {
      setIsHidden(true)
    }

    // Add event listeners for interactive elements
    const addInteractiveListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, input, textarea, select, [role="button"], [tabindex="0"]',
      )

      interactiveElements.forEach((element) => {
        element.addEventListener("mouseenter", () => setIsHovering(true))
        element.addEventListener("mouseleave", () => setIsHovering(false))
      })
    }

    // Add all event listeners
    window.addEventListener("mousemove", updateMousePosition)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)

    // Initial setup for interactive elements
    addInteractiveListeners()

    // Set up a mutation observer to handle dynamically added elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          addInteractiveListeners()
        }
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    // Hide default cursor
    document.body.style.cursor = "none"

    // Cleanup function
    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)

      // Restore default cursor
      document.body.style.cursor = "auto"

      // Disconnect observer
      observer.disconnect()
    }
  }, [mouseX, mouseY, isMobile])

  // Don't render on mobile devices
  if (isMobile) return null

  return (
    <>
      {/* Main cursor circle */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 60 : 30,
          height: isHovering ? 60 : 30,
          opacity: isHidden ? 0 : 1,
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 300,
          mass: 0.5,
        }}
      >
        <div
          className={`rounded-full bg-[#c4ff00] w-full h-full flex items-center justify-center transition-all duration-200`}
        >
          {isHovering && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-black text-xs font-medium"
            >
              
            </motion.span>
          )}
        </div>
      </motion.div>

      {/* Small dot that follows more closely */}
      <motion.div
        ref={cursorDotRef}
        className="fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full bg-white pointer-events-none"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isHidden ? 0 : 0.6,
          scale: isClicking ? 0.5 : 1,
        }}
      />
    </>
  )
}

