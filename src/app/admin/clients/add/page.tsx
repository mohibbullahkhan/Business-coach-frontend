'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageHeader from '@/components/admin/ui/PageHeader'
import toast from 'react-hot-toast'
import { CreateClientDto, ProgramTier, ClientStatus } from '@/types/admin'

export default function AddClientPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<CreateClientDto>({
    name: '',
    email: '',
    program: '1on1',
    status: 'active',
    startDate: new Date().toISOString().split('T')[0],
    goals: [],
    notes: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate RTK Query Mutation
    setTimeout(() => {
      toast.success('Client added successfully!')
      router.push('/admin/clients')
    }, 800)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader 
        title="Add New Client" 
        description="Create a new client record and enroll them in a program." 
      />

      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm space-y-8">
        
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Client Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Full Name *</label>
              <input 
                required 
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2.5 px-3 border"
                placeholder="Jane Doe"
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
                placeholder="jane@example.com"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Enrollment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Program Tier *</label>
              <select 
                value={formData.program}
                onChange={e => setFormData({...formData, program: e.target.value as ProgramTier})}
                className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2.5 px-3 border bg-white"
              >
                <option value="1on1">1-on-1 Coaching</option>
                <option value="group">Group Coaching</option>
                <option value="course">Video Course</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Status *</label>
              <select 
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value as ClientStatus})}
                className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2.5 px-3 border bg-white"
              >
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="completed">Completed</option>
                <option value="lead">Lead</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Start Date *</label>
              <input 
                required 
                type="date" 
                value={formData.startDate}
                onChange={e => setFormData({...formData, startDate: e.target.value})}
                className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2.5 px-3 border"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Additional Information</h3>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Goals (comma separated)</label>
            <input 
              type="text" 
              value={formData.goals?.join(', ')}
              onChange={e => setFormData({...formData, goals: e.target.value.split(',').map(g => g.trim()).filter(Boolean)})}
              className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2.5 px-3 border"
              placeholder="E.g. Double revenue, Build emergency fund"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Private Notes</label>
            <textarea 
              rows={4}
              value={formData.notes}
              onChange={e => setFormData({...formData, notes: e.target.value})}
              className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2.5 px-3 border resize-none"
              placeholder="Internal notes about the client..."
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <button 
            type="button" 
            onClick={() => router.push('/admin/clients')}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70"
          >
            {isSubmitting ? 'Saving...' : 'Add Client'}
          </button>
        </div>
      </form>
    </div>
  )
}
