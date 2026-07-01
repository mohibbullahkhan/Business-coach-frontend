import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Client } from '@/types/admin'

export const clientsApi = createApi({
  reducerPath: 'clientsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/admin/',
  }),
  tagTypes: ['Client'],
  endpoints: (builder) => ({
    getClients: builder.query<Client[], any>({
      query: (params) => ({ url: 'clients', params }),
      providesTags: ['Client'],
    }),
    getClientById: builder.query<Client, string>({
      query: (id) => `clients/${id}`,
      providesTags: (_result, _err, id) => [{ type: 'Client', id }],
    }),
    createClient: builder.mutation<Client, Partial<Client>>({
      query: (body) => ({ url: 'clients', method: 'POST', body }),
      invalidatesTags: ['Client'],
    }),
    updateClient: builder.mutation<Client, Partial<Client> & { id?: string }>({
      query: ({ id, ...body }) => ({ url: id ? `clients/${id}` : 'clients', method: 'PATCH', body }),
      invalidatesTags: (_result, _err, { id }) => id ? [{ type: 'Client', id }] : ['Client'],
    }),
    deleteClient: builder.mutation<void, string>({
      query: (id) => ({ url: `clients/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Client'],
    }),
  }),
})

export const {
  useGetClientsQuery,
  useGetClientByIdQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientsApi
