import { apiSlice } from '../../services/api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: route('api.auth.login'),
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
    logout: builder.mutation({
      query: () => ({
        url: route('api.auth.logout'),
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),
    getUser: builder.query({
      query: () => route('api.auth.user'),
      providesTags: ['Auth'],
    }),
  }),
});
