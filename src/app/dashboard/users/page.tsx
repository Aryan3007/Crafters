"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Filter, Edit, Shield, UserIcon, Users } from "lucide-react"
import Image from "next/image"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

interface User {
  id: string
  email: string
  role: "admin" | "client" | "user"
  full_name: string | null
  avatar_url: string | null
  created_at: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingUser, setEditingUser] = useState<string | null>(null)
  const [selectedRole, setSelectedRole] = useState<"admin" | "client" | "user">("user")
  const [savingRole, setSavingRole] = useState(false)

  const supabase = createClientComponentClient()

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true)

        // Get all users from the profiles table
        const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })
console.log(data);
        if (error) throw error

        setUsers(data as User[])
      } catch (err) {
        console.error("Error fetching users:", err)
        setError("Failed to load users")
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [supabase])

  const handleEditRole = (user: User) => {
    setEditingUser(user.id)
    setSelectedRole(user.role)
  }

  const handleSaveRole = async () => {
    if (!editingUser) return

    try {
      setSavingRole(true)

      const response = await fetch(`/api/users/${editingUser}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: selectedRole }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update role")
      }

      // Update the user in the local state
      setUsers(users.map((user) => (user.id === editingUser ? { ...user, role: selectedRole } : user)))

      // Reset editing state
      setEditingUser(null)
    } catch (err) {
      console.error("Error updating role:", err)
      setError(err instanceof Error ? err.message : "Failed to update role")
    } finally {
      setSavingRole(false)
    }
  }

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-500/20 text-red-400"
      case "client":
        return "bg-blue-500/20 text-blue-400"
      case "user":
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="w-4 h-4" />
      case "client":
        return <Users className="w-4 h-4" />
      case "user":
      default:
        return <UserIcon className="w-4 h-4" />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#c4ff00] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
        <p className="text-red-400">{error}</p>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>

        <div className="flex items-center gap-3">
          <button className="bg-[#1e1e1e] hover:bg-[#252525] text-white px-3 py-1.5 rounded-lg transition-colors text-sm flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-medium mb-4">Users</h2>
        <p className="text-gray-400 mb-6">Manage user roles and permissions.</p>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">User</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Email</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Role</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Joined</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-800 hover:bg-[#1e1e1e]">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-800">
                        <Image
                          src={
                            user.avatar_url ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name || "User")}&background=c4ff00&color=000&size=128`
                          }
                          alt={user.full_name || "User"}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <span>{user.full_name || "Unnamed User"}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-400">{user.email}</td>
                  <td className="py-4 px-4">
                    {editingUser === user.id ? (
                      <div className="flex items-center gap-2">
                        <select
                          value={selectedRole}
                          onChange={(e) => setSelectedRole(e.target.value as "admin" | "client" | "user")}
                          className="bg-[#1e1e1e] border border-gray-700 rounded-lg px-2 py-1 text-white text-sm"
                        >
                          <option value="user">User</option>
                          <option value="client">Client</option>
                          <option value="admin">Admin</option>
                        </select>
                        <button
                          onClick={handleSaveRole}
                          disabled={savingRole}
                          className="bg-[#c4ff00] hover:bg-[#d8ff4d] text-black px-2 py-1 rounded-lg text-sm transition-colors"
                        >
                          {savingRole ? "..." : "Save"}
                        </button>
                        <button
                          onClick={() => setEditingUser(null)}
                          className="bg-[#1e1e1e] hover:bg-[#252525] text-white px-2 py-1 rounded-lg text-sm transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <span
                        className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full capitalize ${getRoleBadgeClass(user.role)}`}
                      >
                        {getRoleIcon(user.role)}
                        {user.role}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-sm">{new Date(user.created_at).toLocaleDateString()}</td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditRole(user)}
                        className="bg-[#1e1e1e] hover:bg-[#252525] text-white p-2 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
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

