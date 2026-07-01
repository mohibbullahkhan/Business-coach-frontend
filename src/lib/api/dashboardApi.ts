import { apiSlice } from './apiSlice'
import { ApiResponse, DashboardData } from '@/types/api'

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<ApiResponse<DashboardData>, void>({
      query: () => '/dashboard/stats',
      providesTags: ['Dashboard'],
    }),
  }),
})

export const {
  useGetDashboardStatsQuery,
} = dashboardApi
