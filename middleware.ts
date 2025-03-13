import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  // Create a Supabase client configured to use cookies
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if expired - required for Server Components
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If the user is not signed in and trying to access protected routes
  if (
    !session &&
    (req.nextUrl.pathname.startsWith("/profile") ||
      req.nextUrl.pathname.startsWith("/dashboard") ||
      req.nextUrl.pathname.startsWith("/user-contact-page"))
  ) {
    // Redirect the user to the login page
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = "/login"
    redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If the user is signed in, check their role and redirect accordingly
  if (session) {
    try {
      // Get the user's profile to check their role
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

      // Add debug logging
      console.log("Middleware - User Profile:", profile)
      console.log("Middleware - Current Path:", req.nextUrl.pathname)

      if (profile) {
        const isAdmin = profile.role === "admin"
        const isClient = profile.role === "client"
        const isUser = profile.role === "user"
        const isAccessingDashboard = req.nextUrl.pathname.startsWith("/dashboard")
        const isAccessingProfile = req.nextUrl.pathname.startsWith("/profile")
        const isAccessingUserContactPage = req.nextUrl.pathname.startsWith("/user-contact-page")

        // If admin trying to access profile or user-contact-page, redirect to dashboard
        if (isAdmin && (isAccessingProfile || isAccessingUserContactPage)) {
          console.log("Middleware - Redirecting admin to dashboard")
          const redirectUrl = req.nextUrl.clone()
          redirectUrl.pathname = "/dashboard"
          return NextResponse.redirect(redirectUrl)
        }

        // If client trying to access dashboard or user-contact-page, redirect to profile
        if (isClient && (isAccessingDashboard || isAccessingUserContactPage)) {
          console.log("Middleware - Redirecting client to profile")
          const redirectUrl = req.nextUrl.clone()
          redirectUrl.pathname = "/profile"
          return NextResponse.redirect(redirectUrl)
        }

        // If user trying to access dashboard or profile, redirect to user-contact-page
        if (isUser && (isAccessingDashboard || isAccessingProfile)) {
          console.log("Middleware - Redirecting user to user-contact-page")
          const redirectUrl = req.nextUrl.clone()
          redirectUrl.pathname = "/user-contact-page"
          return NextResponse.redirect(redirectUrl)
        }
      }
    } catch (error) {
      console.error("Middleware - Error fetching user role:", error)
    }
  }

  return res
}

// Specify the paths that should be checked by the middleware
export const config = {
  matcher: ["/profile/:path*", "/dashboard/:path*", "/user-contact-page/:path*"],
}

