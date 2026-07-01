import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Lead } from '@/types/admin'

export const leadsApi = createApi({
  reducerPath: 'leadsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/admin/',
  }),
  tagTypes: ['Lead'],
  endpoints: (builder) => ({
    getLeads: builder.query<Lead[], any>({
      query: (params) => ({ url: 'leads', params }),
      providesTags: ['Lead'],
    }),
    getLeadById: builder.query<Lead, string>({
      query: (id) => `leads/${id}`,
      providesTags: (_result, _err, id) => [{ type: 'Lead', id }],
    }),
    createLead: builder.mutation<Lead, Partial<Lead>>({
      query: (body) => ({ url: 'leads', method: 'POST', body }),
      invalidatesTags: ['Lead'],
    }),
    updateLead: builder.mutation<Lead, Partial<Lead> & { id?: string }>({
      query: ({ id, ...body }) => ({ url: id ? `leads/${id}` : 'leads', method: 'PATCH', body }),
      invalidatesTags: (_result, _err, { id }) => id ? [{ type: 'Lead', id }] : ['Lead'],
    }),
    deleteLead: builder.mutation<void, string>({
      query: (id) => ({ url: `leads/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Lead'],
    }),
  }),
})

export const {
  useGetLeadsQuery,
  useGetLeadByIdQuery,
  useCreateLeadMutation,
  useUpdateLeadMutation,
  useDeleteLeadMutation,
} = leadsApi
