'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageHeader from '@/components/admin/ui/PageHeader'
import toast from 'react-hot-toast'
import { LeadStage } from '@/types/admin'

export default function AddLeadPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    monthlyRevenue: '',
    challenge: '',
    preferredCallTime: '',
    stage: 'new' as LeadStage,
    source: 'Manual Entry'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate RTK Query Mutation
    setTimeout(() => {
      toast.success('Lead added successfully!')
      router.push('/admin/leads')
    }, 800)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader 
        title="Add New Lead" 
        description="Manually enter a prospect into your CRM pipeline." 
      />

      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Full Name *</label>
            <input 
              required 
              type="text" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2.5 px-3 border"
              placeholder="John Smith"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email Address *</label>
            <input 
              required 
              type="email" 
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2.5 px-3 border"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Current Monthly Revenue</label>
            <input 
              type="text" 
              value={formData.monthlyRevenue}
              onChange={e => setFormData({...formData, monthlyRevenue: e.target.value})}
              className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2.5 px-3 border"
              placeholder="e.g. $5k - $10k"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Pipeline Stage</label>
            <select 
              value={formData.stage}
              onChange={e => setFormData({...formData, stage: e.target.value as LeadStage})}
              className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2.5 px-3 border bg-white"
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="call_scheduled">Call Scheduled</option>
              <option value="proposal_sent">Proposal Sent</option>
              <option value="converted">Converted (Won)</option>
              <option value="lost">Lost</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Biggest Challenge</label>
          <textarea 
            rows={3}
            value={formData.challenge}
            onChange={e => setFormData({...formData, challenge: e.target.value})}
            className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2.5 px-3 border resize-none"
            placeholder="What is holding them back..."
          />
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t">
          <button 
            type="button" 
            onClick={() => router.push('/admin/leads')}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70"
          >
            {isSubmitting ? 'Saving...' : 'Add Lead'}
          </button>
        </div>
      </form>
    </div>
  )
}
