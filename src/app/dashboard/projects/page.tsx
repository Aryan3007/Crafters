import Link from "next/link";
import { getProjects } from "@/app/actions/project-actions";
import { Edit, Eye, Plus, Trash2 } from "lucide-react";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-gray-400 mt-1">Manage client projects and deliverables</p>
        </div>
        <Link href="/dashboard/projects/new" className="bg-[#c4ff00] text-black px-4 py-2 rounded flex items-center gap-2">
          <Plus className="h-4 w-4" /> New Project
        </Link>
      </div>

      <div className="bg-[#0a0a0a] border border-gray-800 text-white rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold">All Projects</h2>
          <p className="text-gray-400">View and manage all your client projects</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#1e1e1e]">
              <tr>
                <th className="px-4 py-3 text-white">Project Name</th>
                <th className="px-4 py-3 text-white">Client</th>
                <th className="px-4 py-3 text-white">Type</th>
                <th className="px-4 py-3 text-white">Status</th>
                <th className="px-4 py-3 text-white">Progress</th>
                <th className="px-4 py-3 text-white">Due Date</th>
                <th className="px-4 py-3 text-white text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No projects found. Click "New Project" to create your first project.
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr className="border-t border-gray-700 hover:bg-[#1e1e1e]" key={project.id}>
                    <td className="px-4 py-3 font-medium">{project.name}</td>
                    <td className="px-4 py-3">{project.client.name}</td>
                    <td className="px-4 py-3">{project.type}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${project.status === "Completed" ? "bg-green-600" :
                          project.status === "In Progress" ? "bg-blue-600" :
                            project.status === "On Hold" ? "bg-yellow-600" : "bg-gray-600"
                        }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-700 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                        </div>
                        <span className="text-xs">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{project.due_date}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end">
                        <Link href={`/dashboard/viewProject/${project.id}`} className="text-white px-2 py-1 rounded flex items-center">
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link href={`/dashboard/projects/${project.id}`} className="text-white px-2 py-1 rounded flex items-center">
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button className="text-white px-2 py-2 rounded flex items-center">
                          <Trash2 className="h-4 w-4 text-white" />
                        </button>

                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
