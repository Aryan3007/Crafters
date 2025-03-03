"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const stats = [
  { value: "99.9%", label: "Uptime" },
  { value: "150K+", label: "Users" },
  { value: "65+", label: "Countries" },
  { value: "24/7", label: "Support" },
]

const testimonials = [
  {
    quote: "This platform has transformed how we build products. The features and design are exceptional.",
    author: "Sarah Johnson",
    role: "Product Manager",
    image: "/placeholder.svg?height=48&width=48"
  },
  {
    quote: "The best decision we made was switching to this platform. The results speak for themselves.",
    author: "Michael Chen",
    role: "Tech Lead",
    image: "/placeholder.svg?height=48&width=48"
  }
]

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full bg-[#030303] py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-bl from-indigo-500/[0.03] via-transparent to-rose-500/[0.03]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-rose-400 mb-2">
                {stat.value}
              </div>
              <div className="text-white/40 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <div className="max-w-6xl mx-auto">
          <motion.div style={{ y }} className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-rose-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative p-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm">
                  <p className="text-white/80 text-lg mb-6">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <div className="text-white font-medium">{testimonial.author}</div>
                      <div className="text-white/40 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
