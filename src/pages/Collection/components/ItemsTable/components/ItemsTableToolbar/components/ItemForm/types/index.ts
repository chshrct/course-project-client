import { Dispatch, SetStateAction } from 'react';

import { FieldType } from 'api';

export type PropsType = {
  setShowForm: Dispatch<SetStateAction<boolean>>;
  itemProps: {
    itemId: string | undefined;
    collectionData: {
      collectionId: string;
      itemFields: FieldType[];
    };
    paginationProps: {
      limit: number;
      page: number;
    };
    tags: string[];
  };
};
