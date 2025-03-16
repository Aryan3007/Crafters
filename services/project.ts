import { Database } from "../types/database"

export type Project = Database["public"]["Tables"]["projects"]["Row"] & {
  profiles?: {
    id: string
    full_name: string | null
    email: string | null
    company_name: string | null
    avatar_url: string | null
  } | null
}

export type ProjectFormData = {
  title: string
  description: string | null
  client_id: string | null
  start_date: string | null
  due_date: string | null
  status: string
  progress: number
  is_public: boolean
}

export type ProjectsResponse = {
  data: Project[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

export const fetchProjects = async (page = 1, pageSize = 10, search = "", status = ""): Promise<ProjectsResponse> => {
  let url = `/api/projects?page=${page}&pageSize=${pageSize}`

  if (search) {
    url += `&search=${encodeURIComponent(search)}`
  }

  if (status) {
    const statusValues = status.split(",")
    statusValues.forEach((s) => {
      url += `&status=${encodeURIComponent(s)}`
    })
  }

  try {
    console.log("Fetching projects from:", url)

    // Add a timestamp to prevent caching
    const timestamp = new Date().getTime()
    const finalUrl = `${url}${url.includes("?") ? "&" : "?"}_t=${timestamp}`

    const response = await fetch(finalUrl)
    console.log("Response status:", response.status, response.statusText)

    // Check if response is not JSON
    const contentType = response.headers.get("content-type")
    console.log("Content-Type:", contentType)

    if (!response.ok) {
      if (response.status === 404) {
        console.error("API endpoint not found (404):", finalUrl)
        throw new Error(`API endpoint not found: ${finalUrl}`)
      }

      try {
        const errorData = await response.json()
        console.error("API error:", errorData)
        throw new Error(errorData.error || `API error: ${response.status} ${response.statusText}`)
      } catch {
        // If we can't parse the error as JSON, get the text
        const errorText = await response.text()
        console.error("API returned non-JSON error:", errorText)
        throw new Error(`API error: ${response.status} ${response.statusText}`)
      }
    }

    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text()
      console.error("API returned non-JSON response:", text)
      throw new Error(`API returned non-JSON response: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log("API response data:", data)
    return data
  } catch (error) {
    console.error("Error fetching projects:", error)
    throw error
  }
}

export const fetchProject = async (id: string): Promise<Project> => {
  const response = await fetch(`/api/projects/${id}`)

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Failed to fetch project")
  }

  return await response.json()
}

export const createProject = async (project: ProjectFormData): Promise<Project> => {
  console.log("Creating project with data:", project)

  const response = await fetch("/api/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  })

  if (!response.ok) {
    let errorMessage = "Failed to create project"
    try {
      const error = await response.json()
      errorMessage = error.error || errorMessage
    } catch {
      // If we can't parse the error as JSON, use the status text
      errorMessage = `${errorMessage}: ${response.status} ${response.statusText}`
    }
    throw new Error(errorMessage)
  }

  return await response.json()
}

export const updateProject = async (id: string, project: Partial<ProjectFormData>): Promise<Project> => {
  const response = await fetch(`/api/projects/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, ...project }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Failed to update project")
  }

  return await response.json()
}

export const deleteProject = async (id: string): Promise<void> => {
  try {
    console.log("Deleting project:", id)
    const response = await fetch(`/api/projects/${id}`, {
      method: "DELETE",
    })

    // Check if response is not JSON
    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      console.error("API returned non-JSON response:", await response.text())
      throw new Error(`API returned non-JSON response: ${response.status} ${response.statusText}`)
    }

    if (!response.ok) {
      const errorData = await response.json()
      console.error("API error:", errorData)
      throw new Error(errorData.error || `API error: ${response.status} ${response.statusText}`)
    }

    await response.json()
  } catch (error) {
    console.error("Error deleting project:", error)
    throw error
  }
}

export const getProjectStatusOptions = () => [
  { value: "planning", label: "Planning" },
  { value: "in_progress", label: "In Progress" },
  { value: "review", label: "Review" },
  { value: "completed", label: "Completed" },
  { value: "on_hold", label: "On Hold" },
  { value: "cancelled", label: "Cancelled" },
]

