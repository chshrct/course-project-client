/* eslint-disable import/no-unresolved */
import { UseFormReturnType } from '@mantine/form/lib/types';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from '@reduxjs/toolkit/dist/query';
import { MutationActionCreatorResult } from '@reduxjs/toolkit/dist/query/core/buildInitiate';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';

import {
  CreateCollectionRequestType,
  CreateCollectionResponseType,
  UpdateCollectionRequestBodyType,
  UpdateCollectionRequestParamType,
} from 'shared/api/collections/types';

export type CreateCollection = MutationTrigger<
  MutationDefinition<
    CreateCollectionRequestType,
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
    'USERS',
    CreateCollectionResponseType,
    'appApi'
  >
>;

export type CreateCollectionFormType = UseFormReturnType<CollectionFormInitialValuesType>;

export type CreateCollectionType = (
  arg: CreateCollectionRequestType,
) => MutationActionCreatorResult<
  MutationDefinition<
    CreateCollectionRequestType,
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
    'USERS',
    CreateCollectionResponseType,
    'appApi'
  >
>;

export type UploadImageType = (
  arg: FormData,
) => MutationActionCreatorResult<
  MutationDefinition<
    FormData,
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
    never,
    any,
    'fileUploadApi'
  >
>;

export type CollectionFormInitialValuesType = {
  title: string;
  description: string;
  image: File | string | null;
  topics: string[];
  itemFields: { id: string; type: string; title: string }[];
  itemField: {
    type: string;
    title: string;
  };
};

export type UpdateCollectionType = MutationTrigger<
  MutationDefinition<
    UpdateCollectionRequestParamType & UpdateCollectionRequestBodyType,
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
    'USERS',
    void,
    'appApi'
  >
>;
