import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { AnalyticsSummary } from '@/types/admin'

export const analyticsApi = createApi({
  reducerPath: 'analyticsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/admin/',
  }),
  tagTypes: ['AnalyticsSummary'],
  endpoints: (builder) => ({
    getAnalytics: builder.query<AnalyticsSummary, any>({
      query: (params) => ({ url: 'analytics', params }),
      providesTags: ['AnalyticsSummary'],
    }),
  }),
})

export const {
  useGetAnalyticsQuery,
} = analyticsApi
