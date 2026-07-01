'use client'
import PageHeader from '@/components/admin/ui/PageHeader'
import EmptyState from '@/components/admin/ui/EmptyState'
import { LayoutDashboard } from 'lucide-react'

export default function idPage() {
  return (
    <div>
      <PageHeader title="[id]" />
      <EmptyState 
        icon={LayoutDashboard} 
        title="No data yet" 
        description="We are still connecting the backend."
      />
    </div>
  )
}
