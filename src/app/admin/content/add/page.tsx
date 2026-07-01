'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageHeader from '@/components/admin/ui/PageHeader'
import toast from 'react-hot-toast'
import { CreatePostDto, PostStatus } from '@/types/admin'

export default function AddContentPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<CreatePostDto>({
    title: '',
    slug: '',
    category: '',
    tags: [],
    status: 'draft',
    content: '',
    metaTitle: '',
    metaDescription: ''
  })

  // Auto-generate slug from title
  const handleTitleChange = (title: string) => {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    setFormData({ ...formData, title, slug })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate RTK Query Mutation
    setTimeout(() => {
      toast.success('Content saved successfully!')
      router.push('/admin/content')
    }, 800)
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <PageHeader 
        title="Create Content" 
        description="Write a new blog post, guide, or resource." 
      />

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Editor Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Post Title *</label>
              <input 
                required 
                type="text" 
                value={formData.title}
                onChange={e => handleTitleChange(e.target.value)}
                className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2.5 px-3 border text-lg font-semibold"
                placeholder="How to Master Your Finances..."
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Content (Markdown supported) *</label>
              <textarea 
                required
                rows={20}
                value={formData.content}
                onChange={e => setFormData({...formData, content: e.target.value})}
                className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 py-3 px-4 border font-mono text-sm resize-y"
                placeholder="Write your amazing content here..."
              />
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Publishing Status</label>
              <select 
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value as PostStatus})}
                className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2.5 px-3 border bg-white"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">URL Slug</label>
              <input 
                type="text" 
                value={formData.slug}
                onChange={e => setFormData({...formData, slug: e.target.value})}
                className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2.5 px-3 border bg-gray-50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Category</label>
              <input 
                type="text" 
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
                className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2.5 px-3 border"
                placeholder="e.g. Investing"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Tags (comma separated)</label>
              <input 
                type="text" 
                value={formData.tags.join(', ')}
                onChange={e => setFormData({...formData, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)})}
                className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2.5 px-3 border"
                placeholder="finance, budget, wealth"
              />
            </div>
            
            <hr />

            <div className="pt-2">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 shadow-sm"
              >
                {isSubmitting ? 'Saving...' : 'Save Content'}
              </button>
              <button 
                type="button" 
                onClick={() => router.push('/admin/content')}
                className="w-full mt-3 py-2.5 text-gray-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
