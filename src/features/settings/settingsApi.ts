import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { SiteSettings } from '@/types/admin'

export const settingsApi = createApi({
  reducerPath: 'settingsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/admin/',
  }),
  tagTypes: ['SiteSettings'],
  endpoints: (builder) => ({
    getSettings: builder.query<SiteSettings, any>({
      query: (params) => ({ url: 'settings', params }),
      providesTags: ['SiteSettings'],
    }),
    updateSettings: builder.mutation<SiteSettings, Partial<SiteSettings> & { id?: string }>({
      query: ({ id, ...body }) => ({ url: id ? `settings/${id}` : 'settings', method: 'PATCH', body }),
      invalidatesTags: (_result, _err, { id }) => id ? [{ type: 'SiteSettings', id }] : ['SiteSettings'],
    }),
  }),
})

export const {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} = settingsApi
