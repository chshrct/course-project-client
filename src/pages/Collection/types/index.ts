/* eslint-disable import/no-unresolved */
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryDefinition,
} from '@reduxjs/toolkit/dist/query';
import { LazyQueryTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';

import {
  GetCollectionItemsRequestType,
  GetCollectionItemsResponseType,
} from 'api/items/types';

export type GetCollectionItemsType = LazyQueryTrigger<
  QueryDefinition<
    GetCollectionItemsRequestType,
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
    'USERS',
    GetCollectionItemsResponseType,
    'appApi'
  >
>;
