'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Mail, Eye, EyeOff, ArrowLeft, KeyRound } from 'lucide-react'
import {
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
} from '@/lib/api/authApi'
import { useDispatch } from 'react-redux'
import { setCredentials } from '@/features/auth/authSlice'
import { ApiError } from '@/types/api'

type AuthView = 'LOGIN' | 'FORGOT_PASSWORD' | 'VERIFY_OTP' | 'RESET_PASSWORD'

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  
  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation()
  const [forgotPasswordMutation, { isLoading: isForgotLoading }] = useForgotPasswordMutation()
  const [verifyOtpMutation, { isLoading: isVerifyLoading }] = useVerifyOtpMutation()
  const [resetPasswordMutation, { isLoading: isResetLoading }] = useResetPasswordMutation()
  
  // View State
  const [view, setView] = useState<AuthView>('LOGIN')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Form State
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  // UI State
  const [showPassword, setShowPassword] = useState(false)

  const clearMessages = () => {
    setError('')
    setSuccess('')
  }

  const getErrorMessage = (err: any): string => {
    if (err?.data?.message) return err.data.message
    if (err?.error) return err.error
    return 'An unexpected error occurred.'
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    clearMessages()
    
    try {
      const res = await loginMutation({ email, password }).unwrap()
      if (res.success && res.data) {
        dispatch(setCredentials({ token: res.data.token, user: res.data.admin || res.data.user }))
        router.push('/admin')
      }
    } catch (err: any) {
      setError(getErrorMessage(err))
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    clearMessages()
    
    try {
      const res = await forgotPasswordMutation({ email }).unwrap()
      if (res.success) {
        setSuccess('A 6-digit OTP has been sent to your email.')
        setView('VERIFY_OTP')
      }
    } catch (err: any) {
      setError(getErrorMessage(err))
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    clearMessages()
    
    try {
      const res = await verifyOtpMutation({ email, otp }).unwrap()
      if (res.success) {
        setView('RESET_PASSWORD')
      }
    } catch (err: any) {
      setError(getErrorMessage(err))
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    clearMessages()
    
    if (newPassword !== confirmPassword) {
      return setError('Passwords do not match.')
    }
    
    try {
      const res = await resetPasswordMutation({ email, otp, newPassword }).unwrap()
      if (res.success) {
        setSuccess('Password successfully reset! You can now login.')
        setPassword('')
        setNewPassword('')
        setConfirmPassword('')
        setOtp('')
        setView('LOGIN')
      }
    } catch (err: any) {
      setError(getErrorMessage(err))
    }
  }

  const isLoading = isLoginLoading || isForgotLoading || isVerifyLoading || isResetLoading

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Clarity Finance
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {view === 'LOGIN' && 'Sign in to your admin dashboard'}
          {view === 'FORGOT_PASSWORD' && 'Reset your password'}
          {view === 'VERIFY_OTP' && 'Verify your identity'}
          {view === 'RESET_PASSWORD' && 'Create a new password'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          
          {success && (
            <div className="mb-4 bg-green-50 border-l-4 border-green-400 p-4">
              <p className="text-sm text-green-700">{success}</p>
            </div>
          )}

          {/* LOGIN VIEW */}
          {view === 'LOGIN' && (
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email address</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 py-2 border"
                    placeholder="admin@example.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <button 
                    type="button" 
                    onClick={() => { setView('FORGOT_PASSWORD'); clearMessages() }} 
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 py-2 border"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
          )}

          {/* FORGOT PASSWORD VIEW */}
          {view === 'FORGOT_PASSWORD' && (
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email address</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 py-2 border"
                    placeholder="Enter your registered email"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                  {isLoading ? 'Sending...' : 'Send OTP'}
                </button>
                <button
                  type="button"
                  onClick={() => { setView('LOGIN'); clearMessages() }}
                  className="w-full flex justify-center items-center gap-2 py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to login
                </button>
              </div>
            </form>
          )}

          {/* VERIFY OTP VIEW */}
          {view === 'VERIFY_OTP' && (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <p className="text-sm text-gray-600 text-center">
                We've sent a 6-digit verification code to <strong>{email}</strong>.
              </p>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 text-center mb-2">Enter 6-digit OTP</label>
                <div className="mt-1 relative rounded-md shadow-sm flex justify-center">
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                    className="block w-48 text-center text-2xl tracking-widest border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 py-2 border"
                    placeholder="000000"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={isLoading || otp.length !== 6}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </button>
                <button
                  type="button"
                  onClick={() => { setView('FORGOT_PASSWORD'); setOtp(''); clearMessages() }}
                  className="w-full flex justify-center py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  Change Email
                </button>
              </div>
            </form>
          )}

          {/* RESET PASSWORD VIEW */}
          {view === 'RESET_PASSWORD' && (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={8}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 py-2 border"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={8}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 py-2 border"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  )
}
