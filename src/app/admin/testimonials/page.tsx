'use client'
import { useState } from 'react'
import PageHeader from '@/components/admin/ui/PageHeader'
import Avatar from '@/components/admin/ui/Avatar'
import { Plus, Star, Edit2, Trash2 } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

const initialTestimonials = [
  { id: 1, client: 'John Doe', avatar: 'https://i.pravatar.cc/150?u=12', role: 'Small Business Owner', quote: "Robert's coaching completely changed how I manage my cash flow. I'm finally profitable and stress-free.", visible: true },
  { id: 2, client: 'Alice Smith', avatar: 'https://i.pravatar.cc/150?u=13', role: 'Freelancer', quote: "The 1-on-1 sessions were incredibly valuable. I paid off my student loans 2 years earlier than planned.", visible: true },
  { id: 3, client: 'Mark Johnson', avatar: 'https://i.pravatar.cc/150?u=14', role: 'Startup Founder', quote: "Best investment I've made in myself and my business.", visible: false },
]

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState(initialTestimonials)

  const handleDelete = (id: number) => {
    if(confirm('Are you sure you want to delete this testimonial?')) {
      setTestimonials(testimonials.filter(t => t.id !== id))
      toast.success('Testimonial deleted successfully')
    }
  }

  const toggleVisibility = (id: number) => {
    setTestimonials(testimonials.map(t => t.id === id ? { ...t, visible: !t.visible } : t))
    toast.success('Visibility updated')
  }

  return (
    <div className="space-y-6 w-full max-w-full overflow-hidden">
      <PageHeader 
        title="Testimonials" 
        description="Manage the success stories displayed on your public site."
        action={<Link href="/admin/testimonials/add" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"><Plus className="w-4 h-4"/> Add Testimonial</Link>}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map(test => (
          <div key={test.id} className={`bg-white p-6 rounded-xl border ${test.visible ? 'border-gray-200' : 'border-gray-200 bg-gray-50/50 opacity-70'} shadow-sm relative group`}>
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="text-gray-400 hover:text-blue-600 bg-white rounded-full p-1 shadow-sm border border-gray-100"><Edit2 className="w-3.5 h-3.5" /></button>
              <button 
                className="text-gray-400 hover:text-red-600 bg-white rounded-full p-1 shadow-sm border border-gray-100"
                onClick={() => handleDelete(test.id)}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <Avatar src={test.avatar} name={test.client} size="lg" />
              <div>
                <h4 className="font-semibold text-gray-900">{test.client}</h4>
                <p className="text-xs text-gray-500">{test.role}</p>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-3">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-sm text-gray-600 italic">"{test.quote}"</p>
            
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">Status</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={test.visible} 
                  onChange={() => toggleVisibility(test.id)} 
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
