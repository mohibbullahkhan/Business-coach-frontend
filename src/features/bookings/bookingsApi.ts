import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Booking } from '@/types/admin'

export const bookingsApi = createApi({
  reducerPath: 'bookingsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/admin/',
  }),
  tagTypes: ['Booking'],
  endpoints: (builder) => ({
    getBookings: builder.query<Booking[], any>({
      query: (params) => ({ url: 'bookings', params }),
      providesTags: ['Booking'],
    }),
    getBookingById: builder.query<Booking, string>({
      query: (id) => `bookings/${id}`,
      providesTags: (_result, _err, id) => [{ type: 'Booking', id }],
    }),
    createBooking: builder.mutation<Booking, Partial<Booking>>({
      query: (body) => ({ url: 'bookings', method: 'POST', body }),
      invalidatesTags: ['Booking'],
    }),
    updateBooking: builder.mutation<Booking, Partial<Booking> & { id?: string }>({
      query: ({ id, ...body }) => ({ url: id ? `bookings/${id}` : 'bookings', method: 'PATCH', body }),
      invalidatesTags: (_result, _err, { id }) => id ? [{ type: 'Booking', id }] : ['Booking'],
    }),
    deleteBooking: builder.mutation<void, string>({
      query: (id) => ({ url: `bookings/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Booking'],
    }),
  }),
})

export const {
  useGetBookingsQuery,
  useGetBookingByIdQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingsApi
