import { appApi } from '../appApi';

export const tagsApi = appApi.injectEndpoints({
  endpoints: builder => ({
    getTags: builder.query<string[], void>({
      query: () => ({
        url: '/tags',
      }),
      providesTags: ['TAGS'],
    }),
  }),
});

export const { useGetTagsQuery } = tagsApi;
