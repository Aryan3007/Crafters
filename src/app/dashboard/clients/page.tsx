"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Filter, PlusCircle, Edit, FileText, MoreHorizontal } from 'lucide-react'
import { useState, useEffect } from "react"

// Define client interface
interface Client {
  id: number
  name: string
  email: string
  avatar: string
  projectsCount: number
  status: "active" | "pending" | "inactive"
  joinedDate: string
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])

  useEffect(() => {
    // This would normally fetch from an API
    setClients([
      {
        id: 1,
        name: "John Smith",
        email: "john@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        projectsCount: 2,
        status: "active",
        joinedDate: "2023-05-15",
      },
      {
        id: 2,
        name: "Sarah Johnson",
        email: "sarah@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        projectsCount: 1,
        status: "active",
        joinedDate: "2023-06-22",
      },
      {
        id: 3,
        name: "Michael Brown",
        email: "michael@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        projectsCount: 1,
        status: "pending",
        joinedDate: "2023-09-10",
      },
      {
        id: 4,
        name: "Emily Davis",
        email: "emily@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        projectsCount: 0,
        status: "inactive",
        joinedDate: "2023-07-05",
      },
    ])
  }, [])

  // Function to get client status color
  const getClientStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400"
      case "inactive":
        return "bg-gray-500/20 text-gray-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
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

      <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Client</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Email</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Projects</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Joined Date</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-b border-gray-800 hover:bg-[#1e1e1e]">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={client.avatar || "/placeholder.svg"}
                          alt={client.name}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <span>{client.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-400">{client.email}</td>
                  <td className="py-3 px-4">{client.projectsCount}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${getClientStatusColor(client.status)}`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">{new Date(client.joinedDate).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <FileText className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  )
}
