/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import {

  Calendar,
  Edit,

  FileText,
  Clock,
  CheckSquare,
  AlertTriangle,
  Briefcase,
} from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Profile } from "../../../types/database"


// Define project status types
type ProjectStatus = "planning" | "design" | "development" | "review" | "completed"

// Define project stage interface
interface ProjectStage {
  name: string
  status: "completed" | "in-progress" | "pending"
  deliverables?: {
    name: string
    link: string
    type: "figma" | "github" | "preview" | "document"
  }[]
  completedAt?: string
  notes?: string
}

// Define project interface
interface Project {
  id: number
  title: string
  description: string
  status: ProjectStatus
  progress: number
  startDate: string
  dueDate: string
  stages?: ProjectStage[]
  teamMembers?: {
    name: string
    role: string
    avatar: string
  }[]
}

export default function ProfilePage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  const [error, setError] = useState<string | null>(null)


  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    async function loadProfile() {
      try {
        const { data: session } = await supabase.auth.getSession()

        if (!session.session) {
          router.push("/login")
          return
        }

        const { data, error } = await supabase.from("profiles").select("*").eq("id", session.session.user.id).single()

        if (error) {
          console.error("Error fetching profile:", error)
          setError("Failed to load profile")
        } else if (data) {
          setProfile(data as Profile)
         

          // If user role is "user", redirect to user-contact-page
          if (data.role === "user") {
            router.push("/user-contact-page")
            return
          }
        }
      } catch (err) {
        console.error("Error in profile page:", err)
        setError("An unexpected error occurred")
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [supabase, router])

  useEffect(() => {
    // This would normally fetch from an API
    setProjects([
      {
        id: 1,
        title: "E-Commerce Website",
        description:
          "A fully responsive e-commerce platform with advanced filtering, cart functionality, and secure payment processing.",
        status: "development",
        progress: 65,
        startDate: "2023-09-15",
        dueDate: "2023-11-30",
        stages: [],
        teamMembers: [],
      },
      {
        id: 2,
        title: "Corporate Branding",
        description:
          "Complete brand identity redesign including logo, color palette, typography, and brand guidelines.",
        status: "review",
        progress: 90,
        startDate: "2023-08-10",
        dueDate: "2023-10-30",
        stages: [],
        teamMembers: [],
      },
      {
        id: 3,
        title: "Mobile App Development",
        description:
          "iOS and Android fitness tracking application with workout plans, progress tracking, and social features.",
        status: "planning",
        progress: 15,
        startDate: "2023-10-01",
        dueDate: "2024-02-28",
        stages: [],
        teamMembers: [],
      },
    ])
  }, [])



  // Set the first project as selected by default when projects load
  useEffect(() => {
    if (projects.length > 0 && selectedProject === null) {
      setSelectedProject(projects[0].id)
    }
  }, [projects, selectedProject])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#c4ff00] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your profile...</p>
        </div>
      </div>
    )
  }



  // Function to get project status icon
  const getProjectStatusIcon = (status: ProjectStatus) => {
    switch (status) {
      case "planning":
        return <Clock className="w-5 h-5 text-yellow-400" />
      case "design":
        return <Briefcase className="w-5 h-5 text-purple-400" />
      case "development":
        return <FileText className="w-5 h-5 text-blue-400" />
      case "review":
        return <AlertTriangle className="w-5 h-5 text-orange-400" />
      case "completed":
        return <CheckSquare className="w-5 h-5 text-green-400" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main Content */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-gray-400">Projects</h3>
                  <div className="bg-[#c4ff00]/10 text-[#c4ff00] text-xl font-semibold w-12 h-12 rounded-lg flex items-center justify-center">
                    {projects.length}
                  </div>
                </div>
                <p className="text-2xl font-semibold">Active Projects</p>
              </div>

              <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-gray-400">In Progress</h3>
                  <div className="bg-[#00c4ff]/10 text-[#00c4ff] text-xl font-semibold w-12 h-12 rounded-lg flex items-center justify-center">
                    {projects.filter((p) => p.status === "development" || p.status === "design").length}
                  </div>
                </div>
                <p className="text-2xl font-semibold">Current Work</p>
              </div>

              <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-gray-400">Completed</h3>
                  <div className="bg-[#ff00c4]/10 text-[#ff00c4] text-xl font-semibold w-12 h-12 rounded-lg flex items-center justify-center">
                    {projects.filter((p) => p.status === "completed").length}
                  </div>
                </div>
                <p className="text-2xl font-semibold">Finished Projects</p>
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-medium mb-6">Profile Information</h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Full Name</p>
                    <p className="font-medium">{profile?.full_name || "Not set"}</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm mb-1">Email Address</p>
                    <p className="font-medium">{profile?.email}</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm mb-1">Company</p>
                    <p className="font-medium">{profile?.company_name || "Not set"}</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm mb-1">Account Created</p>
                    <p className="font-medium">{new Date(profile?.created_at || "").toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-800">
                  <Link href="/profile/settings"
                    
                    className="flex items-center gap-2 text-[#c4ff00] hover:text-[#d8ff4d] transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-medium mb-4">Recent Projects</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                  <div key={project.id} className="bg-[#1e1e1e] rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium">{project.title}</h4>
                    <div className="flex items-center gap-2">
                    {getProjectStatusIcon(project.status)}
                    <span className="text-xs px-2 py-1 rounded-full capitalize bg-gray-800">
                      {project.status}
                    </span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">{project.description}</p>

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
                    <div className="flex items-center text-xs text-gray-400">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
                    </div>

                    <button
                   
                    className="text-xs text-[#c4ff00] hover:text-[#d8ff4d] transition-colors"
                    >
                    View Details
                    </button>
                  </div>
                  </div>
                ))}

              
                </div>
                <Link href="/profile/projects"
                  className="w-fit px-4 mt-8 bg-[#1e1e1e] hover:bg-[#252525] text-white py-2 rounded-lg transition-colors block text-center col-span-full"
                >
                  View All Projects
                </Link>
            </div>
          </motion.div>
    </div>
  )
}

