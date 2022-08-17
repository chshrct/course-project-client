/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { method } from 'lodash';

import { appApi } from '../appApi';

import {
  CreateCollectionRequestBodyType,
  CreateCollectionResponseBodyType,
  GetUserCollectionsResponseBodyType,
  UpdateCollectionRequestBodyType,
  UpdateCollectionRequestParamType,
} from './types';

export const collectionsApi = appApi.injectEndpoints({
  endpoints: builder => ({
    getUserCollections: builder.query<
      GetUserCollectionsResponseBodyType,
      { userId: string }
    >({
      query: ({ userId }) => ({
        url: `/collections/${userId}`,
      }),
    }),
    getTopics: builder.query<string[], void>({
      query: () => ({
        url: '/topics',
      }),
    }),
    createCollection: builder.mutation<
      CreateCollectionResponseBodyType,
      CreateCollectionRequestBodyType
    >({
      query: body => ({
        url: '/collections',
        method: 'POST',
        body,
      }),
      async onQueryStarted({ owner: ownerId }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { id, description, image, itemFields, owner, title, topics } = data;

          dispatch(
            collectionsApi.util.updateQueryData(
              'getUserCollections',
              { userId: ownerId },
              draft => {
                draft.push({
                  description,
                  id,
                  image,
                  itemFields,
                  owner,
                  title,
                  topics,
                });
              },
            ),
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),
    updateCollection: builder.mutation<
      void,
      UpdateCollectionRequestParamType & UpdateCollectionRequestBodyType
    >({
      query: ({ id, title, description, image, itemFields, topics }) => ({
        url: `/collections/${id}`,
        method: 'PATCH',
        body: { title, description, image, itemFields, topics },
      }),
      onQueryStarted(
        { owner, description, id, image, itemFields, title, topics },
        { dispatch, queryFulfilled },
      ) {
        const patch = dispatch(
          collectionsApi.util.updateQueryData(
            'getUserCollections',
            { userId: owner },
            draft => {
              const collectionToUpdate = draft.find(collection => collection.id === id);

              if (collectionToUpdate)
                Object.assign(collectionToUpdate, {
                  description,
                  image,
                  itemFields,
                  title,
                  topics,
                });
            },
          ),
        );

        queryFulfilled.catch(patch.undo);
      },
    }),
    deleteCollection: builder.mutation<void, { id: string; userId: string }>({
      query: body => ({
        url: `/collections/${body.id}`,
        method: 'DELETE',
      }),
      onQueryStarted({ id, userId }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          collectionsApi.util.updateQueryData('getUserCollections', { userId }, draft => {
            const index = draft.findIndex(collection => collection.id === id);

            draft.splice(index, 1);
          }),
        );

        queryFulfilled.catch(patch.undo);
      },
    }),
  }),
});

export const {
  useCreateCollectionMutation,
  useGetTopicsQuery,
  useGetUserCollectionsQuery,
  useDeleteCollectionMutation,
  useUpdateCollectionMutation,
} = collectionsApi;
