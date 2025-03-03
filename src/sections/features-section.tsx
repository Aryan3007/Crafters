"use client"

import { motion } from "framer-motion"
import { Code2, Palette, Zap, Shield } from 'lucide-react'

const features = [
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Clean Code",
    description: "Built with modern best practices and clean architecture principles for maintainable code."
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: "Beautiful Design",
    description: "Carefully crafted interfaces that blend aesthetics with functional user experience."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Fast Performance",
    description: "Optimized for speed and efficiency, ensuring smooth user interactions."
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure & Reliable",
    description: "Built with security in mind, protecting your data and users at every step."
  }
]

export default function FeaturesSection() {
  return (
    <section className="relative min-h-screen w-full bg-[#030303] py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/[0.03] via-transparent to-rose-500/[0.03]" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Powerful Features
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            Discover the tools and features that make our platform stand out from the rest.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-rose-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative p-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.04] transition-colors duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500/20 to-rose-500/20 text-white">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-white/60">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
