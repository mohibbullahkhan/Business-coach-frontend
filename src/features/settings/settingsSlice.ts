import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SettingsState {
  // Add state properties here
}

const initialState: SettingsState = {
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
  },
})

export default settingsSlice.reducer
