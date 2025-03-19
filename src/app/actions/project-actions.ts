"use server"

import type { Project, ProjectPhase, Deliverable, DbProject, DbProjectPhase, DbDeliverable } from "./../../../types/project"
import { createServerAdminClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

// Helper function to convert database project to frontend project
async function mapDbProjectToProject(dbProject: DbProject): Promise<Project> {
  const supabase = createServerAdminClient()

  // Get phases for this project
  const { data: dbPhases, error: phasesError } = await supabase
    .from("project_phases")
    .select("*")
    .eq("project_id", dbProject.id)
    .order("order_index")

  if (phasesError) {
    console.error("Error fetching phases:", phasesError)
    throw new Error("Failed to fetch project phases")
  }

  // Get deliverables for all phases
  const phaseIds = dbPhases.map((phase) => phase.id)

  let dbDeliverables: DbDeliverable[] = []
  if (phaseIds.length > 0) {
    const { data: deliverables, error: deliverablesError } = await supabase
      .from("deliverables")
      .select("*")
      .in("phase_id", phaseIds)

    if (deliverablesError) {
      console.error("Error fetching deliverables:", deliverablesError)
      throw new Error("Failed to fetch deliverables")
    }

    dbDeliverables = deliverables
  }

  // Map phases with their deliverables
  const phases: ProjectPhase[] = dbPhases.map((dbPhase) => {
    const phaseDeliverables = dbDeliverables
      .filter((d) => d.phase_id === dbPhase.id)
      .map((d) => ({
        id: d.id,
        phase_id: d.phase_id,
        name: d.name,
        type: d.type,
        url: d.url || undefined,
        description: d.description || undefined,
        created_at: d.created_at,
        updated_at: d.updated_at,
      }))

    return {
      id: dbPhase.id,
      project_id: dbPhase.project_id,
      name: dbPhase.name,
      status: dbPhase.status,
      description: dbPhase.description || "",
      completed_date: dbPhase.completed_date || undefined,
      order_index: dbPhase.order_index,
      deliverables: phaseDeliverables,
      created_at: dbPhase.created_at,
      updated_at: dbPhase.updated_at,
    }
  })

  // Return the complete project
  return {
    id: dbProject.id,
    name: dbProject.name,
    description: dbProject.description || "",
    client: dbProject.client || "",
    type: dbProject.type || "",
    status: dbProject.status,
    start_date: dbProject.start_date || "",
    due_date: dbProject.due_date || "",
    progress: dbProject.progress,
    phases: phases,
    created_at: dbProject.created_at,
    updated_at: dbProject.updated_at,
  }
}

// Helper function to safely stringify error objects
function safeStringifyError(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === "object" && error !== null) {
    try {
      return JSON.stringify(error)
    } catch (e) {
      const errorObj = error as Record<string, unknown>
      // Extract common error properties
      if ("message" in errorObj) return String(errorObj.message)
      if ("code" in errorObj) return `Error code: ${errorObj.code}`
      if ("details" in errorObj) return String(errorObj.details)
    }
  }

  return String(error)
}

// Helper function to check if a string is a valid UUID
function isValidUUID(id: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(id)
}

// Helper function to find a project by name and client
async function findProjectByNameAndClient(name: string, client: string): Promise<DbProject | null> {
  try {
    const supabase = createServerAdminClient()

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("name", name)
      .eq("client", client)
      .order("created_at", { ascending: false })
      .limit(1)

    if (error) {
      console.error("Error finding project:", error)
      return null
    }

    return data && data.length > 0 ? data[0] : null
  } catch (error) {
    console.error("Error in findProjectByNameAndClient:", error)
    return null
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const supabase = createServerAdminClient()

    // Fetch all projects
    const { data: dbProjects, error } = await supabase
      .from("projects")
      .select("*")
      .order("updated_at", { ascending: false })

    if (error) {
      console.error("Error fetching projects:", error)
      throw new Error("Failed to fetch projects")
    }

    // Map each project to include its phases and deliverables
    const projects = await Promise.all(dbProjects.map((dbProject) => mapDbProjectToProject(dbProject)))

    return projects
  } catch (error) {
    console.error("Error in getProjects:", error)
    throw error
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const supabase = createServerAdminClient()

    // Fetch the project
    const { data: dbProject, error } = await supabase.from("projects").select("*").eq("id", id).single()

    if (error) {
      if (error.code === "PGRST116") {
        // Record not found
        return null
      }
      console.error("Error fetching project:", error)
      throw new Error("Failed to fetch project")
    }

    if (!dbProject) {
      return null
    }

    // Map the project with its phases and deliverables
    return await mapDbProjectToProject(dbProject)
  } catch (error) {
    console.error("Error in getProjectById:", error)
    throw error
  }
}

