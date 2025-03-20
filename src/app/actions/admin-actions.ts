import { createServerAdminClient } from "../utils/supabase/server";

export async function getDashboardData() {
  try {
    const supabase = createServerAdminClient();

    // Fetch counts
    const [
      totalProjectsData,
      pendingProjectsData,
      completedProjectsData,
      totalClientsData,
      lastProjectsData,
      lastClientProfilesData,
      lastAdminProfilesData,
    ] = await Promise.all([
      supabase.from("projects").select("id", { count: "exact", head: true }),
      supabase.from("projects").select("id", { count: "exact", head: true }).eq("status", "In Progress"),
      supabase.from("projects").select("id", { count: "exact", head: true }).eq("status", "Completed"),
      supabase.from("profiles").select("id", { count: "exact", head: true }).eq("role", "client"),
      supabase.from("projects").select("*").order("created_at", { ascending: false }).limit(3),
      supabase.from("profiles").select("*").eq("role", "client").order("created_at", { ascending: false }).limit(3),
      supabase.from("profiles").select("*").eq("role", "admin").order("created_at", { ascending: false }).limit(3),
    ]);

    // Extract data and handle errors
    const errors = [
      totalProjectsData.error,
      pendingProjectsData.error,
      completedProjectsData.error,
      totalClientsData.error,
      lastProjectsData.error,
      lastClientProfilesData.error,
      lastAdminProfilesData.error,
    ].filter(Boolean);

    if (errors.length > 0) {
      throw new Error(`Error fetching dashboard data: ${errors.map(err => err.message).join(", ")}`);
    }

    return {
      totalProjects: totalProjectsData.count,
      pendingProjects: pendingProjectsData.count,
      completedProjects: completedProjectsData.count,
      totalClients: totalClientsData.count,
      lastProjects: lastProjectsData.data,
      lastClientProfiles: lastClientProfilesData.data,
      lastAdminProfiles: lastAdminProfilesData.data,
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return null;
  }
}
