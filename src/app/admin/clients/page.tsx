'use client'
import PageHeader from '@/components/admin/ui/PageHeader'
import DataTable from '@/components/admin/ui/DataTable'
import Badge from '@/components/admin/ui/Badge'
import Avatar from '@/components/admin/ui/Avatar'
import SearchInput from '@/components/admin/ui/SearchInput'
import FilterSelect from '@/components/admin/ui/FilterSelect'
import { Plus } from 'lucide-react'
import { createColumnHelper } from '@tanstack/react-table'

// MOCK DATA
const mockClients = [
  { id: '1', name: 'Sarah Jenkins', email: 'sarah.j@example.com', program: '1on1', status: 'active', startDate: '2023-10-15', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: 'Michael Chang', email: 'm.chang@example.com', program: 'group', status: 'active', startDate: '2024-01-10', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: 'Emma Watson', email: 'emma.w@example.com', program: '1on1', status: 'paused', startDate: '2023-08-22', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: '4', name: 'David Miller', email: 'davidm@example.com', program: 'course', status: 'completed', startDate: '2023-05-01', avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: '5', name: 'Olivia Parker', email: 'olivia.p@example.com', program: 'group', status: 'active', startDate: '2024-02-15', avatar: 'https://i.pravatar.cc/150?u=5' },
  { id: '6', name: 'James Wilson', email: 'j.wilson@example.com', program: '1on1', status: 'lead', startDate: '-', avatar: 'https://i.pravatar.cc/150?u=6' },
  { id: '7', name: 'Sophia Chen', email: 'schen@example.com', program: 'course', status: 'active', startDate: '2024-03-01', avatar: 'https://i.pravatar.cc/150?u=7' },
]

const columnHelper = createColumnHelper<any>()
const columns = [
  columnHelper.accessor('name', { 
    header: 'Client',
    cell: info => (
      <div className="flex items-center gap-3">
        <Avatar src={info.row.original.avatar} name={info.getValue()} size="md" />
        <span className="font-medium text-gray-900">{info.getValue()}</span>
      </div>
    )
  }),
  columnHelper.accessor('email', { header: 'Email' }),
  columnHelper.accessor('program', { 
    header: 'Program',
    cell: info => <span className="capitalize">{info.getValue()}</span>
  }),
  columnHelper.accessor('startDate', { header: 'Start Date' }),
  columnHelper.accessor('status', { 
    header: 'Status',
    cell: info => {
      const val = info.getValue()
      const variant = val === 'active' ? 'green' : val === 'paused' ? 'yellow' : val === 'completed' ? 'blue' : 'purple'
      return <Badge variant={variant}>{val.toUpperCase()}</Badge>
    }
  }),
  columnHelper.display({
    id: 'actions',
    header: '',
    cell: () => <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">View</button>
  })
]

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Clients" 
        description="Manage your active clients, leads, and past students."
        action={<button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors shadow-sm"><Plus className="w-4 h-4"/> Add Client</button>} 
      />
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <SearchInput placeholder="Search clients..." />
        <FilterSelect 
          options={[
            { label: 'Active', value: 'active' },
            { label: 'Paused', value: 'paused' },
            { label: 'Completed', value: 'completed' },
            { label: 'Lead', value: 'lead' }
          ]} 
        />
        <FilterSelect 
          options={[
            { label: '1-on-1 Coaching', value: '1on1' },
            { label: 'Group Coaching', value: 'group' },
            { label: 'Self-paced Course', value: 'course' }
          ]} 
        />
      </div>

      <DataTable 
        data={mockClients} 
        columns={columns} 
        isLoading={false} 
      />
    </div>
  )
}
