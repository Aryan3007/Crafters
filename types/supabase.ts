export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          name: string
          description: string | null
          client: string | null
          type: string | null
          status: string
          start_date: string | null
          due_date: string | null
          progress: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          description?: string | null
          client?: string | null
          type?: string | null
          status: string
          start_date?: string | null
          due_date?: string | null
          progress?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          client?: string | null
          type?: string | null
          status?: string
          start_date?: string | null
          due_date?: string | null
          progress?: number
          created_at?: string
          updated_at?: string
        }
      }
      project_phases: {
        Row: {
          id: string
          project_id: string
          name: string
          status: string
          description: string | null
          completed_date: string | null
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          project_id: string
          name: string
          status: string
          description?: string | null
          completed_date?: string | null
          order_index: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          name?: string
          status?: string
          description?: string | null
          completed_date?: string | null
          order_index?: number
          created_at?: string
          updated_at?: string
        }
      }
      deliverables: {
        Row: {
          id: string
          phase_id: string
          name: string
          type: string
          url: string | null
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          phase_id: string
          name: string
          type: string
          url?: string | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          phase_id?: string
          name?: string
          type?: string
          url?: string | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

