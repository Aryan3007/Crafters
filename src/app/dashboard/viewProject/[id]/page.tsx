import { getProjectById } from "@/app/actions/project-actions"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"

interface ProjectPageProps {
  params: {
    id: string
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectById(params.id)
console.log(project);
  if (!project) {
    notFound()
  }

  // Sort phases by order
  const sortedPhases = [...project.phases].sort((a, b) => a.order - b.order)

  // Calculate overall progress
  const progress = project.progress

  // Format dates
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500"
      case "In Progress":
        return "bg-blue-500"
      case "On Hold":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="container mx-auto text-white pb-12 px-4">
      <Link href={"/dashboard/projects"}>
      <div className="flex justify-start gap-2 text-sm items-center">
        <ArrowLeft className="text-xs"/>
      <p>Back to Projects</p>
      </div>
      </Link>
      <div className="max-w-7xl pt-12 mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold capitalize mb-4">{project.name}</h1>
          <p className="text-xl text-gray-400 mb-6">{project.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-900/50 p-4 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Start Date</div>
              <div className="text-xl font-semibold">{project.start_date}</div>
            </div>

            <div className="bg-gray-900/50 p-4 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Due Date</div>
              <div className="text-xl font-semibold">{formatDate(project.due_date)}</div>
            </div>

            <div className="bg-gray-900/50 p-4 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Progress</div>
              <div className="flex items-center gap-3">
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
                <span className="text-xl font-semibold">{progress}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Project Timeline</h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-700"></div>

            <div className="space-y-8">
              {sortedPhases.map((phase, index) => (
                <div key={phase.id} className="relative pl-14">
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-4 top-1 w-5 h-5 rounded-full border-4 border-gray-900 ${getStatusColor(phase.status)}`}
                  ></div>

                  <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl capitalize font-semibold">{phase.name}</h3>
                        <p className="text-gray-400 mt-1">{phase.description}</p>
                      </div>
                      <Badge
                        variant={
                          phase.status === "Completed"
                            ? "success"
                            : phase.status === "In Progress"
                              ? "default"
                              : phase.status === "On Hold"
                                ? "warning"
                                : "secondary"
                        }
                      >
                        {phase.status}
                      </Badge>
                    </div>

                    {phase.completedDate && (
                      <div className="text-sm text-gray-400 mb-4">Completed on {formatDate(phase.completedDate)}</div>
                    )}

                    {phase.deliverables.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-3">Deliverables:</h4>
                        <div className="grid gap-3">
                          {phase.deliverables.map((deliverable) => (
                            <div
                              key={deliverable.id}
                              className="bg-gray-800/50 p-3 rounded-md flex items-center justify-between"
                            >
                              <div>
                                <div className="font-medium">{deliverable.name}</div>
                                {deliverable.description && (
                                  <p className="text-sm text-gray-400 mt-1">{deliverable.description}</p>
                                )}
                              </div>

                              {deliverable.url && (
  <a
    href={deliverable.url.startsWith("http") ? deliverable.url : `https://${deliverable.url}`}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm transition-colors"
  >
    <span>View</span>
    <ExternalLink className="h-3 w-3" />
  </a>
)}

                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      
      </div>
    </div>
  )
}