export async function saveProject(project: Project): Promise<Project> {
  try {
    console.log("Saving project:", JSON.stringify(project, null, 2))

    const supabase = createServerAdminClient()

    // Normalize project data to handle both camelCase and snake_case fields
    const normalizedProject = {
      ...project,
      start_date: project.start_date || project.startDate || null,
      due_date: project.due_date || project.dueDate || null,
    }

    // Prepare project data
    const projectData: Partial<DbProject> = {
      name: normalizedProject.name,
      description: normalizedProject.description || null,
      client: normalizedProject.client || null,
      type: normalizedProject.type || null,
      status: normalizedProject.status,
      start_date: normalizedProject.start_date || null,
      due_date: normalizedProject.due_date || null,
      progress: normalizedProject.progress,
    }

    let dbProjectId: string
    let isNewProject = false

    // Check if we're editing an existing project
    if (normalizedProject.id && isValidUUID(normalizedProject.id)) {
      // We have a valid UUID, try to update the existing project
      dbProjectId = normalizedProject.id
      console.log("Updating existing project with ID:", dbProjectId)

      // Check if the project exists
      const { data: existingProject, error: checkError } = await supabase
        .from("projects")
        .select("id")
        .eq("id", dbProjectId)
        .single()

      if (checkError || !existingProject) {
        // Project doesn't exist, create a new one
        isNewProject = true
        console.log("Project not found, creating new project")

        const { data: newProject, error: insertError } = await supabase.from("projects").insert(projectData).select()

        if (insertError) {
          console.error("Project insert error:", insertError)
          throw new Error(`Project insert error: ${safeStringifyError(insertError)}`)
        }

        dbProjectId = newProject[0].id
      } else {
        // Update the existing project
        const { error: updateError } = await supabase.from("projects").update(projectData).eq("id", dbProjectId)

        if (updateError) {
          console.error("Project update error:", updateError)
          throw new Error(`Project update error: ${safeStringifyError(updateError)}`)
        }
      }
    } else {
      // No valid UUID, try to find by name and client
      const existingProject = await findProjectByNameAndClient(normalizedProject.name, normalizedProject.client)

      if (existingProject) {
        // Update existing project
        dbProjectId = existingProject.id
        console.log("Updating existing project (found by name/client) with ID:", dbProjectId)

        const { error: updateError } = await supabase.from("projects").update(projectData).eq("id", dbProjectId)

        if (updateError) {
          console.error("Project update error:", updateError)
          throw new Error(`Project update error: ${safeStringifyError(updateError)}`)
        }
      } else {
        // Create new project, let Supabase generate the UUID
        isNewProject = true
        console.log("Creating new project")

        const { data: newProject, error: insertError } = await supabase.from("projects").insert(projectData).select()

        if (insertError) {
          console.error("Project insert error:", insertError)
          throw new Error(`Project insert error: ${safeStringifyError(insertError)}`)
        }

        dbProjectId = newProject[0].id
      }
    }

    // If it's not a new project, delete existing phases
    if (!isNewProject) {
      console.log("Deleting existing phases for project:", dbProjectId)
      const { error: deleteError } = await supabase.from("project_phases").delete().eq("project_id", dbProjectId)

      if (deleteError) {
        console.error("Error deleting existing phases:", deleteError)
        throw new Error(`Error deleting existing phases: ${safeStringifyError(deleteError)}`)
      }
    }

    // Process each phase
    for (const phase of normalizedProject.phases) {
      console.log("Processing phase:", phase.name)

      const phaseData: Partial<DbProjectPhase> = {
        project_id: dbProjectId,
        name: phase.name,
        status: phase.status,
        description: phase.description || null,
        completed_date: phase.completed_date || null,
        order_index: phase.order_index,
      }

      // Create new phase, let Supabase generate the UUID
      const { data: newPhase, error: insertError } = await supabase.from("project_phases").insert(phaseData).select()

      if (insertError) {
        console.error("Phase insert error:", insertError)
        throw new Error(`Phase insert error: ${safeStringifyError(insertError)}`)
      }

      const dbPhaseId = newPhase[0].id

      // Process each deliverable
      for (const deliverable of phase.deliverables) {
        console.log("Processing deliverable:", deliverable.name)

        const deliverableData: Partial<DbDeliverable> = {
          phase_id: dbPhaseId,
          name: deliverable.name,
          type: deliverable.type,
          url: deliverable.url || null,
          description: deliverable.description || null,
        }

        // Create new deliverable, let Supabase generate the UUID
        const { error: insertError } = await supabase.from("deliverables").insert(deliverableData)

        if (insertError) {
          console.error("Deliverable insert error:", insertError)
          throw new Error(`Deliverable insert error: ${safeStringifyError(insertError)}`)
        }
      }
    }

    // Revalidate paths
    revalidatePath("/dashboard/projects")
    revalidatePath(`/dashboard/projects/${dbProjectId}`)
    revalidatePath(`/projects/${dbProjectId}`)

    console.log("Project saved successfully:", dbProjectId)

    // Return the updated project
    return (await getProjectById(dbProjectId)) as Project
  } catch (error) {
    console.error("Error in saveProject:", error)
    throw new Error(`Failed to save project: ${safeStringifyError(error)}`)
  }
}

