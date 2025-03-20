"use server"

import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs"
import type { Project, ProjectPhase, DbProject, DbDeliverable } from "./../../../types/project"

async function mapDbProjectToProject(dbProject: DbProject): Promise<Project> {
    const supabase = createPagesBrowserClient()

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


export async function getClientProjects(userId: string): Promise<Project[]> {
    try {
        const supabase = createPagesBrowserClient();

        // Fetch projects where the user is the owner
        const { data: dbProjects, error } = await supabase
            .from("projects")
            .select("*")
            .eq("user_id", userId) // Correctly filter by user_id
            .order("updated_at", { ascending: false });

        if (error) {
            console.error("Error fetching client projects:", error);
            throw new Error("Failed to fetch projects");
        }

        // Map each project to include its phases and deliverables
        const projects = await Promise.all(dbProjects.map((dbProject) => mapDbProjectToProject(dbProject)));

        console.log("Fetched client projects:", projects);
        return projects;
    } catch (error) {
        console.error("Error in getClientProjects:", error);
        throw error;
    }
}



export async function getClientData(userId) {
  try {
    const supabase = createPagesBrowserClient();

    // 1️⃣ Fetch total number of Active projects for this user
    const { count: activeProjects, error: activeProjectsError } = await supabase
      .from("projects")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("status", "Active");

    // 2️⃣ Fetch total number of Pending projects for this user
    const { count: pendingProjects, error: pendingProjectsError } = await supabase
      .from("projects")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("status", "Pending");

    // 3️⃣ Fetch total number of Completed projects for this user
    const { count: completedProjects, error: completedProjectsError } = await supabase
      .from("projects")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("status", "Completed");

    // 4️⃣ Fetch last 3 projects created by this user
    const { data: lastProjects, error: lastProjectsError } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(3);

    // Error handling
    if (activeProjectsError || pendingProjectsError || completedProjectsError || lastProjectsError) {
      throw new Error("Error fetching client data");
    }

    return {
      activeProjects,
      pendingProjects,
      completedProjects,
      lastProjects,
    };
  } catch (error) {
    console.error("Error fetching client data:", error);
    return null;
  }
}
