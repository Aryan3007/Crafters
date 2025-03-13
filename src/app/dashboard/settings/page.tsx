"use client"

import { motion } from "framer-motion"

export default function SettingsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6">
        <p className="text-gray-400">Settings functionality will be implemented here.</p>
      </div>
    </motion.div>
  )
}
