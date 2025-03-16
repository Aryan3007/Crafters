export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          role: "user" | "client" | "admin"
          email: string | null
          company_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          role?: "user" | "client" | "admin"
          email?: string | null
          company_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: "user" | "client" | "admin"
          email?: string | null
          company_name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string | null
          client_id: string | null
          start_date: string | null
          due_date: string | null
          status: string
          progress: number
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          client_id?: string | null
          start_date?: string | null
          due_date?: string | null
          status?: string
          progress?: number
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          client_id?: string | null
          start_date?: string | null
          due_date?: string | null
          status?: string
          progress?: number
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      projects_showcase: {
        Row: {
          id: string
          title: string
          description: string | null
          image_url: string | null
          link_url: string | null
          featured: boolean
          order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          image_url?: string | null
          link_url?: string | null
          featured?: boolean
          order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          image_url?: string | null
          link_url?: string | null
          featured?: boolean
          order?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_project_owner: {
        Args: {
          project_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type UserRole = "admin" | "client" | "user"

export interface Profile {
  id: string
  role: UserRole
  email: string | null
  full_name: string | null
  avatar_url: string | null
  company_name: string | null
  created_at: string
  updated_at: string
}

