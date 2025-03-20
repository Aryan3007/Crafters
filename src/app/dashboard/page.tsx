import Image from "next/image"
import Link from "next/link"
import { Calendar } from "lucide-react"
import { getDashboardData } from "../actions/admin-actions"

interface Project {
  id: string
  name: string
  description: string
  status: string
  progress: number
  start_date: string
  due_date: string
  client: string
  type: string
  user_id?: string
  avatar_url?: string
}

interface ClientProfile {
  avatar_url: string | null
  company_name: string | null
  created_at: string
  email: string
  full_name: string
  id: string
  role: string
  updated_at: string
}

interface DashboardData {
  totalProjects: number
  pendingProjects: number
  completedProjects: number
  totalClients: number
  lastProjects: Project[]
  lastAdminProfiles: any[]
  lastClientProfiles: ClientProfile[]
}

export default async function DashboardOverview() {
  // Add fallback for when getDashboardData returns null
  const dashboardData: DashboardData = (await getDashboardData()) || {
    totalProjects: 0,
    pendingProjects: 0,
    completedProjects: 0,
    totalClients: 0,
    lastProjects: [],
    lastAdminProfiles: [],
    lastClientProfiles: [],
  }

  console.log(dashboardData)

  const getStatusColor = (status: string) => {
    // Convert status to lowercase for case-insensitive comparison
    const statusLower = status?.toLowerCase() || ""

    switch (statusLower) {
      case "planning":
      case "not started":
      case "pending":
        return "bg-yellow-500/20 text-yellow-400"
      case "design":
        return "bg-purple-500/20 text-purple-400"
      case "development":
      case "in progress":
        return "bg-blue-500/20 text-blue-400"
      case "review":
        return "bg-orange-500/20 text-orange-400"
      case "completed":
        return "bg-green-500/20 text-green-400"
      case "active":
        return "bg-green-500/20 text-green-400"
      case "inactive":
        return "bg-gray-500/20 text-gray-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  // Find client profile by name
  const getClientAvatar = (clientName: string) => {
    const clientProfile = dashboardData.lastClientProfiles.find((profile) => profile.full_name === clientName)
    return clientProfile?.avatar_url || "/placeholder.svg"
  }

  

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400">Total Projects</h3>
            <div className="bg-[#c4ff00]/10 text-[#c4ff00] text-xl font-semibold w-12 h-12 rounded-lg flex items-center justify-center">
              {dashboardData.totalProjects}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">+2 from last month</p>
        </div>

        <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400">Active Clients</h3>
            <div className="bg-[#00c4ff]/10 text-[#00c4ff] text-xl font-semibold w-12 h-12 rounded-lg flex items-center justify-center">
              {dashboardData.totalClients}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">+1 from last month</p>
        </div> <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400">Pending Projects</h3>
            <div className="bg-[#ff00c4]/10 text-[#ff00c4] text-xl font-semibold w-12 h-12 rounded-lg flex items-center justify-center">
              {dashboardData.pendingProjects}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">+1 from last month</p>
        </div> <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400">Completed Projects</h3>
            <div className="bg-[#cd71ff]/10 text-[#cd71ff] text-xl font-semibold w-12 h-12 rounded-lg flex items-center justify-center">
              {dashboardData.completedProjects}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">+1 from last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-[#0a0a0a] border border-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Recent Projects</h3>
            <Link href="/dashboard/projects" className="text-[#c4ff00] text-sm hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {dashboardData.lastProjects &&
              dashboardData.lastProjects.map((project) => {
                // Ensure project has all required properties with defaults
                const safeProject = {
                  id: project.id || "unknown",
                  name: project.name || "Untitled Project",
                  description: project.description || "No description",
                  status: project.status || "Not Started",
                  progress: project.progress || 0,
                  due_date: project.due_date || new Date().toISOString(),
                  client: project.client || "Unknown Client",
                }

                const clientAvatar = getClientAvatar(safeProject.client)

                return (
                  <div key={safeProject.id} className="bg-[#1e1e1e] rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium capitalize">{safeProject.name}</h4>
                        <p className="text-sm text-gray-400 line-clamp-1">{safeProject.description}</p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusColor(safeProject.status)}`}
                      >
                        {safeProject.status}
                      </span>
                    </div>
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{safeProject.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-[#c4ff00]" style={{ width: `${safeProject.progress}%` }}></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full overflow-hidden">
                          <Image
                            src={clientAvatar || "/placeholder.svg"}
                            alt={safeProject.client}
                            width={24}
                            height={24}
                            className="object-cover"
                          />
                        </div>
                        <span className="text-xs text-gray-400">{safeProject.client}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-400">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>Due: {new Date(safeProject.due_date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                )
              })}

            {(!dashboardData.lastProjects || dashboardData.lastProjects.length === 0) && (
              <div className="text-center py-8 text-gray-400">No projects found</div>
            )}
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Recent Clients</h3>
            <Link href="/dashboard/clients" className="text-[#c4ff00] text-sm hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {dashboardData.lastClientProfiles &&
              dashboardData.lastClientProfiles.slice(0, 4).map((client) => (
                <div key={client.id} className="flex items-center justify-between bg-[#1e1e1e] rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    {client.avatar_url ? (
                      <Image
                        src={client.avatar_url}
                        alt={client.full_name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 flex items-center justify-center bg-gray-500 text-white rounded-full">
                        {client.full_name?.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div>
                      <h4 className="font-medium">{client.full_name}</h4>
                      <p className="text-xs text-gray-400">{client.email}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor("active")}`}>{client.role}</span>
                </div>
              ))}

            {(!dashboardData.lastClientProfiles || dashboardData.lastClientProfiles.length === 0) && (
              <div className="text-center py-8 text-gray-400">No clients found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

