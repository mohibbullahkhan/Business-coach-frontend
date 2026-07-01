import { apiSlice } from './apiSlice';

export const bookingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query<any, void>({
      query: () => '/bookings',
      providesTags: ['Booking'],
    }),
  }),
});

export const { useGetAllBookingsQuery } = bookingsApi;
