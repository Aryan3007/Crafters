"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { portfolioProjects, type Project } from "@/data/portfolio-projects"
import AnimatedFooter from "@/sections/animated-footer"

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([])

  useEffect(() => {
    const projectId = params.id as string
    const foundProject = portfolioProjects.find((p) => p.id === projectId)

    if (!foundProject) {
      router.push("/portfolio")
      return
    }

    setProject(foundProject)

    // Find related projects (same category, excluding current)
    const related = portfolioProjects
      .filter((p) => p.category === foundProject.category && p.id !== foundProject.id)
      .slice(0, 3)

    setRelatedProjects(related)
  }, [params.id, router])

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-16 h-16 border-4 border-[#c4ff00] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 z-10" />
        <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-end pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="bg-[#c4ff00] text-black text-sm font-medium px-3 py-1 rounded inline-block mb-4">
              {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl text-gray-300 max-w-2xl">{project.description}</p>
          </motion.div>
        </div>
      </div>

      {/* Project Details */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
            <p className="text-gray-300 mb-8">
              For {project.client}, we created a{" "}
              {project.category === "web"
                ? "website"
                : project.category === "app"
                  ? "mobile application"
                  : project.category === "graphic"
                    ? "graphic design solution"
                    : project.category === "ui/ux"
                      ? "user interface design"
                      : "brand identity"}
              that addressed their specific needs and challenges. Our approach focused on delivering a solution that was
              not only visually appealing but also functional and user-friendly.
            </p>

            <p className="text-gray-300 mb-8">
              The project involved extensive research, conceptualization, design, and development phases. We worked
              closely with the client to ensure that their vision was realized while incorporating best practices and
              innovative solutions.
            </p>

            <h2 className="text-2xl font-bold mb-6">The Challenge</h2>
            <p className="text-gray-300 mb-8">
              {project.client} came to us with the challenge of{" "}
              {project.category === "web"
                ? "creating a web platform that would enhance their online presence and improve user engagement."
                : project.category === "app"
                  ? "developing a mobile application that would provide value to their users while maintaining ease of use."
                  : project.category === "graphic"
                    ? "designing visual assets that would effectively communicate their brand message and appeal to their target audience."
                    : project.category === "ui/ux"
                      ? "improving the user experience of their existing digital product to increase user satisfaction and retention."
                      : "establishing a cohesive brand identity that would resonate with their audience and differentiate them from competitors."}
            </p>

            <h2 className="text-2xl font-bold mb-6">Our Solution</h2>
            <p className="text-gray-300 mb-8">
              We implemented a{" "}
              {project.category === "web"
                ? "responsive web design with intuitive navigation and engaging content."
                : project.category === "app"
                  ? "user-centered mobile application with a clean interface and smooth functionality."
                  : project.category === "graphic"
                    ? "visually striking design that effectively communicated the client's message."
                    : project.category === "ui/ux"
                      ? "streamlined user interface with improved information architecture and interaction design."
                      : "comprehensive brand identity system with consistent visual elements across all touchpoints."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
              <div className="bg-[#1e1e1e] rounded-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2080"
                  alt="Project Detail"
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="bg-[#1e1e1e] rounded-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2080"
                  alt="Project Detail"
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-6">The Results</h2>
            <p className="text-gray-300 mb-8">
              The project was successfully delivered in {project.year} and resulted in{" "}
              {project.category === "web"
                ? "increased website traffic, improved user engagement, and higher conversion rates."
                : project.category === "app"
                  ? "positive user feedback, increased downloads, and improved user retention."
                  : project.category === "graphic"
                    ? "enhanced brand recognition, positive audience response, and effective communication of the client's message."
                    : project.category === "ui/ux"
                      ? "improved user satisfaction, reduced bounce rates, and increased time spent on the platform."
                      : "stronger brand recognition, consistent brand messaging, and positive market reception."}
            </p>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-[#1e1e1e] rounded-xl p-6 sticky top-8">
              <h3 className="text-xl font-bold mb-6">Project Details</h3>

              <div className="mb-6">
                <h4 className="text-sm text-gray-400 mb-2">Client</h4>
                <p className="font-medium">{project.client}</p>
              </div>

              <div className="mb-6">
                <h4 className="text-sm text-gray-400 mb-2">Year</h4>
                <p className="font-medium">{project.year}</p>
              </div>

              <div className="mb-6">
                <h4 className="text-sm text-gray-400 mb-2">Category</h4>
                <p className="font-medium">{project.category.charAt(0).toUpperCase() + project.category.slice(1)}</p>
              </div>

              <div className="mb-6">
                <h4 className="text-sm text-gray-400 mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="bg-black/30 text-gray-300 text-xs px-3 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-[#c4ff00] hover:bg-[#d8ff4d] text-black font-medium text-center px-4 py-3 rounded-lg transition-colors"
                >
                  Visit Project
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8">Related Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map((relatedProject) => (
              <Link
                key={relatedProject.id}
                href={`/portfolio/${relatedProject.id}`}
                className="group relative overflow-hidden rounded-xl bg-[#1e1e1e] h-[300px]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                <Image
                  src={relatedProject.image || "/placeholder.svg"}
                  alt={relatedProject.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                  <h3 className="text-xl font-bold mb-2">{relatedProject.title}</h3>
                  <div className="bg-[#c4ff00] text-black text-xs font-medium px-2 py-1 w-fit rounded-full text-center">
                    {relatedProject.category.charAt(0).toUpperCase() + relatedProject.category.slice(1)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-[#1e1e1e] rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Let&apos;s create something amazing together</h2>
            <p className="text-gray-300 mb-8">
              Ready to start your next project? Contact us today to discuss how we can help bring your vision to life.
            </p>
            <Link
              href="/user-contact-page"
              className="bg-[#c4ff00] hover:bg-[#d8ff4d] text-black font-medium px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <AnimatedFooter />
    </div>
  )
}

