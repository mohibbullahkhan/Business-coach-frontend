import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface EmailsState {
  // Add state properties here
}

const initialState: EmailsState = {
}

export const emailsSlice = createSlice({
  name: 'emails',
  initialState,
  reducers: {
  },
})

export default emailsSlice.reducer
