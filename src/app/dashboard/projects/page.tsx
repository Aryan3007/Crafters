"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Filter, PlusCircle, MoreHorizontal, Search, X, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { deleteProject, fetchProjects, getProjectStatusOptions, Project } from "../../../../services/project"


export default function ProjectsPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Pagination state
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  })

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Status options for filter
  const statusOptions = getProjectStatusOptions()

  // Fetch projects with pagination, search and filters
  const loadProjects = async () => {
    setLoading(true)
    setError(null)

    try {
      const statusParam = statusFilter.join(",")
      const response = await fetchProjects(pagination.page, pagination.pageSize, searchQuery, statusParam)

      setProjects(response.data)
      setPagination(response.pagination)
    } catch (err) {
      console.error("Error fetching projects:", err)
      setError(err instanceof Error ? err.message : "Failed to load projects")
    } finally {
      setLoading(false)
    }
  }

  // Initial fetch and refetch when dependencies change
  useEffect(() => {
    loadProjects()
  }, [pagination.page, pagination.pageSize])

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (pagination.page === 1) {
        loadProjects()
      } else {
        // Reset to page 1 when search changes
        setPagination((prev) => ({
          ...prev,
          page: 1,
        }))
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery, statusFilter])

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({
      ...prev,
      page: newPage,
    }))
  }

  // Handle status filter change
  const toggleStatusFilter = (status: string) => {
    setStatusFilter((prev) => {
      if (prev.includes(status)) {
        return prev.filter((s) => s !== status)
      } else {
        return [...prev, status]
      }
    })
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("")
    setStatusFilter([])

    if (pagination.page !== 1) {
      setPagination((prev) => ({
        ...prev,
        page: 1,
      }))
    } else {
      loadProjects()
    }
  }

  // Handle project deletion
  const handleDeleteProject = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        setLoading(true)
        await deleteProject(id)
        // Refresh the projects list
        loadProjects()
      } catch (err) {
        console.error("Error deleting project:", err)
        setError(err instanceof Error ? err.message : "Failed to delete project")
      } finally {
        setLoading(false)
      }
    }
  }

  // Function to get project status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "planning":
        return "bg-yellow-500/20 text-yellow-400"
      case "in_progress":
        return "bg-blue-500/20 text-blue-400"
      case "review":
        return "bg-orange-500/20 text-orange-400"
      case "completed":
        return "bg-green-500/20 text-green-400"
      case "on_hold":
        return "bg-purple-500/20 text-purple-400"
      case "cancelled":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  // Calculate the range of projects being displayed
  const startIndex = projects.length > 0 ? (pagination.page - 1) * pagination.pageSize + 1 : 0
  const endIndex = Math.min(startIndex + projects.length - 1, pagination.total)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="pb-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64 md:w-72">
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-[#1e1e1e] border-gray-800 focus:border-[#c4ff00] focus:ring-[#c4ff00]/20"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-[#1e1e1e] hover:bg-[#252525] border-gray-800 text-white px-3 py-1.5 rounded-lg transition-colors text-sm flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                  {statusFilter.length > 0 && (
                    <Badge className="ml-1 bg-[#c4ff00] text-black font-medium text-xs">{statusFilter.length}</Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#1e1e1e] border border-gray-800 text-white">
                <div className="px-2 py-1.5 text-xs font-medium text-gray-400">Status</div>
                {statusOptions.map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status.value}
                    checked={statusFilter.includes(status.value)}
                    onCheckedChange={() => toggleStatusFilter(status.value)}
                    className="capitalize"
                  >
                    {status.label}
                  </DropdownMenuCheckboxItem>
                ))}
                {statusFilter.length > 0 && (
                  <div className="px-2 py-1.5 border-t border-gray-800 mt-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="w-full text-xs justify-start px-2 text-gray-400 hover:text-white"
                    >
                      Clear all filters
                    </Button>
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              className="bg-[#c4ff00] hover:bg-[#d8ff4d] text-black font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              onClick={() => router.push("/dashboard/projects/new")}
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Project</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#c4ff00] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-gray-400">Loading projects...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-red-400">{error}</p>
            <Button variant="outline" onClick={loadProjects} className="mt-4 border-gray-800 hover:border-[#c4ff00]">
              Try Again
            </Button>
          </div>
        ) : projects.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-400">
              {searchQuery || statusFilter.length > 0 ? "No projects match your search criteria" : "No projects found"}
            </p>
            {(searchQuery || statusFilter.length > 0) && (
              <Button variant="outline" onClick={clearFilters} className="mt-4 border-gray-800 hover:border-[#c4ff00]">
                Clear Filters
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Project</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Client</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Progress</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Due Date</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b border-gray-800 hover:bg-[#1e1e1e]">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium capitalize">{project.title}</p>
                        <p className="text-xs text-gray-400 line-clamp-1">
                          {project.description ? project.description.split(" ").slice(0, 3).join(" ") : ""}{project.description && project.description.split(" ").length > 30 ? "..." : ""}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <Image
                            src={project.profiles?.avatar_url || "/placeholder.svg?height=40&width=40"}
                            alt={project.profiles?.full_name || "Client"}
                            width={32}
                            height={32}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm">{project.profiles?.full_name || "N/A"}</p>
                          <p className="text-xs text-gray-400">{project.profiles?.email || ""}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusColor(project.status)}`}>
                        {project.status.replace("_", " ")}
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
                    <td className="py-3 px-4 text-sm">
                      {project.due_date ? new Date(project.due_date).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="text-gray-400 hover:text-white transition-colors">
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-[#1e1e1e] border border-gray-800 text-white">
                          <DropdownMenuItem onClick={() => router.push(`/dashboard/projects/${project.id}`)}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => router.push(`/dashboard/projects/${project.id}/edit`)}>
                            Edit Project
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-400" onClick={() => handleDeleteProject(project.id)}>
                            Delete Project
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && projects.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              Showing {startIndex} to {endIndex} of {pagination.total} projects
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="h-8 w-8 p-0 border-gray-800"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    // Show first page, last page, current page, and pages around current page
                    return page === 1 || page === pagination.totalPages || Math.abs(page - pagination.page) <= 1
                  })
                  .map((page, index, array) => {
                    // Add ellipsis if there are gaps
                    const showEllipsis = index > 0 && page - array[index - 1] > 1

                    return (
                      <div key={page} className="flex items-center">
                        {showEllipsis && <span className="px-2 text-gray-400">...</span>}
                        <Button
                          variant={pagination.page === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className={`h-8 w-8 p-0 ${pagination.page === page ? "bg-[#c4ff00] text-black hover:bg-[#d8ff4d]" : "border-gray-800"
                            }`}
                        >
                          {page}
                        </Button>
                      </div>
                    )
                  })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="h-8 w-8 p-0 border-gray-800"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

