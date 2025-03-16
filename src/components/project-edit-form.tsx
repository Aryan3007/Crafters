"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon, Loader2 } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Slider } from "@/components/ui/slider"
import { getProjectStatusOptions, Project, ProjectFormData, updateProject } from "../../services/project"


interface ProjectEditFormProps {
  project: Project
  onCancel: () => void
  onSave: (updatedProject: Project) => void
}

export function ProjectEditForm({ project, onCancel, onSave }: ProjectEditFormProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: project.title,
    description: project.description,
    client_id: project.client_id,
    start_date: project.start_date,
    due_date: project.due_date,
    status: project.status,
    progress: project.progress,
    is_public: project.is_public,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const statusOptions = getProjectStatusOptions()

  const handleChange = (field: keyof ProjectFormData, value: string | number | boolean | Date | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const updatedProject = await updateProject(project.id, formData)
      alert("Project updated successfully")
      onSave(updatedProject)
    } catch (error) {
      console.error("Error updating project:", error)
      alert("failed to update project")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Edit Project</h1>
        <div className="flex gap-2">
          <Button className="text-black" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button className="bg-[#c4ff00] text-black hover:bg-[#c4ff00]" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className=" bg-[#0a0a0a] border-gray-700 text-white">
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  className="border-gray-700"
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Enter project title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  className="border-gray-700"
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Enter project description"
                  rows={5}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full bg-[#c4ff00] border-gray-700 text-black justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.start_date ? format(new Date(formData.start_date), "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.start_date ? new Date(formData.start_date) : undefined}
                        onSelect={(date) => handleChange("start_date", date ? date.toISOString() : null)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full bg-[#c4ff00] border-gray-700 text-black justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.due_date ? format(new Date(formData.due_date), "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.due_date ? new Date(formData.due_date) : undefined}
                        onSelect={(date) => handleChange("due_date", date ? date.toISOString() : null)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>


        </div>
        <Card className="bg-[#0a0a0a] border-gray-700 text-white">
          <CardHeader>
            <CardTitle>Progress & Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="status">Project Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem  key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4 ">
              <div className="flex justify-between">
                <Label>Progress ({formData.progress}%)</Label>
              </div>
              <Slider
                value={[formData.progress]}
                min={0}
                max={100}
                step={5}
                onValueChange={(value) => handleChange("progress", value[0])}
              />
            </div>
          </CardContent>
        </Card>


      </div>
    </div>
  )
}

