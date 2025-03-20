"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Filter, PlusCircle, Edit, FileText, Trash2 } from "lucide-react"
import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useToast } from "@/hooks/use-toast"
import { Client, fetchClients } from "@/app/api/clients/route"

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const loadClients = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Fetch clients from the database
        const clientsData = await fetchClients()

        // For each client, fetch their project count
        const clientsWithProjects = await Promise.all(
          clientsData.map(async (client) => {
            const { count } = await supabase
              .from("projects")
              .select("*", { count: "exact", head: true })
              .eq("client_id", client.id)

            return {
              ...client,
              projectsCount: count || 0,
            }
          }),
        )

        setClients(clientsWithProjects)
      } catch (err) {
        console.error("Error loading clients:", err)
        setError("Failed to load clients. Please try again.")
        toast({
          title: "Error",
          description: "Failed to load clients. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadClients()
  }, [supabase, toast])



  // Function to format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString()
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c4ff00]"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-lg">
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="mt-2 text-sm underline">
          Try again
        </button>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clients</h1>

        <div className="flex items-center gap-3">
          <button className="bg-[#1e1e1e] hover:bg-[#252525] text-white px-3 py-1.5 rounded-lg transition-colors text-sm flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>

          <button className="bg-[#c4ff00] hover:bg-[#d8ff4d] text-black font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            <span>Add Client</span>
          </button>
        </div>
      </div>

      {clients.length === 0 ? (
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-8 text-center">
          <p className="text-gray-400">No clients found. Add your first client to get started.</p>
        </div>
      ) : (
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Client</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Email</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Company</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Projects</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Joined Date</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id} className="border-b border-gray-800 hover:bg-[#1e1e1e]">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-800">
                          {client.avatar_url ? (
                            <Image
                              src={client.avatar_url || "/placeholder.svg"}
                              alt={client.full_name || "Client"}
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                              {(client.full_name || "?")[0].toUpperCase()}
                            </div>
                          )}
                        </div>
                        <span>{client.full_name || "Unnamed Client"}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-400">{client.email || "No email"}</td>
                    <td className="py-3 px-4 text-gray-400">{client.company_name || "N/A"}</td>
                    <td className="py-3 px-4">{client.projectsCount}</td>
                    <td className="py-3 px-4">{formatDate(client.created_at)}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button className="text-gray-400 hover:text-white transition-colors" title="Edit client">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-white transition-colors" title="View details">
                          <FileText className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-red-400 transition-colors" title="Delete client">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  )
}

