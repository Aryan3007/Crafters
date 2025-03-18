import { NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  // Create a response object
  interface ResponseData {
    timestamp: string;
    url: string;
    hasCode: boolean;
    cookies: { name: string; value: string }[];
    codeExchangeAttempted?: boolean;
    codeExchangeError?: string;
    codeExchangeSuccess?: boolean;
    hasSession?: boolean;
    hasUser?: boolean;
    userId?: string;
    userEmail?: string;
    profileError?: string;
    profileErrorCode?: string;
    hasProfile?: boolean;
    userRole?: string;
    unexpectedError?: string;
  }

  const responseData: ResponseData = {
    timestamp: new Date().toISOString(),
    url: request.url,
    hasCode: Boolean(code),
    cookies: [],
  }

  // Get all cookies for debugging
  const cookieStore = await cookies()
  const allCookies = cookieStore.getAll()
  responseData.cookies = allCookies.map((c) => ({
    name: c.name,
    value: c.value.substring(0, 10) + "...", // Don't show full cookie values for security
  }))

  // If we have a code, try to exchange it
  if (code) {
    try {
    const supabase = createRouteHandlerClient({ cookies: async () => await cookieStore })

      responseData.codeExchangeAttempted = true

      const { data, error } = await supabase.auth.exchangeCodeForSession(code)

      if (error) {
        responseData.codeExchangeError = error.message
      } else {
        responseData.codeExchangeSuccess = true
        responseData.hasSession = Boolean(data.session)
        responseData.hasUser = Boolean(data.user)

        if (data.user) {
          responseData.userId = data.user.id
          responseData.userEmail = data.user.email
        }
      }

      // Try to get the user's profile
      if (data?.user?.id) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single()

        if (profileError) {
          responseData.profileError = profileError.message
          responseData.profileErrorCode = profileError.code
        } else {
          responseData.hasProfile = true
          responseData.userRole = profile?.role
        }
      }
    } catch (error) {
      responseData.unexpectedError = error instanceof Error ? error.message : String(error)
    }
  }

  return NextResponse.json(responseData)
}

