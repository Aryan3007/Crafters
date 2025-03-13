import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  // Check for error parameters in the URL
  const error = requestUrl.searchParams.get("error")
  const errorDescription = requestUrl.searchParams.get("error_description")

  // If there's an error in the callback, redirect to login with the error
  if (error) {
    console.error(`Auth error: ${error}`, errorDescription)
    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent(error)}&error_description=${encodeURIComponent(errorDescription || "")}`,
        request.url,
      ),
    )
  }

  if (code) {
    try {
      const cookieStore = cookies()
      const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

      // Exchange the code for a session
      const { data, error: sessionError } = await supabase.auth.exchangeCodeForSession(code)

      if (sessionError) {
        console.error("Error exchanging code for session:", sessionError)
        return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(sessionError.message)}`, request.url))
      }

      if (!data.user) {
        console.error("No user data returned from session exchange")
        return NextResponse.redirect(new URL("/login?error=no_user_data", request.url))
      }

      // Get the user's email to determine role
      const email = data.user.email

      if (!email) {
        console.error("No email found in user data")
        return NextResponse.redirect(new URL("/login?error=no_email_found", request.url))
      }

      // Create or update the user profile manually
      try {
        // First check if profile already exists
        const { data: existingProfile } = await supabase.from("profiles").select("id").eq("id", data.user.id).single()

        const isAdmin = email.endsWith("@creativestudio.com")
        const userData = {
          id: data.user.id,
          role: isAdmin ? "admin" : "user", // Default to 'user' instead of 'client'
          email: email, // Add email field
          full_name:
            data.user.user_metadata?.full_name ||
            data.user.user_metadata?.name ||
            `User ${data.user.id.substring(0, 8)}`,
          avatar_url: data.user.user_metadata?.avatar_url || data.user.user_metadata?.picture,
          updated_at: new Date().toISOString(),
        }

        let profileError

        if (existingProfile) {
          // Update existing profile
          const { error } = await supabase
            .from("profiles")
            .update({
              full_name: userData.full_name,
              avatar_url: userData.avatar_url,
              email: userData.email, // Update email field
              updated_at: userData.updated_at,
            })
            .eq("id", data.user.id)

          profileError = error
        } else {
          // Insert new profile
          const { error } = await supabase.from("profiles").insert({
            ...userData,
            created_at: new Date().toISOString(),
          })

          profileError = error
        }

        if (profileError) {
          console.error("Error managing profile:", profileError)
          // Continue anyway to avoid blocking the user
        }
      } catch (profileError) {
        console.error("Exception managing profile:", profileError)
        // Continue anyway to avoid blocking the user
      }

      // Query the profile to get the role for redirection
      const { data: profile, error: roleError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single()

      // Add debug logging
      console.log("Profile data:", profile)
      console.log("Role error:", roleError)

      if (roleError) {
        console.error("Error fetching user role:", roleError)
        // Default to profile page if we can't determine role
        return NextResponse.redirect(new URL("/profile", request.url))
      }

      // Redirect based on role
      if (profile?.role === "admin") {
        console.log("Redirecting to dashboard - user is admin")
        return NextResponse.redirect(new URL("/dashboard", request.url))
      } else if (profile?.role === "client") {
        console.log("Redirecting to profile - user is client")
        return NextResponse.redirect(new URL("/profile", request.url))
      } else {
        // User role
        console.log("Redirecting to user-contact-page - user is regular user")
        return NextResponse.redirect(new URL("/user-contact-page", request.url))
      }
    } catch (error) {
      console.error("Exception in auth callback:", error)
      return NextResponse.redirect(new URL("/login?error=server_error", request.url))
    }
  }

  // No code provided
  return NextResponse.redirect(new URL("/login?error=no_code_provided", request.url))
}

