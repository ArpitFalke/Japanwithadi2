import type { Metadata } from 'next'
import { AdminOverview } from '@/components/admin/AdminOverview'

export const metadata: Metadata = { title: 'Admin — Japan With Adi' }

export default function AdminPage() {
  return <AdminOverview />
}
