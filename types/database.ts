export type UserRole = "admin" | "client" | "user"

export interface Profile {
  id: string
  full_name: string | null
  avatar_url: string | null
  email: string | null
  company_name: string | null
  role: "admin" | "client" | "user"
  created_at: string
  updated_at: string
}

