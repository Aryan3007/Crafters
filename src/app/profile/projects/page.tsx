"use client"

import { motion } from "framer-motion"
import {
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  ExternalLink,
  AlertTriangle,
  CheckSquare,
  Briefcase,
} from "lucide-react"
import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

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
  stages: ProjectStage[]
  teamMembers: {
    name: string
    role: string
    avatar: string
  }[]
}

export default function ProjectsPage() {
  const [userRole, setUserRole] = useState<"client" | "admin">("client")
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function getUser() {
      // Get the user profile data
      const { data: userData, error: userError } = await supabase.auth.getUser()

      if (userError || !userData.user) {
        console.error("Error fetching user:", userError)
        return
      }

      // In a real application, you would fetch the user's role from your database
      if (userData.user.email?.endsWith("@creativestudio.com")) {
        setUserRole("admin")
      } else {
        setUserRole("client")
      }
    }

    getUser()

    // This would normally fetch from an API
    const projectsData = [
      {
        id: 1,
        title: "E-Commerce Website",
        description:
          "A fully responsive e-commerce platform with advanced filtering, cart functionality, and secure payment processing.",
        status: "development" as ProjectStatus,
        progress: 65,
        startDate: "2023-09-15",
        dueDate: "2023-11-30",
        stages: [
          {
            name: "Project Planning",
            status: "completed" as "completed" | "in-progress" | "pending",
            completedAt: "2023-09-20",
            deliverables: [
              {
                name: "Project Brief",
                link: "https://docs.google.com/document/d/123",
                type: "document" as "figma" | "github" | "preview" | "document",
              },
              {
                name: "Timeline",
                link: "https://docs.google.com/spreadsheets/d/456",
                type: "document" as "figma" | "github" | "preview" | "document",
              },
            ],
            notes: "All requirements gathered and project scope defined.",
          },
          {
            name: "UI/UX Design",
            status: "completed" as "completed" | "in-progress" | "pending",
            completedAt: "2023-10-15",
            deliverables: [
              {
                name: "Wireframes",
                link: "https://figma.com/file/abc123",
                type: "figma" as "figma" | "github" | "preview" | "document",
              },
              {
                name: "UI Design",
                link: "https://figma.com/file/def456",
                type: "figma" as "figma" | "github" | "preview" | "document",
              },
            ],
            notes: "Design approved after 2 revision rounds.",
          },
          {
            name: "Frontend Development",
            status: "in-progress" as "completed" | "in-progress" | "pending",
            deliverables: [
              {
                name: "Development Preview",
                link: "https://dev-preview.example.com",
                type: "preview" as "figma" | "github" | "preview" | "document",
              },
              {
                name: "GitHub Repository",
                link: "https://github.com/example/ecommerce-frontend",
                type: "github" as "figma" | "github" | "preview" | "document",
              },
            ],
            notes: "Homepage and product listing pages completed. Working on checkout flow.",
          },
          {
            name: "Backend Development",
            status: "in-progress" as "completed" | "in-progress" | "pending",
            deliverables: [
              {
                name: "API Documentation",
                link: "https://api-docs.example.com",
                type: "document" as "figma" | "github" | "preview" | "document",
              },
            ],
            notes: "User authentication and product API endpoints completed.",
          },
          {
            name: "Testing & QA",
            status: "pending" as "completed" | "in-progress" | "pending",
            notes: "Will begin once development reaches 80% completion.",
          },
          {
            name: "Deployment",
            status: "pending" as "completed" | "in-progress" | "pending",
            notes: "Scheduled for November 25.",
          },
        ],
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
          {
            name: "Michael Chen",
            role: "Frontend Developer",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Jessica Taylor",
            role: "Backend Developer",
            avatar: "/placeholder.svg?height=40&width=40",
          },
        ],
      },
      {
        id: 2,
        title: "Corporate Branding",
        description:
          "Complete brand identity redesign including logo, color palette, typography, and brand guidelines.",
        status: "review" as ProjectStatus,
        progress: 90,
        startDate: "2023-08-10",
        dueDate: "2023-10-30",
        stages: [
          {
            name: "Discovery & Research",
            status: "completed" as "completed" | "in-progress" | "pending",
            completedAt: "2023-08-20",
            deliverables: [
              {
                name: "Research Document",
                link: "https://docs.google.com/document/d/789",
                type: "document" as "figma" | "github" | "preview" | "document",
              },
            ],
            notes: "Completed market research and competitor analysis.",
          },
          {
            name: "Logo Design",
            status: "completed" as "completed" | "in-progress" | "pending",
            completedAt: "2023-09-15",
            deliverables: [
              {
                name: "Logo Concepts",
                link: "https://figma.com/file/ghi789",
                type: "figma" as "figma" | "github" | "preview" | "document",
              },
              {
                name: "Final Logo",
                link: "https://figma.com/file/jkl012",
                type: "figma" as "figma" | "github" | "preview" | "document",
              },
            ],
            notes: "Final logo approved after 3 revision rounds.",
          },
          {
            name: "Brand Guidelines",
            status: "completed" as "completed" | "in-progress" | "pending",
            completedAt: "2023-10-10",
            deliverables: [
              {
                name: "Brand Guidelines Draft",
                link: "https://figma.com/file/mno345",
                type: "figma" as "figma" | "github" | "preview" | "document",
              },
            ],
            notes: "Typography, color palette, and usage guidelines defined.",
          },
          {
            name: "Marketing Materials",
            status: "in-progress" as "completed" | "in-progress" | "pending",
            deliverables: [
              {
                name: "Business Cards",
                link: "https://figma.com/file/pqr678",
                type: "figma" as "figma" | "github" | "preview" | "document",
              },
              {
                name: "Letterhead",
                link: "https://figma.com/file/stu901",
                type: "figma" as "figma" | "github" | "preview" | "document",
              },
            ],
            notes: "Business cards and letterhead designs in final review.",
          },
          {
            name: "Brand Guide Delivery",
            status: "pending" as "completed" | "in-progress" | "pending",
            notes: "Final package to be delivered by October 30.",
          },
        ],
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
          {
            name: "Olivia Martinez",
            role: "Creative Director",
            avatar: "/placeholder.svg?height=40&width=40",
          },
        ],
      },
      {
        id: 3,
        title: "Mobile App Development",
        description:
          "iOS and Android fitness tracking application with workout plans, progress tracking, and social features.",
        status: "planning" as ProjectStatus,
        progress: 15,
        startDate: "2023-10-01",
        dueDate: "2024-02-28",
        stages: [
          {
            name: "Requirements Gathering",
            status: "completed" as "completed" | "in-progress" | "pending",
            completedAt: "2023-10-15",
            deliverables: [
              {
                name: "Requirements Document",
                link: "https://docs.google.com/document/d/246",
                type: "document" as "figma" | "github" | "preview" | "document",
              },
            ],
            notes: "All functional and non-functional requirements documented.",
          },
          {
            name: "UI/UX Design",
            status: "in-progress" as "completed" | "in-progress" | "pending",
            deliverables: [
              {
                name: "Wireframes",
                link: "https://figma.com/file/vwx135",
                type: "figma" as "figma" | "github" | "preview" | "document",
              },
            ],
            notes: "Working on initial wireframes and user flow.",
          },
          {
            name: "Frontend Development",
            status: "pending" as "completed" | "in-progress" | "pending",
            notes: "Will begin after design approval.",
          },
          {
            name: "Backend Development",
            status: "pending" as "completed" | "in-progress" | "pending",
            notes: "API planning in progress.",
          },
          {
            name: "Testing",
            status: "pending" as "completed" | "in-progress" | "pending",
            notes: "Test plan being developed.",
          },
          {
            name: "Deployment",
            status: "pending" as "completed" | "in-progress" | "pending",
            notes: "App store submission planned for February 2024.",
          },
        ],
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
          {
            name: "James Wilson",
            role: "iOS Developer",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Aiden Chen",
            role: "Android Developer",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Emma Davis",
            role: "Backend Developer",
            avatar: "/placeholder.svg?height=40&width=40",
          },
        ],
      },
    ]

    setProjects(projectsData)

    // Set the first project as selected by default when projects load
    if (projectsData.length > 0 && selectedProject === null) {
      setSelectedProject(projectsData[0].id)
    }
  }, [supabase.auth, selectedProject])

  // Function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400"
      case "in-progress":
        return "bg-blue-500/20 text-blue-400"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
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

  // Function to render icon based on deliverable type
  const getDeliverableIcon = (type: string) => {
    switch (type) {
      case "figma":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#1ABCFE">
            <path d="M8 12C8 10.9391 8.42143 9.92172 9.17157 9.17157C9.92172 8.42143 10.9391 8 12 8V12H8Z" />
            <path d="M12 8C13.0609 8 14.0783 8.42143 14.8284 9.17157C15.5786 9.92172 16 10.9391 16 12H12V8Z" />
            <path d="M12 16C10.9391 16 9.92172 15.5786 9.17157 14.8284C8.42143 14.0783 8 13.0609 8 12H12V16Z" />
            <path d="M16 12C16 13.0609 15.5786 14.0783 14.8284 14.8284C14.0783 15.5786 13.0609 16 12 16V12H16Z" />
          </svg>
        )
      case "github":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        )
      case "preview":
        return <ExternalLink className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  // Get the selected project
  const currentProject = projects.find((p) => p.id === selectedProject) || projects[0]

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium">Your Projects</h3>

          {userRole === "admin" && (
            <button className="bg-[#c4ff00] hover:bg-[#d8ff4d] text-black font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              New Project
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`bg-[#1e1e1e] rounded-lg p-4 hover:bg-[#252525] transition-colors cursor-pointer border-2 ${selectedProject === project.id ? "border-[#c4ff00]" : "border-transparent"}`}
              onClick={() => setSelectedProject(project.id)}
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium">{project.title}</h4>
                <div className="flex items-center gap-2">
                  {getProjectStatusIcon(project.status)}
                  <span className="text-xs px-2 py-1 rounded-full capitalize bg-gray-800">{project.status}</span>
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

              <div className="flex items-center text-xs text-gray-400">
                <Calendar className="w-3 h-3 mr-1" />
                <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Details */}
      {currentProject && (
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                {getProjectStatusIcon(currentProject.status)}
                <h3 className="text-xl font-medium">{currentProject.title}</h3>
                <span className="text-xs px-2 py-1 rounded-full capitalize bg-gray-800">{currentProject.status}</span>
              </div>
              <p className="text-gray-400">{currentProject.description}</p>
            </div>

            {userRole === "admin" && (
              <button className="bg-[#1e1e1e] hover:bg-[#252525] text-white px-3 py-1.5 rounded-lg transition-colors text-sm">
                Edit Project
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#1e1e1e] rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Start Date</p>
              <p className="font-medium">{new Date(currentProject.startDate).toLocaleDateString()}</p>
            </div>

            <div className="bg-[#1e1e1e] rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Due Date</p>
              <p className="font-medium">{new Date(currentProject.dueDate).toLocaleDateString()}</p>
            </div>

            <div className="bg-[#1e1e1e] rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Progress</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#c4ff00]" style={{ width: `${currentProject.progress}%` }}></div>
                </div>
                <span className="font-medium">{currentProject.progress}%</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-lg font-medium mb-4">Project Timeline</h4>

            <div className="space-y-6">
              {currentProject.stages.map((stage, index) => (
                <div key={index} className="relative">
                  {/* Vertical line connecting stages */}
                  {index < currentProject.stages.length - 1 && (
                    <div
                      className={`absolute left-6 top-10 w-0.5 h-[calc(100%-24px)] ${
                        stage.status === "completed" ? "bg-[#c4ff00]" : "bg-gray-800"
                      }`}
                    ></div>
                  )}

                  <div className="flex gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        stage.status === "completed"
                          ? "bg-[#c4ff00] text-black"
                          : stage.status === "in-progress"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-[#1e1e1e] text-gray-400"
                      }`}
                    >
                      {stage.status === "completed" ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : stage.status === "in-progress" ? (
                        <Clock className="w-6 h-6" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="font-medium">{stage.name}</h5>
                        <span className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusColor(stage.status)}`}>
                          {stage.status.replace("-", " ")}
                        </span>
                      </div>

                      {stage.notes && <p className="text-sm text-gray-400 mb-3">{stage.notes}</p>}

                      {stage.completedAt && (
                        <div className="flex items-center text-xs text-gray-400 mb-3">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>Completed: {new Date(stage.completedAt).toLocaleDateString()}</span>
                        </div>
                      )}

                      {stage.deliverables && stage.deliverables.length > 0 && (
                        <div className="bg-[#1e1e1e] rounded-lg p-3 space-y-2">
                          <p className="text-xs text-gray-400">Deliverables:</p>
                          {stage.deliverables.map((deliverable, dIndex) => (
                            <a
                              key={dIndex}
                              href={deliverable.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-[#c4ff00] hover:text-[#d8ff4d] transition-colors"
                            >
                              {getDeliverableIcon(deliverable.type)}
                              <span>{deliverable.name}</span>
                              <ExternalLink className="w-3 h-3 ml-auto" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          
        </div>
      )}
    </motion.div>
  )
}

