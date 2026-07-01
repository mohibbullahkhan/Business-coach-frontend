import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TestimonialsState {
  // Add state properties here
}

const initialState: TestimonialsState = {
}

export const testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState,
  reducers: {
  },
})

export default testimonialsSlice.reducer
