import { apiSlice } from '../../services/api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),
    getUser: builder.query({
      query: () => '/user',
      providesTags: ['Auth'],
    }),
  }),
});
