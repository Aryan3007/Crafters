import { saveProject } from "@/app/actions/project-actions"
import { ProjectForm } from "@/components/admin/project-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import type { Project } from "@/types/project"

export default function NewProjectPage() {
  // Create an empty project template
  const emptyProject: Project = {
    id: `proj-${Date.now()}`,
    name: "",
    description: "",
    client: "",
    type: "",
    status: "Not Started",
    startDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    progress: 0,
    phases: [],
  }

  return (
    <div className="container mx-auto pb-8">
        <Link href="/dashboard/projects">
            <span className=" text-[#c4ff00] flex justify-start items-center gap-2 border-gray-800">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Projects
            </span>
          </Link>
      <div className="flex items-center gap-4 my-6">
       
        <div>
          <h1 className="text-3xl font-bold">Create New Project</h1>
          <p className="text-gray-400 mt-1">Set up a new project with timeline and deliverables</p>
        </div>
      </div>

      <ProjectForm project={emptyProject} onSave={saveProject} />
    </div>
  )
}

