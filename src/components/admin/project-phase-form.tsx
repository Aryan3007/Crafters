"use client"

import { useState } from "react"
import type { ProjectPhase, Deliverable, PhaseStatus, DeliverableType } from "./../../../types/project"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown, ChevronUp, ExternalLink, File, Plus, Trash, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProjectPhaseFormProps {
  phase: ProjectPhase
  onUpdate: (phase: ProjectPhase) => void
  onDelete: () => void
}

export function ProjectPhaseForm({ phase, onUpdate, onDelete }: ProjectPhaseFormProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isAddingDeliverable, setIsAddingDeliverable] = useState(false)
  const [newDeliverable, setNewDeliverable] = useState<Partial<Deliverable>>({
    name: "",
    type: "Document",
    url: "",
    description: "",
  })

  const handleChange = (field: keyof ProjectPhase, value: any) => {
    onUpdate({ ...phase, [field]: value })
  }

  const handleDeliverableChange = (index: number, field: keyof Deliverable, value: any) => {
    const updatedDeliverables = [...phase.deliverables]
    updatedDeliverables[index] = {
      ...updatedDeliverables[index],
      [field]: value,
    }
    handleChange("deliverables", updatedDeliverables)
  }

  const handleDeliverableDelete = (index: number) => {
    const updatedDeliverables = phase.deliverables.filter((_, i) => i !== index)
    handleChange("deliverables", updatedDeliverables)
  }

  const addDeliverable = () => {
    if (!newDeliverable.name) return

    const deliverable: Deliverable = {
      id: `del-${Date.now()}`,
      name: newDeliverable.name || "",
      type: (newDeliverable.type as DeliverableType) || "Document",
      url: newDeliverable.url,
      description: newDeliverable.description,
    }

    handleChange("deliverables", [...phase.deliverables, deliverable])
    setNewDeliverable({
      name: "",
      type: "Document",
      url: "",
      description: "",
    })
    setIsAddingDeliverable(false)
  }

  const statusOptions: PhaseStatus[] = ["Not Started", "In Progress", "Completed", "On Hold"]
  const deliverableTypes: DeliverableType[] = ["Document", "Design", "Code", "Other"]

  const getStatusColor = (status: PhaseStatus) => {
    switch (status) {
      case "Completed":
        return "bg-green-500"
      case "In Progress":
        return "bg-blue-500"
      case "On Hold":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card className="border border-gray-800">
      <CardHeader className="p-4 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(phase.status)}`}></div>
            <div className="font-medium">{phase.name}</div>
            <Badge variant="outline" className="ml-2">
              {phase.status}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">
              {phase.deliverables.length} deliverable{phase.deliverables.length !== 1 ? "s" : ""}
            </span>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </div>
      </CardHeader>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CardContent className="p-4 pt-0 border-t border-gray-800">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Phase Name</label>
                  <Input value={phase.name} onChange={(e) => handleChange("name", e.target.value)} />
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Status</label>
                  <Select
                    value={phase.status}
                    onValueChange={(value) => {
                      handleChange("status", value)
                      if (value === "Completed" && !phase.completedDate) {
                        handleChange("completedDate", new Date().toISOString().split("T")[0])
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm text-gray-400 mb-1 block">Description</label>
                <Textarea
                  value={phase.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="resize-none"
                  rows={2}
                />
              </div>

              {phase.status === "Completed" && (
                <div className="mb-4">
                  <label className="text-sm text-gray-400 mb-1 block">Completion Date</label>
                  <Input
                    type="date"
                    value={phase.completedDate || ""}
                    onChange={(e) => handleChange("completedDate", e.target.value)}
                  />
                </div>
              )}

              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Deliverables</h4>
                  <Button type="button" variant="outline" size="sm" onClick={() => setIsAddingDeliverable(true)}>
                    <Plus className="h-3 w-3 mr-1" /> Add
                  </Button>
                </div>

                <AnimatePresence>
                  {isAddingDeliverable && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mb-4 p-3 border border-dashed border-gray-700 rounded-md"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="text-sm font-medium">New Deliverable</h5>
                        <Button type="button" variant="ghost" size="sm" onClick={() => setIsAddingDeliverable(false)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid gap-3">
                        <div>
                          <Input
                            placeholder="Deliverable name"
                            value={newDeliverable.name || ""}
                            onChange={(e) => setNewDeliverable({ ...newDeliverable, name: e.target.value })}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <Select
                            value={newDeliverable.type || "Document"}
                            onValueChange={(value) =>
                              setNewDeliverable({ ...newDeliverable, type: value as DeliverableType })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                              {deliverableTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <Input
                            placeholder="URL (optional)"
                            value={newDeliverable.url || ""}
                            onChange={(e) => setNewDeliverable({ ...newDeliverable, url: e.target.value })}
                          />
                        </div>

                        <Textarea
                          placeholder="Description (optional)"
                          value={newDeliverable.description || ""}
                          onChange={(e) => setNewDeliverable({ ...newDeliverable, description: e.target.value })}
                          className="resize-none"
                          rows={2}
                        />

                        <Button type="button" onClick={addDeliverable} disabled={!newDeliverable.name}>
                          Add Deliverable
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {phase.deliverables.length === 0 ? (
                  <div className="text-center py-6 text-gray-500 bg-gray-900/50 rounded-md border border-dashed border-gray-700">
                    No deliverables added yet
                  </div>
                ) : (
                  <div className="space-y-2">
                    {phase.deliverables.map((deliverable, index) => (
                      <div
                        key={deliverable.id}
                        className="p-3 bg-gray-900/50 rounded-md border border-gray-800 flex flex-col gap-2"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <File className="h-4 w-4 text-gray-400" />
                              <span className="font-medium">{deliverable.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {deliverable.type}
                              </Badge>
                            </div>
                            {deliverable.description && (
                              <p className="text-sm text-gray-400 mt-1">{deliverable.description}</p>
                            )}
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeliverableDelete(index)}
                          >
                            <Trash className="h-4 w-4 text-gray-400" />
                          </Button>
                        </div>

                        {deliverable.url && (
                          <div className="flex items-center gap-2 mt-1">
                            <Input
                              value={deliverable.url}
                              onChange={(e) => handleDeliverableChange(index, "url", e.target.value)}
                              className="flex-1"
                            />
                            <a
                              href={deliverable.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-md hover:bg-gray-800"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex justify-end">
              <Button type="button" variant="destructive" size="sm" onClick={onDelete}>
                <Trash className="h-4 w-4 mr-2" /> Delete Phase
              </Button>
            </CardFooter>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

