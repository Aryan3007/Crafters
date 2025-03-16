import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    // Get project by ID
    const { data, error } = await supabase
      .from("projects")
      .select("*, profiles:client_id(id, full_name, email, avatar_url, company_name)")
      .eq("id", params.id)
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json({ error: "Project not found" }, { status: 404 })
      }

      console.error("Error fetching project:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in project API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
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

    // Update project
    const { data, error } = await supabase
      .from("projects")
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .select("*, profiles:client_id(id, full_name, email, avatar_url, company_name)")
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json({ error: "Project not found" }, { status: 404 })
      }

      console.error("Error updating project:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in project API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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

    // Delete project
    const { error } = await supabase.from("projects").delete().eq("id", params.id)

    if (error) {
      console.error("Error deleting project:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in project API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

