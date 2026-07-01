'use client'
import { useState } from 'react'
import { Bell } from 'lucide-react'

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const unreadCount = 3

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-500 hover:text-gray-900 transition-colors relative rounded-full hover:bg-gray-100"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="font-semibold text-gray-900 text-sm">Notifications</h3>
            <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">Mark all read</button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            <div className="p-4 text-center text-sm text-gray-500 py-8">
              No new notifications
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
