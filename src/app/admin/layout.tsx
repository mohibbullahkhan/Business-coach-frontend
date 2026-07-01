'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import AdminLayout from '@/components/admin/layout/AdminLayout'
import { Toaster } from 'react-hot-toast'
import { useGetMeQuery } from '@/lib/api/authApi'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { logout } from '@/features/auth/authSlice'

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useDispatch()
  
  const token = useSelector((state: RootState) => state.auth.token)
  
  const { data, isLoading, isError } = useGetMeQuery(undefined, {
    skip: !token,
  })

  useEffect(() => {
    if (!token) {
      router.push('/login')
    }
  }, [token, router])

  useEffect(() => {
    if (isError) {
      dispatch(logout())
      router.push('/login')
    }
  }, [isError, dispatch, router])

  if (!token || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading admin session...</p>
      </div>
    )
  }

  // Ensure login isn't inside admin layout but /login is handled at Root level anyway
  if (pathname === '/admin/login') {
    return (
      <>
        {children}
        <Toaster position="top-right" />
      </>
    )
  }

  return (
    <>
      <AdminLayout>{children}</AdminLayout>
      <Toaster position="top-right" />
    </>
  )
}
