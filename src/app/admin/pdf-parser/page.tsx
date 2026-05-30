import type { Metadata } from 'next'
import { AdminPdfParser } from '@/components/admin/AdminPdfParser'

export const metadata: Metadata = { title: 'PDF Parser — Admin' }
export default function PdfParserPage() { return <AdminPdfParser /> }
