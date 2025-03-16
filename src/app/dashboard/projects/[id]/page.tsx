"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { AlertCircle } from "lucide-react"


import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"

import { ProjectEditForm } from "@/components/project-edit-form"
import { ProjectDetail } from "@/components/project-detail"
import { fetchProject, Project } from "../../../../../services/project"

export default function ProjectPage() {
  const params = useParams()
  const projectId = params.id as string

  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const loadProject = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const data = await fetchProject(projectId)
        setProject(data)
      } catch (err) {
        console.error("Error loading project:", err)
        setError(err instanceof Error ? err.message : "Failed to load project")
      } finally {
        setIsLoading(false)
      }
    }

    loadProject()
  }, [projectId])

  const handleProjectUpdate = (updatedProject: Project) => {
    setProject(updatedProject)
    setIsEditing(false)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-[500px] w-full" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="container mx-auto py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Not Found</AlertTitle>
          <AlertDescription>The requested project could not be found.</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <>
      {isEditing ? (
        <ProjectEditForm project={project} onCancel={() => setIsEditing(false)} onSave={handleProjectUpdate} />
      ) : (
        <ProjectDetail project={project} onEdit={() => setIsEditing(true)} />
      )}
    </>
  )
}

