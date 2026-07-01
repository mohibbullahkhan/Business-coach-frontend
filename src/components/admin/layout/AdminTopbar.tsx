'use client'
import { usePathname } from 'next/navigation'
import { Search } from 'lucide-react'
import NotificationBell from '../ui/NotificationBell'
import toast from 'react-hot-toast'

export default function AdminTopbar() {
  const pathname = usePathname()
  
  const getPageTitle = () => {
    if (pathname === '/admin') return 'Overview'
    const parts = pathname.split('/').filter(Boolean)
    if (parts.length > 1) {
      return parts[1].charAt(0).toUpperCase() + parts[1].slice(1)
    }
    return 'Dashboard'
  }

  const handleSignOut = () => {
    toast('Sign out integration coming soon', { icon: '👋' })
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-10">
      <h1 className="text-xl font-semibold text-gray-900">{getPageTitle()}</h1>
      
      <div className="flex items-center gap-6">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white w-64 transition-all"
          />
        </div>
        
        <NotificationBell />
        
        <div className="h-8 w-px bg-gray-200"></div>
        
        <div className="flex items-center gap-3 cursor-pointer group" onClick={handleSignOut}>
          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium text-sm">
            JD
          </div>
          <div className="text-sm">
            <p className="font-medium text-gray-900 group-hover:text-blue-600">Jane Doe</p>
            <p className="text-gray-500 text-xs">Admin</p>
          </div>
        </div>
      </div>
    </header>
  )
}
