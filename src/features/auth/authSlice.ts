import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthData } from '@/types/api'

interface AuthState {
  isAuthenticated: boolean
  token: string | null
  user: AuthData['user'] | null
}

const getInitialState = (): AuthState => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    if (token) {
      return { isAuthenticated: true, token, user: null } // User will be populated by getMe
    }
  }
  return { isAuthenticated: false, token: null, user: null }
}

const initialState: AuthState = getInitialState()

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; user?: AuthData['user'] }>) => {
      state.isAuthenticated = true
      state.token = action.payload.token
      if (action.payload.user) {
        state.user = action.payload.user
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload.token)
      }
    },
    setUser: (state, action: PayloadAction<AuthData['user']>) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.token = null
      state.user = null
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
      }
    },
  },
})

export const { setCredentials, setUser, logout } = authSlice.actions
export default authSlice.reducer
