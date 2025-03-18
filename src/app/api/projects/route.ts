import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

// Log the route being accessed for debugging
export async function GET(request: NextRequest) {
  console.log("GET /api/projects route accessed")

  const searchParams = request.nextUrl.searchParams
  const page = Number.parseInt(searchParams.get("page") || "1")
  const pageSize = Number.parseInt(searchParams.get("pageSize") || "10")
  const search = searchParams.get("search") || ""
  const statusFilters = searchParams.getAll("status")

  // Calculate pagination
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  try {
    const supabase = createRouteHandlerClient({ cookies })

    // Start building the query
    let query = supabase
      .from("projects") // This is correct - using 'projects' table
      .select("*, profiles:client_id(id, full_name, email, avatar_url, company_name)", { count: "exact" })

    // Apply search filter if provided
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
    }

    // Apply status filters if provided
    if (statusFilters.length > 0) {
      query = query.in("status", statusFilters)
    }

    // Apply pagination
    const { data, count, error } = await query.order("created_at", { ascending: false }).range(from, to)

    if (error) {
      console.error("Error fetching projects:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Calculate total pages
    const totalPages = Math.ceil((count || 0) / pageSize)

    return NextResponse.json({
      data: data || [],
      pagination: {
        page,
        pageSize,
        total: count || 0,
        totalPages,
      },
    })
  } catch (error) {
    console.error("Error in projects API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    // Check if user is authenticated
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get request body
    const body = await request.json()

    // Validate required fields
    if (!body.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    // Set default values
    const now = new Date().toISOString()
    const projectData = {
      title: body.title,
      description: body.description || null,
      client_id: body.client_id === "no_client" ? null : body.client_id,
      start_date: body.start_date || null,
      due_date: body.due_date || null,
      status: body.status || "planning",
      progress: body.progress || 0,
      is_public: body.is_public || false,
      created_at: now,
      updated_at: now,
    }

    console.log("Creating project with data:", projectData)

    // Insert new project
    const { data, error } = await supabase
      .from("projects") // This is correct - using 'projects' table
      .insert(projectData)
      .select("*, profiles:client_id(id, full_name, email, avatar_url, company_name)")
      .single()

    if (error) {
      console.error("Error creating project:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error("Error in projects API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    // Check if user is authenticated
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Only admins can delete projects
    const { data: userProfile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

    if (!userProfile || userProfile.role !== "admin") {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    // Get project ID from request body
    let projectId
    try {
      const body = await request.json()
      projectId = body.id
    } catch {
      // If body parsing fails, try to get ID from URL
      const url = new URL(request.url)
      const pathParts = url.pathname.split("/")
      projectId = pathParts[pathParts.length - 1]
    }

    if (!projectId) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 })
    }

    // Delete project
    const { error } = await supabase
      .from("projects") // This is correct - using 'projects' table
      .delete()
      .eq("id", projectId)

    if (error) {
      console.error("Error deleting project:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in projects API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

