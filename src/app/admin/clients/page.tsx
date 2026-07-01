'use client'
import { useState, useMemo } from 'react'
import PageHeader from '@/components/admin/ui/PageHeader'
import DataTable from '@/components/admin/ui/DataTable'
import Badge from '@/components/admin/ui/Badge'
import Avatar from '@/components/admin/ui/Avatar'
import SearchInput from '@/components/admin/ui/SearchInput'
import FilterSelect from '@/components/admin/ui/FilterSelect'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import { createColumnHelper } from '@tanstack/react-table'
import Link from 'next/link'
import toast from 'react-hot-toast'

// INITIAL MOCK DATA
const initialClients = [
  { id: '1', name: 'Sarah Jenkins', email: 'sarah.j@example.com', program: '1on1', status: 'active', startDate: '2023-10-15', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: 'Michael Chang', email: 'm.chang@example.com', program: 'group', status: 'active', startDate: '2024-01-10', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: 'Emma Watson', email: 'emma.w@example.com', program: '1on1', status: 'paused', startDate: '2023-08-22', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: '4', name: 'David Miller', email: 'davidm@example.com', program: 'course', status: 'completed', startDate: '2023-05-01', avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: '5', name: 'Olivia Parker', email: 'olivia.p@example.com', program: 'group', status: 'active', startDate: '2024-02-15', avatar: 'https://i.pravatar.cc/150?u=5' },
  { id: '6', name: 'James Wilson', email: 'j.wilson@example.com', program: '1on1', status: 'lead', startDate: '-', avatar: 'https://i.pravatar.cc/150?u=6' },
  { id: '7', name: 'Sophia Chen', email: 'schen@example.com', program: 'course', status: 'active', startDate: '2024-03-01', avatar: 'https://i.pravatar.cc/150?u=7' },
]

export default function ClientsPage() {
  const [clients, setClients] = useState(initialClients)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [programFilter, setProgramFilter] = useState('all')

  const handleDelete = (id: string) => {
    if(confirm('Are you sure you want to delete this client?')) {
      setClients(clients.filter(c => c.id !== id))
      toast.success('Client deleted successfully')
    }
  }

  const columnHelper = createColumnHelper<any>()
  const columns = useMemo(() => [
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
      cell: (info) => (
        <div className="flex items-center gap-3">
          <button className="text-gray-400 hover:text-blue-600 transition-colors" title="Edit">
            <Edit2 className="w-4 h-4" />
          </button>
          <button 
            className="text-gray-400 hover:text-red-600 transition-colors" 
            title="Delete"
            onClick={() => handleDelete(info.row.original.id)}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    })
  ], [clients])

  const filteredClients = useMemo(() => {
    return clients.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'all' || c.status === statusFilter
      const matchesProgram = programFilter === 'all' || c.program === programFilter
      return matchesSearch && matchesStatus && matchesProgram
    })
  }, [clients, search, statusFilter, programFilter])

  return (
    <div className="space-y-6 w-full max-w-full overflow-hidden">
      <PageHeader 
        title="Clients" 
        description="Manage your active clients, leads, and past students."
        action={<Link href="/admin/clients/add" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors shadow-sm"><Plus className="w-4 h-4"/> Add Client</Link>} 
      />
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input 
            type="text"
            placeholder="Search clients..."
            className="w-full sm:max-w-xs border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select 
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="completed">Completed</option>
          <option value="lead">Lead</option>
        </select>
        <select 
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
          value={programFilter}
          onChange={(e) => setProgramFilter(e.target.value)}
        >
          <option value="all">All Programs</option>
          <option value="1on1">1-on-1 Coaching</option>
          <option value="group">Group Coaching</option>
          <option value="course">Self-paced Course</option>
        </select>
      </div>

      <div className="w-full">
        <DataTable 
          data={filteredClients} 
          columns={columns} 
          isLoading={false} 
        />
      </div>
    </div>
  )
}
