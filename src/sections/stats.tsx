"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, motion } from "framer-motion"

const stats = [
  {
    value: 45,
    suffix: "%",
    description: "Lorem ipsum dolor sit amet consectetur",
  },
  {
    value: 15.5,
    suffix: "K+",
    description: "Lorem ipsum dolor sit amet consectetur",
  },
  {
    value: 20,
    suffix: "B+",
    description: "Lorem ipsum dolor sit amet consectetur",
  },
]

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const duration = 2000 // 500ms = 1/2 second
      const frames = 60 // 60 frames for smooth animation
      const interval = duration / frames
      const step = value / frames

      let currentCount = 0
      const timer = setInterval(() => {
        currentCount += step
        if (currentCount >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(currentCount)
        }
      }, interval)

      return () => clearInterval(timer)
    }
  }, [value, isInView])

  return (
    <span ref={ref} className="tabular-nums">
      {count.toFixed(value % 1 === 0 ? 0 : 1)}
      {suffix}
    </span>
  )
}

export default function Stats() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true })

  return (
    <section ref={containerRef} className=" px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-2xl md:text-3xl font-bold mb-4">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-gray-600 text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

