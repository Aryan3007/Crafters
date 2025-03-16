'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
// import { Switch } from '@/components/ui/switch'
import { Loader2, ArrowLeft, Plus, BarChart3, Calendar, Users } from 'lucide-react'
import { createProject, getProjectStatusOptions, ProjectFormData } from '../../../../../services/project'
import { fetchClients } from '../../../../../services/clients'
import { motion } from "framer-motion"


export default function NewProjectPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [clients, setClients] = useState<{ id: string; full_name: string | null; company_name?: string | null }[]>([])
    const [isLoadingClients, setIsLoadingClients] = useState(true)

    const [formData, setFormData] = useState<ProjectFormData>({
        title: '',
        description: '',
        client_id: null,
        start_date: new Date().toISOString().split('T')[0],
        due_date: null,
        status: 'planning',
        progress: 0,
        is_public: false
    })

    useEffect(() => {
        const loadClients = async () => {
            try {
                const clientsData = await fetchClients()
                setClients(clientsData)
            } catch (error) {
                console.error('Failed to load clients:', error)
                alert('Failed to load clients. Please try again.')
            } finally {
                setIsLoadingClients(false)
            }
        }

        loadClients()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name: string, value: string) => {
        // Handle the special case for client_id
        if (name === 'client_id' && value === 'no_client') {
            setFormData(prev => ({ ...prev, [name]: null }))
        } else {
            setFormData(prev => ({ ...prev, [name]: value }))
        }
    }

    //   const handleSwitchChange = (name: string, checked: boolean) => {
    //     setFormData(prev => ({ ...prev, [name]: checked }))
    //   }

    const handleSliderChange = (value: number[]) => {
        setFormData(prev => ({ ...prev, progress: value[0] }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // Create a copy of the form data for submission
            const submissionData = {
                ...formData,
                description: formData.description || "", // Ensure description is always a string

            }

            // If client_id is 'no_client', set it to null
            if (submissionData.client_id === 'no_client') {
                submissionData.client_id = null
            }

            console.log('Submitting project data:', submissionData)

            await createProject(submissionData)
            alert('Project created successfully')
            router.push('/dashboard/projects')
        } catch (error) {
            console.error('Failed to create project:', error)
            alert('Failed to create project')
        } finally {
            setIsLoading(false)
        }
    }


    // Get status badge color
    const getStatusColor = (status: string) => {
        switch (status) {
            case "planning":
                return "bg-purple-500/20 text-purple-300 border-purple-500/50"
            case "in_progress":
                return "bg-blue-500/20 text-blue-300 border-blue-500/50"
            case "review":
                return "bg-yellow-500/20 text-yellow-300 border-yellow-500/50"
            case "completed":
                return "bg-green-500/20 text-green-300 border-green-500/50"
            case "on_hold":
                return "bg-orange-500/20 text-orange-300 border-orange-500/50"
            case "cancelled":
                return "bg-red-500/20 text-red-300 border-red-500/50"
            default:
                return "bg-gray-500/20 text-gray-300 border-gray-500/50"
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="pb-8"
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <Button
                    variant="ghost"
                    className="flex items-center gap-2 hover:bg-transparent text-gray-400 hover:text-white"
                    onClick={() => router.push("/dashboard/projects")}
                >
                    <ArrowLeft size={16} />
                    Back to Projects
                </Button>

            </div>

            <Card className="bg-[#0a0a0a] border border-gray-800 text-white rounded-xl overflow-hidden">
                <CardHeader className="border-b border-gray-800">
                    <CardTitle>Project Details</CardTitle>
                    <CardDescription className="text-gray-400 pb-4">Fill in the details below to create a new project</CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6 pt-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Project Title *</Label>
                            <Input
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter project title"
                                required
                                className="bg-[#1e1e1e] w-96 border-gray-800 focus:border-[#c4ff00] focus:ring-[#c4ff00]/20"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={formData.description || ""}
                                onChange={handleChange}
                                placeholder="Enter project description"
                                rows={4}
                                className="bg-[#1e1e1e] border-gray-800 focus:border-[#c4ff00] focus:ring-[#c4ff00]/20 resize-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="client_id" className="flex items-center gap-2">
                                <Users size={16} className="text-gray-400" />
                                Client
                            </Label>
                            <Select
                                value={formData.client_id || "no_client"}
                                onValueChange={(value) => handleSelectChange("client_id", value)}
                                disabled={isLoadingClients}
                            >
                                <SelectTrigger className="bg-[#1e1e1e] border-gray-800 focus:ring-[#c4ff00]/20 focus:border-[#c4ff00]">
                                    <SelectValue placeholder="Select a client" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1e1e1e] border-gray-800">
                                    <SelectItem value="no_client">No client</SelectItem>
                                    {clients.map((client) => (
                                        <SelectItem key={client.id} value={client.id}>
                                            {client.company_name ? `${client.full_name} (${client.company_name})` : client.full_name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="start_date" className="flex items-center gap-2">
                                    <Calendar size={16} className="text-gray-400" />
                                    Start Date
                                </Label>
                                <Input
                                    id="start_date"
                                    name="start_date"
                                    type="date"
                                    value={formData.start_date || ""}
                                    onChange={handleChange}
                                    className="bg-[#1e1e1e] border-gray-800 focus:border-[#c4ff00] focus:ring-[#c4ff00]/20"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="due_date" className="flex items-center gap-2">
                                    <Calendar size={16} className="text-gray-400" />
                                    Due Date
                                </Label>
                                <Input
                                    id="due_date"
                                    name="due_date"
                                    type="date"
                                    value={formData.due_date || ""}
                                    onChange={handleChange}
                                    className="bg-[#1e1e1e] border-gray-800 focus:border-[#c4ff00] focus:ring-[#c4ff00]/20"
                                />
                            </div>
                        </div>


                        <div className='flex space-y-3 gap-4 w-full'>

                            <div className="space-y-2 flex gap-2 items-center flex-1">
                                <Label htmlFor="status" className="flex items-center gap-2">
                                    <BarChart3 size={16} className="text-gray-400" />
                                    Status
                                </Label>
                                <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                                    <SelectTrigger className="bg-[#1e1e1e] border-gray-800 focus:ring-[#c4ff00]/20 focus:border-[#c4ff00]">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#1e1e1e] text-white border-gray-800">
                                        {getProjectStatusOptions().map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className={`inline-block w-2 h-2 rounded-full ${getStatusColor(option.value).split(" ")[0]}`}
                                                    />
                                                    {option.label}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>


                            </div>
                            <div className="space-y-2 flex-1 mb-8">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="progress" className="flex items-center gap-2">
                                        <BarChart3 size={16} className="text-gray-400" />
                                        Progress ({formData.progress}%)
                                    </Label>
                                </div>
                                <Slider
                                    id="progress"
                                    value={[formData.progress]}
                                    min={0}
                                    max={100}
                                    step={5}
                                    onValueChange={handleSliderChange}
                                    className="[&>span]:bg-[#c4ff00]"
                                />

                            </div>
                        </div>




                    </CardContent>

                    <CardFooter className="flex justify-between border-t border-gray-800 py-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push("/dashboard/projects")}
                            className="border-gray-800 bg-transparent hover:bg-[#1e1e1e] hover:text-white"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="bg-[#c4ff00] hover:bg-[#d8ff4d] text-black font-medium"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create Project
                                </>
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </motion.div>
    )
}
