import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "../types/database"

export type Client = {
  id: string
  full_name: string | null
  email: string | null
  company_name: string | null
  avatar_url: string | null
}

export const fetchClients = async (): Promise<Client[]> => {
  try {
    const supabase = createClientComponentClient<Database>()
    
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, email, company_name, avatar_url')
      .eq('role', 'client')
      .order('full_name', { ascending: true })
    
    if (error) {
      console.error('Error fetching clients:', error)
      throw new Error(error.message)
    }
    
    return data || []
  } catch (error) {
    console.error('Error in fetchClients:', error)
    throw error
  }
}
