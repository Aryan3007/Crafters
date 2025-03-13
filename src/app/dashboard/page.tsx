"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Calendar } from 'lucide-react'
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

// Define client interface
interface Client {
  id: number
  name: string
  email: string
  avatar: string
  projectsCount: number
  status: "active" | "pending" | "inactive"
  joinedDate: string
}

export default function DashboardOverview() {
  const [projects, setProjects] = useState<Project[]>([])
  const [clients, setClients] = useState<Client[]>([])

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

    setClients([
      {
        id: 1,
        name: "John Smith",
        email: "john@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        projectsCount: 2,
        status: "active",
        joinedDate: "2023-05-15",
      },
      {
        id: 2,
        name: "Sarah Johnson",
        email: "sarah@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        projectsCount: 1,
        status: "active",
        joinedDate: "2023-06-22",
      },
      {
        id: 3,
        name: "Michael Brown",
        email: "michael@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        projectsCount: 1,
        status: "pending",
        joinedDate: "2023-09-10",
      },
      {
        id: 4,
        name: "Emily Davis",
        email: "emily@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        projectsCount: 0,
        status: "inactive",
        joinedDate: "2023-07-05",
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

  // Function to get client status color
  const getClientStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400"
      case "inactive":
        return "bg-gray-500/20 text-gray-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400">Total Projects</h3>
            <div className="bg-[#c4ff00]/10 text-[#c4ff00] text-xl font-semibold w-12 h-12 rounded-lg flex items-center justify-center">
              {projects.length}
            </div>
          </div>
          <p className="text-2xl font-semibold">{projects.length}</p>
          <p className="text-xs text-gray-500 mt-1">+2 from last month</p>
        </div>

        <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400">Active Clients</h3>
            <div className="bg-[#00c4ff]/10 text-[#00c4ff] text-xl font-semibold w-12 h-12 rounded-lg flex items-center justify-center">
              {clients.filter((c) => c.status === "active").length}
            </div>
          </div>
          <p className="text-2xl font-semibold">{clients.filter((c) => c.status === "active").length}</p>
          <p className="text-xs text-gray-500 mt-1">+1 from last month</p>
        </div>

        <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400">In Progress</h3>
            <div className="bg-[#ff00c4]/10 text-[#ff00c4] text-xl font-semibold w-12 h-12 rounded-lg flex items-center justify-center">
              {projects.filter((p) => p.status !== "completed").length}
            </div>
          </div>
          <p className="text-2xl font-semibold">{projects.filter((p) => p.status !== "completed").length}</p>
          <p className="text-xs text-gray-500 mt-1">Same as last month</p>
        </div>

        <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400">Completed</h3>
            <div className="bg-[#00ff88]/10 text-[#00ff88] text-xl font-semibold w-12 h-12 rounded-lg flex items-center justify-center">
              {projects.filter((p) => p.status === "completed").length}
            </div>
          </div>
          <p className="text-2xl font-semibold">{projects.filter((p) => p.status === "completed").length}</p>
          <p className="text-xs text-gray-500 mt-1">+1 from last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-[#0a0a0a] border border-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Recent Projects</h3>
            <Link href="/dashboard/projects" className="text-[#c4ff00] text-sm hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="bg-[#1e1e1e] rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium">{project.title}</h4>
                    <p className="text-sm text-gray-400 line-clamp-1">{project.description}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusColor(project.status)}`}
                  >
                    {project.status}
                  </span>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[#c4ff00]" style={{ width: `${project.progress}%` }}></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden">
                      <Image
                        src={project.client.avatar || "/placeholder.svg"}
                        alt={project.client.name}
                        width={24}
                        height={24}
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs text-gray-400">{project.client.name}</span>
                  </div>

                  <div className="flex items-center text-xs text-gray-400">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Recent Clients</h3>
            <Link href="/dashboard/clients" className="text-[#c4ff00] text-sm hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {clients.slice(0, 4).map((client) => (
              <div key={client.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={client.avatar || "/placeholder.svg"}
                      alt={client.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{client.name}</p>
                    <p className="text-xs text-gray-400">{client.email}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getClientStatusColor(client.status)}`}>
                  {client.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
