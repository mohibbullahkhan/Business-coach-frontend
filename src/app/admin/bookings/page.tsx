'use client'
import PageHeader from '@/components/admin/ui/PageHeader'
import DataTable from '@/components/admin/ui/DataTable'
import Badge from '@/components/admin/ui/Badge'
import Avatar from '@/components/admin/ui/Avatar'
import { CalendarDays, Clock, Video } from 'lucide-react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { useState } from 'react'

const mockSessions = [
  { id: 1, client: 'Sarah Jenkins', type: 'discovery', date: '2026-07-01', time: '10:00 AM', duration: 30, status: 'upcoming', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, client: 'Michael Chang', type: 'coaching', date: '2026-07-01', time: '1:00 PM', duration: 60, status: 'upcoming', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, client: 'Emma Watson', type: 'coaching', date: '2026-07-01', time: '3:30 PM', duration: 60, status: 'upcoming', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, client: 'David Miller', type: 'discovery', date: '2026-07-02', time: '11:00 AM', duration: 30, status: 'upcoming', avatar: 'https://i.pravatar.cc/150?u=4' },
]

export default function BookingsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Mock filter based on selected date
  const selectedDateStr = date?.toISOString().split('T')[0] || ''
  // For demo, just show some sessions if it's "today" (July 1st)
  const isToday = date && date.getDate() === 1 && date.getMonth() === 6
  const daySessions = isToday ? mockSessions.filter(s => s.date === '2026-07-01') : (date?.getDate() === 2 ? mockSessions.filter(s => s.date === '2026-07-02') : [])

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Bookings & Calendar" 
        description="Manage your upcoming coaching sessions and discovery calls."
      />
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center">
          <DayPicker 
            mode="single" 
            selected={date} 
            onSelect={setDate} 
            className="mx-auto border-none"
          />
          <div className="mt-8 w-full border-t border-gray-100 pt-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Quick Stats</h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">This Week:</span>
                <span className="font-medium text-gray-900">12 Sessions</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Completed:</span>
                <span className="font-medium text-gray-900">8 Sessions</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6 min-h-[500px]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-semibold text-gray-900 text-lg">
              Sessions for {date ? date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' }) : 'Selected Date'}
            </h3>
          </div>
          
          {daySessions.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <CalendarDays className="w-12 h-12 text-gray-300 mb-4" />
              <p>No sessions scheduled for this date.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {daySessions.map(session => (
                <div key={session.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar src={session.avatar} name={session.client} size="lg" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{session.client}</h4>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {session.time} ({session.duration}m)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t border-gray-50 sm:border-none">
                    <Badge variant={session.type === 'discovery' ? 'purple' : 'blue'}>
                      {session.type.toUpperCase()}
                    </Badge>
                    <a 
                      href={process.env.NEXT_PUBLIC_GOOGLE_MEET_LINK || 'https://meet.google.com'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                    >
                      <Video className="w-4 h-4" /> Join Call
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
