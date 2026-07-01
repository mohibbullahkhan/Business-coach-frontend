'use client'
import PageHeader from '@/components/admin/ui/PageHeader'
import StatCard from '@/components/admin/ui/StatCard'
import Avatar from '@/components/admin/ui/Avatar'
import Badge from '@/components/admin/ui/Badge'
import { Users, DollarSign, CalendarDays, Funnel, ArrowRight } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Link from 'next/link'

const mockChartData = [
  { name: 'Jan', revenue: 4200 }, { name: 'Feb', revenue: 3800 },
  { name: 'Mar', revenue: 5100 }, { name: 'Apr', revenue: 4900 },
  { name: 'May', revenue: 6200 }, { name: 'Jun', revenue: 7800 },
  { name: 'Jul', revenue: 8500 }, { name: 'Aug', revenue: 9100 },
  { name: 'Sep', revenue: 8900 }, { name: 'Oct', revenue: 10500 },
  { name: 'Nov', revenue: 12200 }, { name: 'Dec', revenue: 14500 },
]

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
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Total Clients" value={142} icon={Users} trend="+12% from last month" />
        <StatCard title="Monthly Revenue" value="$14,500" icon={DollarSign} trend="+18.5% from last month" />
        <StatCard title="Upcoming Sessions" value={24} icon={CalendarDays} />
        <StatCard title="New Leads" value={18} icon={Funnel} trend="+4 this week" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
            <select className="text-sm border-gray-200 rounded-md bg-gray-50 px-3 py-1.5 focus:ring-blue-500 focus:border-blue-500">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dx={-10} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  cursor={{ stroke: '#E5E7EB', strokeWidth: 1 }} 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: any) => [`$${value}`, 'Revenue']}
                />
                <Line type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={3} dot={{ r: 4, fill: '#2563EB', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="space-y-6">
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
    </div>
  )
}
