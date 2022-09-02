import { appApi } from '../appApi';

import {
  CreateItemRequestType,
  DeleteItemsRequestType,
  GetCollectionItemsRequestType,
  GetCollectionItemsResponseType,
  GetItemsByTagRequestType,
  GetItemsByTagResponseType,
  GetTenLatestResponse,
  ItemType,
  UpdateItemRequestType,
} from './types';

export const itemsApi = appApi.injectEndpoints({
  endpoints: builder => ({
    getItem: builder.query<ItemType, { itemId: string }>({
      query: ({ itemId }) => ({
        url: `/items/${itemId}`,
      }),
    }),
    createItem: builder.mutation<ItemType, CreateItemRequestType>({
      query: body => ({
        url: '/items',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['TAGS', 'LATESTITEMS'],
      async onQueryStarted({ pageInfo }, { dispatch, queryFulfilled }) {
        const {
          data: { id, itemFields, tags, title },
        } = await queryFulfilled;

        dispatch(
          itemsApi.util.updateQueryData('getCollectionItems', pageInfo, draft => {
            if (draft.items.length !== pageInfo.limit)
              draft.items.push({ id, itemFields, tags, title });
            draft.count += 1;
          }),
        );
      },
    }),
    updateItem: builder.mutation<ItemType, UpdateItemRequestType>({
      query: ({ id, payload }) => ({
        url: `/items/${id}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['TAGS', 'LATESTITEMS'],
      async onQueryStarted({ id, pageInfo }, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        dispatch(
          itemsApi.util.updateQueryData('getCollectionItems', pageInfo, draft => {
            const itemToEdit = draft.items.find(item => item.id === id);

            if (itemToEdit) Object.assign(itemToEdit, data);
          }),
        );
      },
    }),
    getCollectionItems: builder.query<
      GetCollectionItemsResponseType,
      GetCollectionItemsRequestType
    >({
      query: ({ id, limit, page }) => ({
        url: `/items/collection/${id}`,
        params: { limit, page },
      }),
      providesTags: ['ITEMS'],
    }),
    deleteItems: builder.mutation<void, DeleteItemsRequestType>({
      query: body => ({
        url: '/items',
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['TAGS', 'ITEMS', 'LATESTITEMS'],
    }),
    getTenLatestItems: builder.query<GetTenLatestResponse, void>({
      query: () => ({
        url: '/items',
      }),
      providesTags: ['LATESTITEMS'],
    }),
    getItemsByTag: builder.query<GetItemsByTagResponseType, GetItemsByTagRequestType>({
      query: ({ tag, limit, page }) => ({
        url: `/items/bytag/${tag}`,
        params: { limit, page },
      }),
    }),
  }),
});

export const {
  useCreateItemMutation,
  useGetCollectionItemsQuery,
  useDeleteItemsMutation,
  useUpdateItemMutation,
  useLazyGetItemQuery,
  useGetTenLatestItemsQuery,
  useLazyGetItemsByTagQuery,
} = itemsApi;
