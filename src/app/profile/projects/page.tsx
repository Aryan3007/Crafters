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
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { getClientProjects } from "@/app/actions/client-actions"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Button } from "@/components/ui/button"
import Link from "next/link"
// Define project status types
type ProjectStatus = "planning" | "design" | "development" | "review" | "completed" | "Not Started" | "In Progress"

// Define project stage interface
interface ProjectStage {
  name: string
  status: "completed" | "in-progress" | "pending"
  deliverables?: {
    name: string
    link: string
    type: "figma" | "github" | "preview" | "document" | "Document"
  }[]
  completedAt?: string
  notes?: string
}

// Define project interface
interface Project {
  id: string
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

// Define API response interface based on the screenshot
interface ApiProject {
  client: string
  created_at: string
  description: string
  due_date: string
  id: string
  name: string
  phases: {
    created_at: string
    deliverables: {
      created_at: string
      description: string
      id: string
      name: string
      phase_id: string
      type: string
      updated_at: string
      url: string
    }[]
    description: string
    id: string
    name: string
    order_index: number
    project_id: string
    status: string
    updated_at: string
  }[]
  progress: number
  start_date: string
  status: string
  type: string
  updated_at: string
}

export default function ProjectsPage() {
  const [userRole, setUserRole] = useState<"client" | "admin">("client")
  const [userId, setuserId] = useState("")
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const supabase = createClientComponentClient()
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  useEffect(() => {
    async function getUser() {
      // Get the user profile data
      const { data: userData, error: userError } = await supabase.auth.getUser()

      if (userError || !userData.user) {
        console.error("Error fetching user:", userError)
        return
      }
      setuserId(userData.user.id)

      // Determine user role
      if (userData.user.email?.endsWith("@creativestudio.com")) {
        setUserRole("admin")
      } else {
        setUserRole("client")
      }
    }

    getUser()
  }, [supabase.auth]) // Only run on component mount

  useEffect(() => {
    async function fetchProjects() {
      if (!userId) return // Prevent fetching if userId is not yet set
      try {
        const apiProjects = await getClientProjects(userId)
        console.log("Fetched projects:", apiProjects)

        // Transform API projects to the format expected by the UI
        const transformedProjects = apiProjects.map((apiProject: ApiProject) => {
          // Map phases to stages
          const stages = apiProject.phases.map((phase) => {
            // Map deliverables
            const deliverables =
              phase.deliverables?.map((deliverable) => ({
                name: deliverable.name,
                link: deliverable.url,
                type: deliverable.type.toLowerCase() as "figma" | "github" | "preview" | "document" | "Document",
              })) || []

            // Determine stage status
            let status: "completed" | "in-progress" | "pending" = "pending"
            if (phase.status === "Completed") {
              status = "completed"
            } else if (phase.status === "In Progress") {
              status = "in-progress"
            }

            return {
              name: phase.name,
              status,
              deliverables,
              completedAt: status === "completed" ? phase.updated_at : undefined,
              notes: phase.description,
            }
          })

          // Map project status to UI status
          let uiStatus: ProjectStatus = "planning"
          if (apiProject.status === "Not Started") {
            uiStatus = "planning"
          } else if (apiProject.status === "In Progress") {
            uiStatus = "development"
          } else if (apiProject.status === "Completed") {
            uiStatus = "completed"
          }

          return {
            id: apiProject.id,
            title: apiProject.name,
            description: apiProject.description,
            status: uiStatus,
            progress: apiProject.progress || 0,
            startDate: apiProject.start_date,
            dueDate: apiProject.due_date,
            stages,
            teamMembers: [], // No team members in the API response
          }
        })

        setProjects(transformedProjects)
      } catch (error) {
        console.error("Error fetching projects:", error)
      }
    }

    fetchProjects()
  }, [userId]) // Re-run when userId changes

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
      case "Not Started":
        return <Clock className="w-5 h-5 text-yellow-400" />
      case "In Progress":
        return <FileText className="w-5 h-5 text-blue-400" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  // Function to render icon based on deliverable type
  const getDeliverableIcon = (type: string) => {
    switch (type.toLowerCase()) {
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
      case "document":
      case "Document":
        return <FileText className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  // Get the selected project
  const currentProject = selectedProject
    ? projects.find((p) => p.id === selectedProject)
    : projects.length > 0
      ? projects[0]
      : null

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6 mb-6">

        <div className="relative">
          {/* Swiper Carousel */}
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1} // Default for small screens
            breakpoints={{
              768: { slidesPerView: 2 }, // 2 projects on medium screens
              1024: { slidesPerView: 3 }, // 3 projects on large screens
            }}
            pagination={{ clickable: true }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
          >
            {projects.map((project) => (
              <SwiperSlide key={project.id}>
                <div
                  className={`bg-[#1e1e1e] rounded-lg p-4 hover:bg-[#252525] transition-colors cursor-pointer border-2 ${selectedProject === project.id ? "border-[#c4ff00]" : "border-transparent"
                    }`}
                  onClick={() => setSelectedProject(project.id)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium capitalize">{project.title}</h4>
                    <div className="flex items-center gap-2">
                      {getProjectStatusIcon(project.status)}
                      <span className="text-xs px-2 py-1 rounded-full capitalize bg-gray-800">{project.status}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 mb-3 capitalize line-clamp-2">{project.description}</p>

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
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button
            ref={prevRef}
            className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 z-10 bg-[#c4ff00] text-black p-2 rounded-full hover:bg-gray-700 transition"
            aria-label="Previous Project"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            ref={nextRef}
            className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 z-10 bg-[#c4ff00] text-black p-2 rounded-full hover:bg-gray-700 transition"
            aria-label="Next Project"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Project Details */}
      {currentProject && (
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                {getProjectStatusIcon(currentProject.status)}
                <h3 className="text-xl capitalize font-medium">{currentProject.title}</h3>
                <span className="text-xs px-2 py-1 rounded-full capitalize bg-gray-800">{currentProject.status}</span>
              </div>
              <p className="text-gray-400 capitalize">{currentProject.description}</p>
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
                      className={`absolute left-6 top-10 w-0.5 h-[calc(100%-24px)] ${stage.status === "completed" ? "bg-[#c4ff00]" : "bg-gray-800"
                        }`}
                    ></div>
                  )}

                  <div className="flex gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${stage.status === "completed"
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
                        <h5 className="font-medium capitalize">{stage.name}</h5>
                        <span className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusColor(stage.status)}`}>
                          {stage.status.replace("-", " ")}
                        </span>
                      </div>

                      {stage.notes && <p className="text-sm text-gray-400 capitalize mb-3">{stage.notes}</p>}

                      {stage.completedAt && (
                        <div className="flex items-center text-xs text-gray-400 mb-3">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>Completed: {new Date(stage.completedAt).toLocaleDateString()}</span>
                        </div>
                      )}

                      {stage.deliverables && stage.deliverables.length > 0 && (
                        <div className="bg-[#1e1e1e] rounded-lg p-3 space-y-2">
                          <p className="text-xs text-gray-400">Deliverables:</p>
                          {stage.deliverables.map((deliverable, dIndex) => {
                            // Ensure the link is absolute by adding "https://" if missing
                            const validLink = deliverable.link.startsWith("http") ? deliverable.link : `https://${deliverable.link}`;

                            return (
                              <a
                                key={dIndex}
                                href={validLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-[#c4ff00] hover:text-[#d8ff4d] transition-colors"
                              >
                                {getDeliverableIcon(deliverable.type)}
                                <span>{deliverable.name}</span>
                                <ExternalLink className="w-3 h-3 ml-auto" />
                              </a>
                            );
                          })}
                        </div>
                      )}

                    </div>
                  </div>
                </div>
              ))}
               <div className="text-center">
                    <Link href="/contact">
                      <Button className="text-black" size="lg">Contact Us About This Project</Button>
                    </Link>
                  </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

