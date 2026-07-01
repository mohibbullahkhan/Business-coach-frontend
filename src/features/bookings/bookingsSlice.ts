import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface BookingsState {
  // Add state properties here
}

const initialState: BookingsState = {
}

export const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
  },
})

export default bookingsSlice.reducer
