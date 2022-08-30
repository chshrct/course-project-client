import { appApi } from '../appApi';

export type GetTagsResponse = { value: string; count: number }[];

export const tagsApi = appApi.injectEndpoints({
  endpoints: builder => ({
    getTags: builder.query<GetTagsResponse, void>({
      query: () => ({
        url: '/tags',
      }),
      providesTags: ['TAGS'],
    }),
  }),
});

export const { useGetTagsQuery } = tagsApi;
