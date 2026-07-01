import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ClientsState {
  // Add state properties here
}

const initialState: ClientsState = {
}

export const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
  },
})

export default clientsSlice.reducer
