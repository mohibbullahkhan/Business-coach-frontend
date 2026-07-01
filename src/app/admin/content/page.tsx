'use client'
import { useState, useMemo } from 'react'
import PageHeader from '@/components/admin/ui/PageHeader'
import DataTable from '@/components/admin/ui/DataTable'
import Badge from '@/components/admin/ui/Badge'
import { FileText, Plus, Edit2, Globe, Trash2 } from 'lucide-react'
import { createColumnHelper } from '@tanstack/react-table'
import Link from 'next/link'
import toast from 'react-hot-toast'

const initialPosts = [
  { id: 1, title: '5 Ways to Improve Your Money Mindset', category: 'Mindset', status: 'published', date: '2026-06-28', views: 1245 },
  { id: 2, title: 'How to Build an Emergency Fund', category: 'Budgeting', status: 'published', date: '2026-06-15', views: 892 },
  { id: 3, title: 'Understanding Index Funds', category: 'Investing', status: 'draft', date: '-', views: 0 },
  { id: 4, title: 'Debt Snowball vs Avalanche', category: 'Debt', status: 'scheduled', date: '2026-07-10', views: 0 },
]

export default function ContentPage() {
  const [posts, setPosts] = useState(initialPosts)

  const handleDelete = (id: number) => {
    if(confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(p => p.id !== id))
      toast.success('Post deleted successfully')
    }
  }

  const columnHelper = createColumnHelper<any>()
  const columns = useMemo(() => [
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
      cell: (info) => (
        <div className="flex items-center gap-3">
          <button className="text-gray-400 hover:text-blue-600 transition-colors" title="Edit"><Edit2 className="w-4 h-4" /></button>
          <button className="text-gray-400 hover:text-green-600 transition-colors" title="View Live"><Globe className="w-4 h-4" /></button>
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
  ], [posts])

  return (
    <div className="space-y-6 w-full max-w-full overflow-hidden">
      <PageHeader 
        title="Content Management" 
        description="Manage your blog posts, resources, and articles."
        action={<Link href="/admin/content/add" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"><Plus className="w-4 h-4"/> New Post</Link>}
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

      <div className="w-full">
        <DataTable data={posts} columns={columns} isLoading={false} />
      </div>
    </div>
  )
}
