import { configureStore } from '@reduxjs/toolkit'
import { clientsApi } from '@/features/clients/clientsApi'
import { bookingsApi } from '@/features/bookings/bookingsApi'
import { revenueApi } from '@/features/revenue/revenueApi'
import { leadsApi } from '@/features/leads/leadsApi'
import { emailsApi } from '@/features/emails/emailsApi'
import { contentApi } from '@/features/content/contentApi'
import { testimonialsApi } from '@/features/testimonials/testimonialsApi'
import { analyticsApi } from '@/features/analytics/analyticsApi'
import { settingsApi } from '@/features/settings/settingsApi'
import authReducer from '@/features/auth/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [clientsApi.reducerPath]: clientsApi.reducer,
    [bookingsApi.reducerPath]: bookingsApi.reducer,
    [revenueApi.reducerPath]: revenueApi.reducer,
    [leadsApi.reducerPath]: leadsApi.reducer,
    [emailsApi.reducerPath]: emailsApi.reducer,
    [contentApi.reducerPath]: contentApi.reducer,
    [testimonialsApi.reducerPath]: testimonialsApi.reducer,
    [analyticsApi.reducerPath]: analyticsApi.reducer,
    [settingsApi.reducerPath]: settingsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      clientsApi.middleware,
      bookingsApi.middleware,
      revenueApi.middleware,
      leadsApi.middleware,
      emailsApi.middleware,
      contentApi.middleware,
      testimonialsApi.middleware,
      analyticsApi.middleware,
      settingsApi.middleware,
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
