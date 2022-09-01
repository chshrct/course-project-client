import { appApi } from '../appApi';

import { SearchByQueryRequest, SearchByQueryResponse } from './types';

export const searchApi = appApi.injectEndpoints({
  endpoints: builder => ({
    searchByQuery: builder.query<SearchByQueryResponse, SearchByQueryRequest>({
      query: params => ({
        url: `/search`,
        params,
      }),
    }),
  }),
});

export const { useLazySearchByQueryQuery } = searchApi;
