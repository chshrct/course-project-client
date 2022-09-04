import { Dispatch, SetStateAction } from 'react';

import { CollectionType } from 'api';

export type PropsType = {
  collectionForEdit: CollectionType | null;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  isModalOpen: boolean;
};
