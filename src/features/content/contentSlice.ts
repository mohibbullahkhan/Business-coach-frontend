import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ContentState {
  // Add state properties here
}

const initialState: ContentState = {
}

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
  },
})

export default contentSlice.reducer
