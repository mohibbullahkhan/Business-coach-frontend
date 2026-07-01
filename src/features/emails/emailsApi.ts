import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Subscriber } from '@/types/admin'

export const emailsApi = createApi({
  reducerPath: 'emailsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/admin/',
  }),
  tagTypes: ['Subscriber'],
  endpoints: (builder) => ({
    getSubscribers: builder.query<Subscriber[], any>({
      query: (params) => ({ url: 'emails', params }),
      providesTags: ['Subscriber'],
    }),
    getSubscriberById: builder.query<Subscriber, string>({
      query: (id) => `emails/${id}`,
      providesTags: (_result, _err, id) => [{ type: 'Subscriber', id }],
    }),
    createSubscriber: builder.mutation<Subscriber, Partial<Subscriber>>({
      query: (body) => ({ url: 'emails', method: 'POST', body }),
      invalidatesTags: ['Subscriber'],
    }),
    updateSubscriber: builder.mutation<Subscriber, Partial<Subscriber> & { id?: string }>({
      query: ({ id, ...body }) => ({ url: id ? `emails/${id}` : 'emails', method: 'PATCH', body }),
      invalidatesTags: (_result, _err, { id }) => id ? [{ type: 'Subscriber', id }] : ['Subscriber'],
    }),
    deleteSubscriber: builder.mutation<void, string>({
      query: (id) => ({ url: `emails/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Subscriber'],
    }),
    getCampaigns: builder.query<Subscriber[], any>({
      query: (params) => ({ url: 'emails', params }),
      providesTags: ['Subscriber'],
    }),
    getLeadMagnetStats: builder.query<Subscriber[], any>({
      query: (params) => ({ url: 'emails', params }),
      providesTags: ['Subscriber'],
    }),
  }),
})

export const {
  useGetSubscribersQuery,
  useGetSubscriberByIdQuery,
  useCreateSubscriberMutation,
  useUpdateSubscriberMutation,
  useDeleteSubscriberMutation,
  useGetCampaignsQuery,
  useGetLeadMagnetStatsQuery,
} = emailsApi
