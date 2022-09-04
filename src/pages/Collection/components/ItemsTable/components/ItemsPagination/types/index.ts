import { Dispatch, SetStateAction } from 'react';

import { GetCollectionItemsResponseType } from 'api';

export type PropsType = {
  paginationProps: {
    limit: number;
    page: number;
  };
  setPage: Dispatch<SetStateAction<number>>;
  setLimit: Dispatch<SetStateAction<number>>;
  collectionItems: GetCollectionItemsResponseType;
};
