import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const error = requestUrl.searchParams.get("error")
  const errorCode = requestUrl.searchParams.get("error_code")
  const errorDescription = requestUrl.searchParams.get("error_description")

  // For debugging
  console.log("Auth callback received:", {
    url: request.url,
    code: code ? "present" : "missing",
    error,
    errorCode,
    errorDescription,
  })

  // Handle error cases
  if (error) {
    let redirectUrl = "/login?error="

    if (errorCode === "otp_expired") {
      redirectUrl += encodeURIComponent("Email verification link has expired. Please request a new one.")
      return NextResponse.redirect(new URL(redirectUrl, requestUrl.origin))
    } else {
      redirectUrl += encodeURIComponent(errorDescription || error)
      return NextResponse.redirect(new URL(redirectUrl, requestUrl.origin))
    }
  }

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    try {
      console.log("Exchanging code for session...")
      const { error: sessionError } = await supabase.auth.exchangeCodeForSession(code)

      if (sessionError) {
        console.error("Session exchange error:", sessionError)
        return NextResponse.redirect(
          new URL(`/login?error=${encodeURIComponent(sessionError.message)}`, requestUrl.origin),
        )
      }

      console.log("Session exchange successful")

      // Get the current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError) {
        console.error("Error getting user:", userError)
        return NextResponse.redirect(
          new URL(`/login?error=${encodeURIComponent(userError.message)}`, requestUrl.origin),
        )
      }

      if (!user) {
        console.error("No user found after session exchange")
        return NextResponse.redirect(new URL("/login?error=User not found", requestUrl.origin))
      }

      console.log("User found:", { id: user.id, email: user.email })

      // Get the user's profile to determine their role
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single()

      if (profileError) {
        console.log("Profile error:", profileError)

        // Try to create the profile if it doesn't exist
        if (profileError.code === "PGRST116") {
          console.log("Profile not found, creating new profile")

          // Determine role based on email
          const isAdmin = user.email?.endsWith("@creativestudio.com") || false

          // Create profile
          const { error: insertError } = await supabase.from("profiles").insert({
            id: user.id,
            email: user.email,
            full_name: user.user_metadata.full_name || user.user_metadata.name,
            avatar_url: user.user_metadata.avatar_url || user.user_metadata.picture,
            company_name: user.user_metadata.company_name,
            role: isAdmin ? "admin" : "user",
          })

          if (insertError) {
            console.error("Error creating profile:", insertError)
            return NextResponse.redirect(
              new URL(`/login?error=${encodeURIComponent("Failed to create user profile")}`, requestUrl.origin),
            )
          }

          console.log("Profile created successfully")

          // Redirect to default location for new users
          return NextResponse.redirect(new URL("/user-contact-page", requestUrl.origin))
        } else {
          // Some other error with profile fetching
          return NextResponse.redirect(
            new URL(`/login?error=${encodeURIComponent("Error fetching user profile")}`, requestUrl.origin),
          )
        }
      }

      console.log("Profile found:", profile)

      // Redirect based on role
      if (profile?.role === "admin") {
        console.log("Redirecting to admin dashboard")
        return NextResponse.redirect(new URL("/dashboard", requestUrl.origin))
      } else if (profile?.role === "client") {
        console.log("Redirecting to client profile")
        return NextResponse.redirect(new URL("/profile", requestUrl.origin))
      } else {
        // Default to user role
        console.log("Redirecting to user contact page")
        return NextResponse.redirect(new URL("/user-contact-page", requestUrl.origin))
      }
    } catch (error) {
      console.error("Unexpected error in auth callback:", error)
      return NextResponse.redirect(
        new URL("/login?error=Something went wrong during authentication", requestUrl.origin),
      )
    }
  }

  // No code provided
  console.error("No code provided in auth callback")
  return NextResponse.redirect(new URL("/login?error=No code provided", requestUrl.origin))
}

