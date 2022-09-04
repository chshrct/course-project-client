import { UseFormReturnType } from '@mantine/form';

import {
  CollectionFormInitialValuesType,
  CreateCollectionType,
  UpdateCollectionType,
} from '../../types';

export type UseResetFormAndQueryArgsType = {
  collectionReset: () => void;
  imageReset: () => void;
  isCreateCollectionSuccess: boolean;
  setShowForm: (val: boolean) => void;
  isUpdateCollectionSuccess: boolean;
  updateCollectionReset: () => void;
};

export type UseSendFormOnImageUploadArgsType = {
  createCollection: CreateCollectionType;
  form: UseFormReturnType<CollectionFormInitialValuesType>;
  id: string | undefined;
  imageData: any;
  isUploadSuccess: boolean;
  updateCollection: UpdateCollectionType;
  isModeEdit: boolean;
  collectionId: string;
};
