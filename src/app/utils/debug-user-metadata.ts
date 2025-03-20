import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export async function debugUserMetadata() {
  const supabase = createClientComponentClient()

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: "No user found" }
    }

    return {
      id: user.id,
      email: user.email,
      user_metadata: user.user_metadata,
      app_metadata: user.app_metadata,
      created_at: user.created_at,
    }
  } catch (error) {
    return { error: String(error) }
  }
}

