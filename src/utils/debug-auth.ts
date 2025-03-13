import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function debugUserMetadata() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    },
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session?.user) {
    return { error: "No session found" }
  }

  // Return the full user object for debugging
  return {
    id: session.user.id,
    email: session.user.email,
    raw_user_meta_data: session.user.user_metadata,
    app_metadata: session.user.app_metadata,
    created_at: session.user.created_at,
  }
}

