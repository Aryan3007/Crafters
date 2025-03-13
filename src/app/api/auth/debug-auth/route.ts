import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Get the current session
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    if (sessionError) {
      return NextResponse.json({ error: sessionError.message }, { status: 400 })
    }

    if (!session) {
      return NextResponse.json({ error: "No session found" }, { status: 401 })
    }

    // Get the user's profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single()

    // Return debug information
    return NextResponse.json({
      user: {
        id: session.user.id,
        email: session.user.email,
        user_metadata: session.user.user_metadata,
        app_metadata: session.user.app_metadata,
        created_at: session.user.created_at,
      },
      profile: profile || null,
      profileError: profileError
        ? {
            message: profileError.message,
            code: profileError.code,
            details: profileError.details,
          }
        : null,
    })
  } catch (error) {
    console.error("Error in debug-auth:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

