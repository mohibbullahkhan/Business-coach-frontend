import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AnalyticsState {
  // Add state properties here
}

const initialState: AnalyticsState = {
}

export const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
  },
})

export default analyticsSlice.reducer
