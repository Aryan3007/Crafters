import DebugUserInfo from "@/components/debug-user-info";

export default function DebugPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-bold mb-6">Debug Page</h1>
      <DebugUserInfo />
    </div>
  )
}

