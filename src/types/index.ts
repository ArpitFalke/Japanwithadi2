export type UserRole = 'student' | 'admin' | 'moderator'
export type ScholarshipLevel = 'undergraduate' | 'masters' | 'phd' | 'kosen' | 'stc' | 'language' | 'research'
export type ScholarshipCategory = 'mext' | 'jasso' | 'kosen' | 'university' | 'private' | 'exchange' | 'language' | 'stc'
export type FundingType = 'fully_funded' | 'partial' | 'tuition_only' | 'stipend_only'
export type ApplicationStatus = 'saved' | 'preparing' | 'submitted' | 'under_review' | 'accepted' | 'rejected' | 'waitlisted'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: UserRole
  nationality?: string
  education_level?: ScholarshipLevel
  japanese_level?: string
  english_level?: string
  target_program?: string
  gpa?: number
  birth_year?: number
  created_at: string
}

export interface Scholarship {
  id: string
  scholarship_name: string
  provider: string
  category: ScholarshipCategory
  level: ScholarshipLevel[]
  scholarship_type: string
  funding_type: FundingType
  stipend?: string
  stipend_amount?: number
  tuition_covered: boolean
  age_min?: number
  age_max?: number
  eligibility: string
  nationality: string[]
  japanese_requirement?: string
  english_requirement?: string
  application_deadline?: string
  exam_subjects?: string[]
  interview_required: boolean
  duration?: string
  university?: string[]
  field_of_study?: string[]
  application_route?: string
  official_link?: string
  tags: string[]
  description: string
  benefits: string[]
  documents_required?: string[]
  created_at: string
  updated_at: string
  is_active: boolean
  views?: number
  saves?: number
}

export interface SavedScholarship {
  user_id: string
  scholarship_id: string
  created_at: string
  scholarship?: Scholarship
}

export interface Application {
  id: string
  user_id: string
  scholarship_id: string
  status: ApplicationStatus
  notes?: string
  submitted_documents?: string[]
  deadline_reminder?: boolean
  created_at: string
  updated_at: string
  scholarship?: Scholarship
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface AiChatHistory {
  id: string
  user_id: string
  messages: ChatMessage[]
  title?: string
  created_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  seo_title?: string
  seo_description?: string
  thumbnail?: string
  author_id: string
  tags: string[]
  category: string
  published: boolean
  views?: number
  created_at: string
  updated_at: string
  author?: User
}

export interface Comment {
  id: string
  user_id: string
  post_id: string
  content: string
  created_at: string
  user?: User
}

export interface Webinar {
  id: string
  title: string
  description?: string
  speaker: string
  speaker_bio?: string
  date: string
  duration_minutes?: number
  thumbnail?: string
  registration_link?: string
  youtube_link?: string
  is_live: boolean
  created_at: string
}

export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type: 'deadline' | 'recommendation' | 'webinar' | 'system' | 'application'
  read_status: boolean
  link?: string
  created_at: string
}

export interface SearchFilters {
  query?: string
  category?: ScholarshipCategory[]
  level?: ScholarshipLevel[]
  funding_type?: FundingType[]
  japanese_required?: boolean
  nationality?: string[]
  field?: string[]
  deadline_before?: string
  stipend_min?: number
  page?: number
  limit?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export interface SearchFilters {
  query?: string
  category?: ScholarshipCategory[]
  level?: ScholarshipLevel[]
  funding_type?: FundingType[]
  japanese_required?: boolean
  nationality?: string[]
  field?: string[]
  deadline_before?: string
  stipend_min?: number
  page?: number
  limit?: number
  per_page?: number
  sort?: 'recent' | 'deadline' | 'stipend' | 'popular'
}
export interface AnalyticsData {
  total_users: number
  total_scholarships: number
  total_applications: number
  total_saves: number
  monthly_signups: { month: string; count: number }[]
  top_scholarships: { name: string; saves: number }[]
  category_distribution: { category: string; count: number }[]
}
