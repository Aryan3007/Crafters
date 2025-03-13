"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Filter, PlusCircle, MoreHorizontal } from 'lucide-react'
import { useState, useEffect } from "react"

// Define project status types
type ProjectStatus = "planning" | "design" | "development" | "review" | "completed"

// Define project interface
interface Project {
  id: number
  title: string
  description: string
  status: ProjectStatus
  progress: number
  startDate: string
  dueDate: string
  client: {
    name: string
    email: string
    avatar: string
  }
  teamMembers: {
    name: string
    role: string
    avatar: string
  }[]
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    // This would normally fetch from an API
    setProjects([
      {
        id: 1,
        title: "E-Commerce Website",
        description: "A fully responsive e-commerce platform with advanced filtering and cart functionality.",
        status: "development",
        progress: 65,
        startDate: "2023-09-15",
        dueDate: "2023-11-30",
        client: {
          name: "John Smith",
          email: "john@example.com",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        teamMembers: [
          {
            name: "Alex Johnson",
            role: "Project Manager",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Sarah Lee",
            role: "UI/UX Designer",
            avatar: "/placeholder.svg?height=40&width=40",
          },
        ],
      },
      {
        id: 2,
        title: "Corporate Branding",
        description: "Complete brand identity redesign including logo, color palette, and brand guidelines.",
        status: "review",
        progress: 90,
        startDate: "2023-08-10",
        dueDate: "2023-10-30",
        client: {
          name: "Sarah Johnson",
          email: "sarah@example.com",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        teamMembers: [
          {
            name: "Emily Wilson",
            role: "Brand Strategist",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "David Garcia",
            role: "Graphic Designer",
            avatar: "/placeholder.svg?height=40&width=40",
          },
        ],
      },
      {
        id: 3,
        title: "Mobile App Development",
        description: "iOS and Android fitness tracking application with workout plans and progress tracking.",
        status: "planning",
        progress: 15,
        startDate: "2023-10-01",
        dueDate: "2024-02-28",
        client: {
          name: "Michael Brown",
          email: "michael@example.com",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        teamMembers: [
          {
            name: "Ryan Thompson",
            role: "Project Manager",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Sophia Kim",
            role: "UI/UX Designer",
            avatar: "/placeholder.svg?height=40&width=40",
          },
        ],
      },
    ])
  }, [])

  // Function to get project status color
  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case "planning":
        return "bg-yellow-500/20 text-yellow-400"
      case "design":
        return "bg-purple-500/20 text-purple-400"
      case "development":
        return "bg-blue-500/20 text-blue-400"
      case "review":
        return "bg-orange-500/20 text-orange-400"
      case "completed":
        return "bg-green-500/20 text-green-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>

        <div className="flex items-center gap-3">
          <button className="bg-[#1e1e1e] hover:bg-[#252525] text-white px-3 py-1.5 rounded-lg transition-colors text-sm flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>

          <button className="bg-[#c4ff00] hover:bg-[#d8ff4d] text-black font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>
      </div>

      <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Project</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Client</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Progress</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Due Date</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Team</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-gray-800 hover:bg-[#1e1e1e]">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium">{project.title}</p>
                      <p className="text-xs text-gray-400 line-clamp-1">{project.description}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <Image
                          src={project.client.avatar || "/placeholder.svg"}
                          alt={project.client.name}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm">{project.client.name}</p>
                        <p className="text-xs text-gray-400">{project.client.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusColor(project.status)}`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>{project.progress}%</span>
                      </div>
                      <div className="h-1.5 w-24 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-[#c4ff00]" style={{ width: `${project.progress}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">{new Date(project.dueDate).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <div className="flex -space-x-2">
                      {project.teamMembers.map((member, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#0a0a0a]"
                        >
                          <Image
                            src={member.avatar || "/placeholder.svg"}
                            alt={member.name}
                            width={32}
                            height={32}
                            className="object-cover"
                            title={`${member.name} - ${member.role}`}
                          />
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  )
}
