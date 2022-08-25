import { FieldType } from 'shared/api/collections/types';

export type ItemFieldType = FieldType & { value: string | Date | boolean | number };

export type ItemType = {
  id: string;
  title: string;
  collection: string;
  tags: string[];
  itemFields: ItemFieldType[];
};

export type CreateItemRequestType = {
  item: Omit<ItemType, 'id'>;
  pageInfo: {
    id: string;
    page: number;
    limit: number;
  };
};

export type UpdateItemRequestType = {
  id: string;
  payload: Omit<ItemType, 'id' | 'collection'>;
  pageInfo: {
    id: string;
    page: number;
    limit: number;
  };
};

export type GetCollectionItemsRequestType = { id: string; page: number; limit: number };

export type GetCollectionItemsResponseType = {
  items: {
    id: string;
    title: string;
    tags: string[];
    itemFields: ItemFieldType[];
  }[];
  count: number;
};

export type DeleteItemsRequestType = {
  itemIds: string[];
  pageInfo: {
    id: string;
    limit: number;
    page: number;
  };
};