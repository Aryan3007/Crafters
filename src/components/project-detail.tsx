"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { Calendar, Clock, Edit2, Trash2, User, Building, Mail } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { deleteProject, Project } from "../../services/project"



interface ProjectDetailProps {
  project: Project
  onEdit: () => void
}

export function ProjectDetail({ project, onEdit }: ProjectDetailProps) {
  const router = useRouter()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planning":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "in_progress":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20"
      case "review":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      case "completed":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "on_hold":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      case "cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "planning":
        return "Planning"
      case "in_progress":
        return "In Progress"
      case "review":
        return "Review"
      case "completed":
        return "Completed"
      case "on_hold":
        return "On Hold"
      case "cancelled":
        return "Cancelled"
      default:
        return status
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteProject(project.id)
      alert("The project has been successfully deleted.")
      router.push("/dashboard/projects")
    } catch (error) {
      console.error("Error deleting project:", error)
     alert("Failed to delete the project. Please try again.")
    } finally {
      setIsDeleting(false)
      setIsDeleteDialogOpen(false)
    }
  }

  return (
    <>
      <div className="container mx-auto py-8 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{project.title}</h1>
          <div className="flex gap-1">
            <Button variant="default" className="text-black bg-[#c4ff00]" onClick={onEdit}>
              <Edit2 className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card className="bg-[#0a0a0a] border-gray-700 text-white">
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Description</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {project.description || "No description provided."}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Timeline</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Start Date</p>
                        <p className="font-medium">
                          {project.start_date ? format(new Date(project.start_date), "MMMM d, yyyy") : "Not set"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Due Date</p>
                        <p className="font-medium">
                          {project.due_date ? format(new Date(project.due_date), "MMMM d, yyyy") : "Not set"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Progress</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Badge className={getStatusColor(project.status)}>{getStatusLabel(project.status)}</Badge>
                      <span className="text-sm font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2 bg-[#c4ff00]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-[#0a0a0a] text-white border-gray-700">
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {project.profiles ? (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium">{project.profiles.full_name || "Not specified"}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Building className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Company</p>
                        <p className="font-medium">{project.profiles.company_name || "Not specified"}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{project.profiles.email || "Not specified"}</p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <p className="text-gray-500">No client assigned to this project.</p>
                )}
              </CardContent>
            </Card>

            <Card className="bg-[#0a0a0a] border-gray-700 text-white">
              <CardHeader>
                <CardTitle>Project Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Created</span>
                  <span>{format(new Date(project.created_at), "MMM d, yyyy")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Updated</span>
                  <span>{format(new Date(project.updated_at), "MMM d, yyyy")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Project ID</span>
                  <span className="font-mono text-xs">{project.id}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this project?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the project and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault()
                handleDelete()
              }}
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-600"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

