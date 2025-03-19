import { getProjectById } from "@/app/actions/project-actions"
import { ProjectForm } from "@/components/admin/project-form"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Eye } from "lucide-react"

interface ProjectEditPageProps {
  params: {
    id: string
  }
}

export default async function ProjectEditPage({ params }: ProjectEditPageProps) {
  console.log(`Rendering project edit page for ID: ${params.id}`)
  const project = await getProjectById(params.id)

  if (!project) {
    console.log(`Project not found for ID: ${params.id}`)
    notFound()
  }

  return (
    <div className="container mx-auto pb-8">
       <Link href="/dashboard/projects">
            <span className=" text-[#c4ff00] flex justify-start items-center gap-2 border-gray-800">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Projects
            </span>
          </Link>
      <div className="flex items-center justify-between my-6">
        
        <div className="flex items-center gap-4">
         
          <div>
            <h1 className="text-3xl font-bold">{project.name}</h1>
            <p className="text-gray-400 mt-1">Edit project details, timeline, and deliverables</p>
          </div>
        </div>
        <Link href={`/projects/${project.id}`} target="_blank">
          <Button  className="bg-[#c4ff00] hover:bg-[#c4ff00]/90 text-black border-gray-800" variant="outline">
            <Eye className="h-4 w-4 mr-2" /> Client View
          </Button>
        </Link>
      </div>

      <ProjectForm
        project={project}
        onSave={async (updatedProject) => {
          "use server"
          const { saveProject } = await import("@/app/actions/project-actions")
          return saveProject(updatedProject)
        }}
      />
    </div>
  )
}

