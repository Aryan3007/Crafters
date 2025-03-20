// Project Types
export type ProjectStatus = "Not Started" | "In Progress" | "Completed" | "On Hold";
export type PhaseStatus = "Not Started" | "In Progress" | "Completed" | "On Hold";
export type DeliverableType = "Document" | "Design" | "Code" | "Other";

export interface Deliverable {
  id: string;
  phase_id: string;
  name: string;
  type: DeliverableType;
  url?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProjectPhase {
  id: string;
  project_id: string;
  name: string;
  status: PhaseStatus;
  description: string;
  completed_date?: string;
  order_index: number;
  deliverables: Deliverable[];
  created_at?: string;
  updated_at?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  client: string;
  type: string;
  status: ProjectStatus;
  start_date: string;
  due_date: string;
  progress: number;
  phases: ProjectPhase[];
  user_id: string; // Added user_id
  created_at?: string;
  updated_at?: string;
  // Handle both camelCase and snake_case
  startDate?: string;
  dueDate?: string;
}

// Database Types
export interface DbDeliverable {
  id: string;
  phase_id: string;
  name: string;
  type: DeliverableType;
  url: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbProjectPhase {
  id: string;
  project_id: string;
  name: string;
  status: PhaseStatus;
  description: string | null;
  completed_date: string | null;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface DbProject {
  id: string;
  name: string;
  description: string | null;
  client: string | null;
  type: string | null;
  status: ProjectStatus;
  start_date: string | null;
  due_date: string | null;
  progress: number;
  user_id: string; // Added user_id
  created_at: string;
  updated_at: string;
}
