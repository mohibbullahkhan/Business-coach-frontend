import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface RevenueState {
  // Add state properties here
}

const initialState: RevenueState = {
}

export const revenueSlice = createSlice({
  name: 'revenue',
  initialState,
  reducers: {
  },
})

export default revenueSlice.reducer
