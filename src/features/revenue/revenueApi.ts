import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RevenueRecord } from '@/types/admin'

export const revenueApi = createApi({
  reducerPath: 'revenueApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/admin/',
  }),
  tagTypes: ['RevenueRecord'],
  endpoints: (builder) => ({
    getRevenue: builder.query<RevenueRecord[], any>({
      query: (params) => ({ url: 'revenue', params }),
      providesTags: ['RevenueRecord'],
    }),
    getRevenueById: builder.query<RevenueRecord, string>({
      query: (id) => `revenue/${id}`,
      providesTags: (_result, _err, id) => [{ type: 'RevenueRecord', id }],
    }),
    createRevenue: builder.mutation<RevenueRecord, Partial<RevenueRecord>>({
      query: (body) => ({ url: 'revenue', method: 'POST', body }),
      invalidatesTags: ['RevenueRecord'],
    }),
    updateRevenue: builder.mutation<RevenueRecord, Partial<RevenueRecord> & { id?: string }>({
      query: ({ id, ...body }) => ({ url: id ? `revenue/${id}` : 'revenue', method: 'PATCH', body }),
      invalidatesTags: (_result, _err, { id }) => id ? [{ type: 'RevenueRecord', id }] : ['RevenueRecord'],
    }),
    deleteRevenue: builder.mutation<void, string>({
      query: (id) => ({ url: `revenue/${id}`, method: 'DELETE' }),
      invalidatesTags: ['RevenueRecord'],
    }),
  }),
})

export const {
  useGetRevenueQuery,
  useGetRevenueByIdQuery,
  useCreateRevenueMutation,
  useUpdateRevenueMutation,
  useDeleteRevenueMutation,
} = revenueApi
