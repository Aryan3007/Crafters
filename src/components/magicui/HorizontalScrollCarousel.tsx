"use client"

import { motion, useTransform, useScroll } from "framer-motion"
import { useRef } from "react"
// import Image from "next/image"

type ProjectType = {
  url: string
  title: string
  description: string
  category: string
  tech: string[]
  id: number
}

const projects: ProjectType[] = [
  {
    url: "/placeholder.svg?height=800&width=1200",
    title: "E-Commerce Platform",
    description:
      "A fully responsive e-commerce platform with advanced filtering, cart functionality, and secure payment processing.",
    category: "Web App",
    tech: ["Next.js", "Tailwind", "Stripe"],
    id: 1,
  },
  {
    url: "/placeholder.svg?height=800&width=1200",
    title: "Finance Dashboard",
    description:
      "Interactive dashboard for financial analytics with real-time data visualization and customizable reports.",
    category: "Dashboard",
    tech: ["React", "D3.js", "Firebase"],
    id: 2,
  },
  {
    url: "/placeholder.svg?height=800&width=1200",
    title: "Health & Fitness App",
    description:
      "Mobile-first application for tracking workouts, nutrition, and personal health metrics with social features.",
    category: "Mobile App",
    tech: ["React Native", "GraphQL", "AWS"],
    id: 3,
  },
  {
    url: "/placeholder.svg?height=800&width=1200",
    title: "Real Estate Platform",
    description:
      "Property listing and management system with virtual tours, appointment scheduling, and agent dashboards.",
    category: "Web Platform",
    tech: ["Vue.js", "Node.js", "MongoDB"],
    id: 4,
  },
  {
    url: "/placeholder.svg?height=800&width=1200",
    title: "Learning Management System",
    description:
      "Comprehensive LMS with course creation tools, student progress tracking, and interactive learning materials.",
    category: "Education",
    tech: ["Angular", "Express", "PostgreSQL"],
    id: 5,
  },
  {
    url: "/placeholder.svg?height=800&width=1200",
    title: "AI Content Generator",
    description:
      "Advanced content creation tool using AI to generate marketing copy, blog posts, and social media content.",
    category: "AI Tool",
    tech: ["Python", "TensorFlow", "Next.js"],
    id: 6,
  },
  {
    url: "/placeholder.svg?height=800&width=1200",
    title: "Crypto Trading Platform",
    description:
      "Secure cryptocurrency exchange with real-time market data, portfolio management, and automated trading features.",
    category: "Fintech",
    tech: ["React", "Blockchain", "WebSockets"],
    id: 7,
  },
]

const ProjectCard = ({ project }: { project: ProjectType }) => {
  return (
    <div
      key={project.id}
      className="group relative h-[70vh] w-[80vw] max-w-[800px] overflow-hidden rounded-2xl bg-[#1e1e1e] border border-[#333333]"
    >
      <div
        style={{
          backgroundImage: `url(${project.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-105"
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 right-0 z-20 p-8">
        <div className="mb-2 flex items-center gap-2">
          <div className="bg-[#c4ff00] text-black text-xs font-bold px-3 py-1 rounded-full">{project.category}</div>
          {project.tech.map((tech, index) => (
            <div key={index} className="bg-[#333] text-white text-xs px-3 py-1 rounded-full">
              {tech}
            </div>
          ))}
        </div>
        <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-300 mb-4 max-w-xl">{project.description}</p>
        <div className="flex gap-3">
          <button className="bg-[#c4ff00] hover:bg-[#d8ff4d] text-black font-medium px-5 py-2 rounded-lg transition-colors">
            View Project
          </button>
          <button className="bg-[#333] hover:bg-[#444] text-white font-medium px-5 py-2 rounded-lg transition-colors">
            Case Study
          </button>
        </div>
      </div>
    </div>
  )
}

export const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"])

  return (
    <section ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {projects.map((project) => {
            return <ProjectCard project={project} key={project.id} />
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default HorizontalScrollCarousel
