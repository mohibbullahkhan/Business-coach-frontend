'use client'
import PageHeader from '@/components/admin/ui/PageHeader'
import StatCard from '@/components/admin/ui/StatCard'
import Avatar from '@/components/admin/ui/Avatar'
import Badge from '@/components/admin/ui/Badge'
import { Users, CalendarDays, Funnel, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const mockSessions = [
  { id: 1, client: 'Sarah Jenkins', type: 'discovery', date: 'Today, 2:00 PM', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, client: 'Michael Chang', type: 'coaching', date: 'Tomorrow, 10:30 AM', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, client: 'Emma Watson', type: 'coaching', date: 'Tomorrow, 3:00 PM', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, client: 'David Miller', type: 'discovery', date: 'Wed, 11:00 AM', avatar: 'https://i.pravatar.cc/150?u=4' },
]

const mockLeads = [
  { id: 1, name: 'Jessica Alba', stage: 'new', time: '2 hours ago' },
  { id: 2, name: 'Robert Fox', stage: 'contacted', time: '5 hours ago' },
  { id: 3, name: 'Wade Warren', stage: 'call_scheduled', time: '1 day ago' },
]

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Overview" description="Here's what's happening with your coaching business today." />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Clients" value={142} icon={Users} trend="+12% from last month" />
        <StatCard title="Upcoming Sessions" value={24} icon={CalendarDays} />
        <StatCard title="New Leads" value={18} icon={Funnel} trend="+4 this week" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Sessions Widget */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
           <div className="flex items-center justify-between mb-6">
             <h3 className="text-lg font-semibold text-gray-900">Upcoming Sessions</h3>
             <Link href="/admin/bookings" className="text-sm text-blue-600 font-medium hover:text-blue-700">View all</Link>
           </div>
           <div className="space-y-5">
             {mockSessions.map(session => (
               <div key={session.id} className="flex items-center justify-between group">
                 <div className="flex items-center gap-3">
                   <Avatar name={session.client} src={session.avatar} size="md" />
                   <div>
                     <p className="text-sm font-semibold text-gray-900">{session.client}</p>
                     <p className="text-xs text-gray-500">{session.date}</p>
                   </div>
                 </div>
                 <Badge variant={session.type === 'discovery' ? 'purple' : 'blue'}>
                   {session.type}
                 </Badge>
               </div>
             ))}
           </div>
        </div>

        {/* Recent Leads Widget */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
           <div className="flex items-center justify-between mb-6">
             <h3 className="text-lg font-semibold text-gray-900">Recent Leads</h3>
             <Link href="/admin/leads" className="text-sm text-blue-600 font-medium hover:text-blue-700">View all</Link>
           </div>
           <div className="space-y-5">
             {mockLeads.map(lead => (
               <div key={lead.id} className="flex items-center justify-between">
                 <div>
                   <p className="text-sm font-semibold text-gray-900">{lead.name}</p>
                   <p className="text-xs text-gray-500">{lead.time}</p>
                 </div>
                 <Badge variant={lead.stage === 'new' ? 'green' : lead.stage === 'contacted' ? 'yellow' : 'blue'}>
                   {lead.stage.replace('_', ' ')}
                 </Badge>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  )
}
