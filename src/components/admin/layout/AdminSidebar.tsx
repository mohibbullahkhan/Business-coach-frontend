'use client'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  LayoutDashboard, Users, CalendarDays, DollarSign, 
  Funnel, Mail, FileText, Star, BarChart2, Settings, ExternalLink 
} from 'lucide-react'

const navItems = [
  { name: 'Overview', href: '/admin', icon: LayoutDashboard },
  { name: 'Clients', href: '/admin/clients', icon: Users },
  { name: 'Bookings', href: '/admin/bookings', icon: CalendarDays },
  { name: 'Leads', href: '/admin/leads', icon: Funnel },
  { name: 'Content', href: '/admin/content', icon: FileText },
  { name: 'Testimonials', href: '/admin/testimonials', icon: Star },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-gray-950 text-gray-300 flex flex-col h-full border-r border-gray-800 shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-gray-800">
        <span className="text-white font-semibold text-lg tracking-tight">Clarity Finance</span>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href + '/') && item.href !== '/admin')
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white font-medium' 
                  : 'hover:bg-gray-900 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span className="text-sm">{item.name}</span>
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <Link 
          href="/" 
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-900 hover:text-white transition-colors"
        >
          <ExternalLink className="w-5 h-5 shrink-0" />
          <span className="text-sm">View Site</span>
        </Link>
      </div>
    </aside>
  )
}
