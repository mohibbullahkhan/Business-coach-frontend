'use client'
import PageHeader from '@/components/admin/ui/PageHeader'
import DataTable from '@/components/admin/ui/DataTable'
import Badge from '@/components/admin/ui/Badge'
import { FileText, Plus, Edit2, Globe } from 'lucide-react'
import { createColumnHelper } from '@tanstack/react-table'

const mockPosts = [
  { id: 1, title: '5 Ways to Improve Your Money Mindset', category: 'Mindset', status: 'published', date: '2026-06-28', views: 1245 },
  { id: 2, title: 'How to Build an Emergency Fund', category: 'Budgeting', status: 'published', date: '2026-06-15', views: 892 },
  { id: 3, title: 'Understanding Index Funds', category: 'Investing', status: 'draft', date: '-', views: 0 },
  { id: 4, title: 'Debt Snowball vs Avalanche', category: 'Debt', status: 'scheduled', date: '2026-07-10', views: 0 },
]

const columnHelper = createColumnHelper<any>()
const columns = [
  columnHelper.accessor('title', { header: 'Title', cell: info => <span className="font-medium text-gray-900">{info.getValue()}</span> }),
  columnHelper.accessor('category', { header: 'Category' }),
  columnHelper.accessor('status', { 
    header: 'Status',
    cell: info => {
      const v = info.getValue()
      return <Badge variant={v === 'published' ? 'green' : v === 'scheduled' ? 'blue' : 'gray'}>{v.toUpperCase()}</Badge>
    }
  }),
  columnHelper.accessor('date', { header: 'Date' }),
  columnHelper.accessor('views', { header: 'Views' }),
  columnHelper.display({
    id: 'actions',
    header: '',
    cell: () => (
      <div className="flex items-center gap-3">
        <button className="text-gray-400 hover:text-blue-600"><Edit2 className="w-4 h-4" /></button>
        <button className="text-gray-400 hover:text-green-600"><Globe className="w-4 h-4" /></button>
      </div>
    )
  })
]

export default function ContentPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Content Management" 
        description="Manage your blog posts, resources, and articles."
        action={<button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"><Plus className="w-4 h-4"/> New Post</button>}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><FileText className="w-6 h-6"/></div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Published Posts</p>
            <p className="text-2xl font-bold text-gray-900">24</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-yellow-50 text-yellow-600 rounded-lg"><FileText className="w-6 h-6"/></div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Drafts</p>
            <p className="text-2xl font-bold text-gray-900">5</p>
          </div>
        </div>
      </div>

      <DataTable data={mockPosts} columns={columns} isLoading={false} />
    </div>
  )
}
