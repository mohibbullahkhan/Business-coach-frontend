'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import AdminLayout from '@/components/admin/layout/AdminLayout'
import StoreProvider from '@/app/StoreProvider'
import { Toaster } from 'react-hot-toast'

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    // TODO: Replace with NextAuth session check (Auth disabled for now as requested)
    setIsAuthorized(true)
  }, [pathname, router])

  if (!isAuthorized) {
    return null // or a loading spinner
  }

  // If it's the login page, don't wrap it in the AdminLayout sidebar/topbar shell
  if (pathname === '/admin/login') {
    return (
      <StoreProvider>
        {children}
        <Toaster position="top-right" />
      </StoreProvider>
    )
  }

  return (
    <StoreProvider>
      <AdminLayout>{children}</AdminLayout>
      <Toaster position="top-right" />
    </StoreProvider>
  )
}
