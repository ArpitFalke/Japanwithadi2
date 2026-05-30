import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(date))
}

export function formatRelativeDate(date: string | Date) {
  const d = new Date(date)
  const now = new Date()
  const diffMs = d.getTime() - now.getTime()
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))
  if (diffDays < 0) return 'Expired'
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Tomorrow'
  if (diffDays <= 7) return `${diffDays} days left`
  if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks left`
  return `${Math.ceil(diffDays / 30)} months left`
}

export function getDaysUntil(date: string) {
  const d = new Date(date)
  const now = new Date()
  return Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

export function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function truncate(text: string, length: number) {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '...'
}

export function formatStipend(amount: number) {
  return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(amount)
}

export const SCHOLARSHIP_CATEGORIES = [
  { value: 'mext', label: 'MEXT', jp: '文部科学省', icon: '🏛️' },
  { value: 'jasso', label: 'JASSO', jp: '日本学生支援機構', icon: '🎓' },
  { value: 'kosen', label: 'KOSEN', jp: '高等専門学校', icon: '⚙️' },
  { value: 'university', label: 'University', jp: '大学独自', icon: '🏫' },
  { value: 'private', label: 'Private Foundation', jp: '民間財団', icon: '🏢' },
  { value: 'exchange', label: 'Exchange Program', jp: '交換留学', icon: '🌐' },
  { value: 'language', label: 'Language Program', jp: '日本語教育', icon: '🗣️' },
  { value: 'stc', label: 'STC', jp: '専修学校', icon: '📚' },
] as const

export const EDUCATION_LEVELS = [
  { value: 'undergraduate', label: 'Undergraduate' },
  { value: 'masters', label: "Master's" },
  { value: 'phd', label: 'PhD' },
  { value: 'kosen', label: 'KOSEN (Technical)' },
  { value: 'stc', label: 'Specialized Training' },
  { value: 'language', label: 'Language Study' },
  { value: 'research', label: 'Research' },
] as const

export const JAPANESE_LEVELS = ['None', 'N5', 'N4', 'N3', 'N2', 'N1', 'Native'] as const
export function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'applied':
      return 'text-blue-600'
    case 'accepted':
      return 'text-green-600'
    case 'rejected':
      return 'text-red-600'
    case 'pending':
      return 'text-yellow-600'
    default:
      return 'text-gray-600'
  }
}

export function daysUntilDeadline(date: string) {
  return getDaysUntil(date)
}

export function getCategoryColor(category: string) {
  switch (category.toLowerCase()) {
    case 'mext':
      return 'bg-blue-100 text-blue-800'
    case 'jasso':
      return 'bg-green-100 text-green-800'
    case 'kosen':
      return 'bg-purple-100 text-purple-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export function getCategoryLabel(category: string) {
  const found = SCHOLARSHIP_CATEGORIES.find(
    c => c.value.toLowerCase() === category.toLowerCase()
  )
  return found?.label || category
}
