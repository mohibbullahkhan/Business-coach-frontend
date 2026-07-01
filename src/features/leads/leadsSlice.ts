import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface LeadsState {
  // Add state properties here
}

const initialState: LeadsState = {
}

export const leadsSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
  },
})

export default leadsSlice.reducer
