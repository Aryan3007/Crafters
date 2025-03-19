"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Project, ProjectPhase, Deliverable, ProjectStatus, PhaseStatus, DeliverableType } from "../../../types/project"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { Trash2, Plus, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { v4 as uuidv4 } from "uuid"

interface ProjectFormProps {
  project: Project
  onSave: (project: Project) => Promise<Project>
}

export function ProjectForm({ project: initialProject, onSave }: ProjectFormProps) {
  const [project, setProject] = useState<Project>(initialProject)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Project status options
  const projectStatusOptions: ProjectStatus[] = ["Not Started", "In Progress", "Completed", "On Hold"]

  // Phase status options
  const phaseStatusOptions: PhaseStatus[] = ["Not Started", "In Progress", "Completed", "On Hold"]

  // Deliverable type options
  const deliverableTypeOptions: DeliverableType[] = ["Document", "Design", "Code", "Other"]

  // Handle project field changes
  const handleProjectChange = (field: keyof Project, value: any) => {
    setProject((prev) => ({ ...prev, [field]: value }))
  }

  // Handle phase field changes
  const handlePhaseChange = (phaseIndex: number, field: keyof ProjectPhase, value: any) => {
    setProject((prev) => {
      const updatedPhases = [...prev.phases]
      updatedPhases[phaseIndex] = { ...updatedPhases[phaseIndex], [field]: value }
      return { ...prev, phases: updatedPhases }
    })
  }

  // Handle deliverable field changes
  const handleDeliverableChange = (
    phaseIndex: number,
    deliverableIndex: number,
    field: keyof Deliverable,
    value: any,
  ) => {
    setProject((prev) => {
      const updatedPhases = [...prev.phases]
      const updatedDeliverables = [...updatedPhases[phaseIndex].deliverables]
      updatedDeliverables[deliverableIndex] = {
        ...updatedDeliverables[deliverableIndex],
        [field]: value,
      }
      updatedPhases[phaseIndex] = {
        ...updatedPhases[phaseIndex],
        deliverables: updatedDeliverables,
      }
      return { ...prev, phases: updatedPhases }
    })
  }

  // Add a new phase
  const addPhase = () => {
    setProject((prev) => {
      const newPhase: ProjectPhase = {
        id: uuidv4(),
        project_id: prev.id,
        name: "",
        status: "Not Started",
        description: "",
        deliverables: [],
        order_index: prev.phases.length + 1,
      }
      return { ...prev, phases: [...prev.phases, newPhase] }
    })
  }

  // Remove a phase
  const removePhase = (phaseIndex: number) => {
    setProject((prev) => {
      const updatedPhases = prev.phases.filter((_, index) => index !== phaseIndex)
      // Update order of remaining phases
      updatedPhases.forEach((phase, index) => {
        phase.order_index = index + 1
      })
      return { ...prev, phases: updatedPhases }
    })
  }

  // Add a new deliverable to a phase
  const addDeliverable = (phaseIndex: number) => {
    setProject((prev) => {
      const updatedPhases = [...prev.phases]
      const newDeliverable: Deliverable = {
        id: uuidv4(),
        phase_id: updatedPhases[phaseIndex].id,
        name: "",
        type: "Document",
        url: "",
        description: "",
      }
      updatedPhases[phaseIndex] = {
        ...updatedPhases[phaseIndex],
        deliverables: [...updatedPhases[phaseIndex].deliverables, newDeliverable],
      }
      return { ...prev, phases: updatedPhases }
    })
  }

  // Remove a deliverable from a phase
  const removeDeliverable = (phaseIndex: number, deliverableIndex: number) => {
    setProject((prev) => {
      const updatedPhases = [...prev.phases]
      updatedPhases[phaseIndex] = {
        ...updatedPhases[phaseIndex],
        deliverables: updatedPhases[phaseIndex].deliverables.filter((_, index) => index !== deliverableIndex),
      }
      return { ...prev, phases: updatedPhases }
    })
  }

  // Calculate progress based on completed phases
  const calculateProgress = () => {
    if (project.phases.length === 0) return 0
    const completedPhases = project.phases.filter((p) => p.status === "Completed").length
    return Math.round((completedPhases / project.phases.length) * 100)
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Calculate progress
      const progress = calculateProgress()
      const updatedProject = { ...project, progress }

      // Save the project
      await onSave(updatedProject)

      toast({
        title: "Success",
        description: "Project saved successfully",
        variant: "success",
      })

      // Redirect to projects list
      router.push("/dashboard/projects")
      router.refresh()
    } catch (error) {
      console.error("Error saving project:", error)
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8">
        {/* Project Details Card */}
        <Card className="bg-[#0a0a0a] text-white border-gray-800">
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>Basic information about the project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input
                className="border-gray-800"
                  id="name"
                  value={project.name}
                  onChange={(e) => handleProjectChange("name", e.target.value)}
                  placeholder="Enter project name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Input
                 className="border-gray-800"
                  id="client"
                  value={project.client}
                  onChange={(e) => handleProjectChange("client", e.target.value)}
                  placeholder="Enter client name"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
               className="border-gray-800"
                id="description"
                value={project.description}
                onChange={(e) => handleProjectChange("description", e.target.value)}
                placeholder="Enter project description"
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Project Type</Label>
                <Input
                 className="border-gray-800"
                  id="type"
                  value={project.type}
                  onChange={(e) => handleProjectChange("type", e.target.value)}
                  placeholder="E.g., Web Development"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select  className="border-gray-800" value={project.status} onValueChange={(value) => handleProjectChange("status", value)}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectStatusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="progress">Progress</Label>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${calculateProgress()}%` }}></div>
                  </div>
                  <span>{calculateProgress()}%</span>
                </div>
                <p className="text-xs text-gray-400">Auto-calculated based on completed phases</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                 className="border-gray-800"
                  id="startDate"
                  type="date"
                  value={project.start_date}
                  onChange={(e) => handleProjectChange("start_date", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                 className="border-gray-800"
                  id="dueDate"
                  type="date"
                  value={project.due_date}
                  onChange={(e) => handleProjectChange("due_date", e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Phases Card */}
        <Card className="bg-[#0a0a0a] text-white border-gray-800">
          <CardHeader>
            <CardTitle>Project Timeline</CardTitle>
            <CardDescription>Manage project phases and deliverables</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" className="w-full">
              {project.phases.map((phase, phaseIndex) => (
                <AccordionItem key={phase.id} value={phase.id}>
                  <AccordionTrigger className="hover:no-underline bg-[#1e1e1e] px-4 hover:cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 text-sm">
                        {phase.order_index}
                      </div>
                      <div className="text-left">
                        <div className="font-medium">{phase.name || "Unnamed Phase"}</div>
                        <div className="text-xs text-gray-400">{phase.status}</div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 p-4 bg-[#0a0a0a] rounded-md">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`phase-${phaseIndex}-name`}>Phase Name</Label>
                          <Input
                           className="border-gray-800"
                            id={`phase-${phaseIndex}-name`}
                            value={phase.name}
                            onChange={(e) => handlePhaseChange(phaseIndex, "name", e.target.value)}
                            placeholder="E.g., Project Planning"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`phase-${phaseIndex}-status`}>Status</Label>
                          <Select
                          
                            value={phase.status}
                            onValueChange={(value) => handlePhaseChange(phaseIndex, "status", value)}
                          >
                            <SelectTrigger id={`phase-${phaseIndex}-status`}>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              {phaseStatusOptions.map((status) => (
                                <SelectItem key={status} value={status}>
                                  {status}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`phase-${phaseIndex}-description`}>Description</Label>
                        <Textarea
                         className="border-gray-800"
                          id={`phase-${phaseIndex}-description`}
                          value={phase.description}
                          onChange={(e) => handlePhaseChange(phaseIndex, "description", e.target.value)}
                          placeholder="Describe this phase"
                          rows={2}
                        />
                      </div>

                      {phase.status === "Completed" && (
                        <div className="space-y-2">
                          <Label htmlFor={`phase-${phaseIndex}-completedDate`}>Completion Date</Label>
                          <Input
                           className="border-gray-800"
                            id={`phase-${phaseIndex}-completedDate`}
                            type="date"
                            value={phase.completed_date || ""}
                            onChange={(e) => handlePhaseChange(phaseIndex, "completed_date", e.target.value)}
                          />
                        </div>
                      )}

                      {/* Deliverables Section */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label>Deliverables</Label>
                          <Button className="text-black" type="button" variant="outline" size="sm" onClick={() => addDeliverable(phaseIndex)}>
                            <Plus className="h-4 w-4 mr-1" /> Add Deliverable
                          </Button>
                        </div>

                        {phase.deliverables.length === 0 ? (
                          <div className="text-center py-4 text-gray-500 bg-gray-800/50 rounded-md">
                            No deliverables added yet
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {phase.deliverables.map((deliverable, deliverableIndex) => (
                              <div key={deliverable.id} className="p-3 bg-[#1e1e1e] rounded-md space-y-3">
                                <div className="flex items-center justify-between">
                                  <Label className="text-sm">Deliverable {deliverableIndex + 1}</Label>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeDeliverable(phaseIndex, deliverableIndex)}
                                    className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Remove</span>
                                  </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <div className="space-y-2">
                                    <Label htmlFor={`deliverable-${phaseIndex}-${deliverableIndex}-name`}>Name</Label>
                                    <Input
                                     className="border-gray-800"
                                      id={`deliverable-${phaseIndex}-${deliverableIndex}-name`}
                                      value={deliverable.name}
                                      onChange={(e) =>
                                        handleDeliverableChange(phaseIndex, deliverableIndex, "name", e.target.value)
                                      }
                                      placeholder="E.g., Project Brief"
                                      required
                                    />
                                  </div>

                                  <div className="space-y-2 ">
                                    <Label htmlFor={`deliverable-${phaseIndex}-${deliverableIndex}-type`}>Type</Label>
                                    <Select
                                    
                                      value={deliverable.type}
                                      onValueChange={(value) =>
                                        handleDeliverableChange(phaseIndex, deliverableIndex, "type", value)
                                      }
                                    >
                                      <SelectTrigger id={`deliverable-${phaseIndex}-${deliverableIndex}-type`}>
                                        <SelectValue placeholder="Select type" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {deliverableTypeOptions.map((type) => (
                                          <SelectItem key={type} value={type}>
                                            {type}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label
                                    htmlFor={`deliverable-${phaseIndex}-${deliverableIndex}-url`}
                                    className="flex items-center gap-1"
                                  >
                                    URL <ExternalLink className="h-3 w-3" />
                                  </Label>
                                  <Input
                                   className="border-gray-800"
                                    id={`deliverable-${phaseIndex}-${deliverableIndex}-url`}
                                    value={deliverable.url || ""}
                                    onChange={(e) =>
                                      handleDeliverableChange(phaseIndex, deliverableIndex, "url", e.target.value)
                                    }
                                    placeholder="E.g., https://docs.google.com/..."
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor={`deliverable-${phaseIndex}-${deliverableIndex}-description`}>
                                    Description (Optional)
                                  </Label>
                                  <Textarea
                                   className="border-gray-800"
                                    id={`deliverable-${phaseIndex}-${deliverableIndex}-description`}
                                    value={deliverable.description || ""}
                                    onChange={(e) =>
                                      handleDeliverableChange(
                                        phaseIndex,
                                        deliverableIndex,
                                        "description",
                                        e.target.value,
                                      )
                                    }
                                    placeholder="Brief description of this deliverable"
                                    rows={2}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex justify-end">
                        <Button  type="button" variant="destructive" size="sm" onClick={() => removePhase(phaseIndex)}>
                          <Trash2 className="h-4 w-4 mr-1" /> Remove Phase
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {project.phases.length === 0 && (
              <div className="text-center py-8 text-gray-500 bg-gray-900/50 rounded-lg">
                No phases defined for this project yet. Click &quot;Add Phase&quot; to get started.
              </div>
            )}

            <div className="mt-4">
              <Button  className="border-gray-800 text-black" type="button" variant="outline" onClick={addPhase}>
                <Plus className="h-4 w-4 mr-1" /> Add Phase
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end gap-3">
          <Button className="border-gray-800 text-black" type="button" variant="outline" onClick={() => router.push("/dashboard/projects")}>
            Cancel
          </Button>
          <Button className="border-gray-800 text-black" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Project"}
          </Button>
        </div>
      </div>
    </form>
  )
}

