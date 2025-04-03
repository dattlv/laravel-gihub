import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    credentials: 'include',
    prepareHeaders: (headers) => {
      // Get CSRF token from cookie
      const xsrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('XSRF-TOKEN'))
        ?.split('=')[1];

      if (xsrfToken) {
        headers.set('X-XSRF-TOKEN', decodeURIComponent(xsrfToken));
      }

      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');

      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['Auth', 'Projects', 'ProjectMembers', 'ProjectCategories'],
});
