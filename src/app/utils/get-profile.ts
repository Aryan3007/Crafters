import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export type UserRole = "admin" | "client" | "user"

export interface Profile {
  id: string
  role: UserRole
  email: string | null
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export async function getProfile() {
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
    return null
  }

  const { data } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

  return data as Profile | null
}

