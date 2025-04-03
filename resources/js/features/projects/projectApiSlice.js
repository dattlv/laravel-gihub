import { apiSlice } from '../../services/api/apiSlice';

export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCategories: builder.query({
      query: () => route('api.v1.project-categories.index'),
      transformResponse: response => response.data,
      providesTags: ['ProjectCategories'],
    }),
    getProjects: builder.query({
      query: () => route('api.v1.projects.index'),
      providesTags: ['Projects'],
    }),
    getProject: builder.query({
      query: id => route('api.v1.projects.show', { project: id }),
      providesTags: (result, error, id) => [{ type: 'Projects', id }],
    }),
    createProject: builder.mutation({
      query: project => ({
        url: route('api.v1.projects.store'),
        method: 'POST',
        body: project,
      }),
      invalidatesTags: ['Projects'],
    }),
    updateProject: builder.mutation({
      query: ({ id, ...project }) => ({
        url: route('api.v1.projects.update', { project: id }),
        method: 'PUT',
        body: project,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Projects', id },
        'Projects',
      ],
    }),
    deleteProject: builder.mutation({
      query: id => ({
        url: route('api.v1.projects.destroy', { project: id }),
        method: 'DELETE',
      }),
      invalidatesTags: ['Projects'],
    }),
  }),
});
