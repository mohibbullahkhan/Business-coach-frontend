'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageHeader from '@/components/admin/ui/PageHeader'
import toast from 'react-hot-toast'
import { CreateTestimonialDto } from '@/types/admin'

export default function AddTestimonialPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<CreateTestimonialDto>({
    clientName: '',
    quote: '',
    resultHighlight: '',
    category: '1-on-1 Coaching',
    visible: true
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate RTK Query Mutation
    setTimeout(() => {
      toast.success('Testimonial added successfully!')
      router.push('/admin/testimonials')
    }, 800)
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader 
        title="Add Testimonial" 
        description="Showcase client success stories on your public site." 
      />

      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Client Name *</label>
            <input 
              required 
              type="text" 
              value={formData.clientName}
              onChange={e => setFormData({...formData, clientName: e.target.value})}
              className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2.5 px-3 border"
              placeholder="Sarah Jenkins"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Result Highlight</label>
            <input 
              type="text" 
              value={formData.resultHighlight}
              onChange={e => setFormData({...formData, resultHighlight: e.target.value})}
              className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2.5 px-3 border"
              placeholder="e.g. Paid off $20k debt in 6 months"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Testimonial Quote *</label>
          <textarea 
            required
            rows={5}
            value={formData.quote}
            onChange={e => setFormData({...formData, quote: e.target.value})}
            className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 py-3 px-4 border resize-none"
            placeholder="Working with Alex completely changed my trajectory..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Category / Program</label>
            <select 
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
              className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2.5 px-3 border bg-white"
            >
              <option value="1-on-1 Coaching">1-on-1 Coaching</option>
              <option value="Group Coaching">Group Coaching</option>
              <option value="Video Course">Video Course</option>
              <option value="General">General</option>
            </select>
          </div>
          
          <div className="flex items-center gap-3 pt-6">
            <input 
              type="checkbox" 
              id="visible"
              checked={formData.visible}
              onChange={e => setFormData({...formData, visible: e.target.checked})}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="visible" className="text-sm font-medium text-gray-900 cursor-pointer">
              Publish publicly immediately
            </label>
          </div>
        </div>

        <div className="pt-6 flex justify-end gap-3 border-t mt-4">
          <button 
            type="button" 
            onClick={() => router.push('/admin/testimonials')}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 shadow-sm"
          >
            {isSubmitting ? 'Saving...' : 'Add Testimonial'}
          </button>
        </div>
      </form>
    </div>
  )
}