export async function deleteProject(id: string): Promise<{ success: boolean }> {
  try {
    const supabase = createServerAdminClient()

    // Check if the ID is a valid UUID
    if (!isValidUUID(id)) {
      // Try to find the project by name and client
      const existingProject = await findProjectByNameAndClient(id, "")

      if (existingProject) {
        id = existingProject.id
      } else {
        throw new Error(`Project with ID ${id} not found`)
      }
    }

    // Delete the project (cascade will delete phases and deliverables)
    const { error } = await supabase.from("projects").delete().eq("id", id)

    if (error) {
      console.error("Error deleting project:", error)
      throw new Error(`Failed to delete project: ${safeStringifyError(error)}`)
    }

    // Revalidate paths
    revalidatePath("/dashboard/projects")

    return { success: true }
  } catch (error) {
    console.error("Error in deleteProject:", error)
    throw new Error(`Failed to delete project: ${safeStringifyError(error)}`)
  }
}

// Helper function to create a new empty project
export async function createEmptyProject(): Promise<Project> {
  return {
    id: "",
    name: "",
    description: "",
    client: "",
    type: "",
    status: "Not Started",
    start_date: new Date().toISOString().split("T")[0],
    due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    progress: 0,
    phases: [],
  }
}

// Helper function to create a new empty phase
export async function createEmptyPhase(projectId: string, order: number): Promise<ProjectPhase> {
  return {
    id: "",
    project_id: projectId,
    name: "",
    status: "Not Started",
    description: "",
    deliverables: [],
    order_index: order,
  }
}

// Helper function to create a new empty deliverable
export async function createEmptyDeliverable(phaseId: string): Promise<Deliverable> {
  return {
    id: "",
    phase_id: phaseId,
    name: "",
    type: "Document",
    url: "",
    description: "",
  }
}

// Calculate project progress based on completed phases
export async function calculateProjectProgress(phases: ProjectPhase[]): Promise<number> {
  if (phases.length === 0) return 0

  const completedPhases = phases.filter((phase) => phase.status === "Completed").length
  return Math.round((completedPhases / phases.length) * 100)
}

