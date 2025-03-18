"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { portfolioProjects } from "@/data/portfolio-projects"
import { cn } from "@/lib/utils"
import AnimatedFooter from "@/sections/animated-footer"
import { GlassNavbar } from "@/components/glass-navbar"

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const categories = [
    { id: "all", label: "All Work" },
    { id: "web", label: "Web Development" },
    { id: "app", label: "App Development" },
    { id: "graphic", label: "Graphic Design" },
    { id: "ui/ux", label: "UI/UX Design" },
    { id: "branding", label: "Branding" },
  ]

  const filteredProjects =
    activeCategory === "all"
      ? portfolioProjects
      : portfolioProjects.filter((project) => project.category === activeCategory)

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
        <GlassNavbar/>
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 z-10" />
       
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="bg-[#1e1e1e] rounded-full p-2 flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-[#c4ff00] flex items-center justify-center text-black">
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
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                  <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                  <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <span className="text-lg font-medium pr-2">Our Portfolio</span>
            </div>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our Creative Work
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Explore our diverse portfolio of digital experiences, designs, and creative solutions.
          </motion.p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-5 py-2 rounded-full transition-all duration-300",
                activeCategory === category.id
                  ? "bg-[#c4ff00] text-black font-medium"
                  : "bg-[#1e1e1e] text-white hover:bg-[#2a2a2a]",
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              className="group relative overflow-hidden rounded-xl bg-[#1e1e1e] h-[400px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="bg-[#c4ff00] text-black text-xs font-medium px-2 py-1 rounded inline-block mb-3">
                    {categories.find((c) => c.id === project.category)?.label}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.description}
                  </p>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link
                      href={`/portfolio/${project.id}`}
                      className="bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm transition-colors"
                    >
                      View Details
                    </Link>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm transition-colors"
                      >
                        Visit Project
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-[#1e1e1e] rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start your project?</h2>
            <p className="text-gray-300 mb-8">
              Let&apos;s collaborate to bring your vision to life with our creative expertise and technical skills.
            </p>
            <Link
              href="/user-contact-page"
              className="bg-[#c4ff00] hover:bg-[#d8ff4d] text-black font-medium px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <AnimatedFooter />
    </div>
  )
}

