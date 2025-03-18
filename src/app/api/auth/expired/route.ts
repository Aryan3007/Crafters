import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const error = requestUrl.searchParams.get("error")
  const errorCode = requestUrl.searchParams.get("error_code")
  const errorDescription = requestUrl.searchParams.get("error_description")

  // Redirect to login with appropriate error message
  let redirectUrl = "/login?error="

  if (errorCode === "otp_expired") {
    redirectUrl += encodeURIComponent("Email verification link has expired. Please request a new one.")
  } else {
    redirectUrl += encodeURIComponent(errorDescription || error || "Authentication error")
  }

  return NextResponse.redirect(new URL(redirectUrl, requestUrl.origin))
}

