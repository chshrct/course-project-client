import { UseFormReturnType } from '@mantine/form';

import { CollectionFormInitialValuesType } from '../../types';

export type UseResetFormAndQueryArgsType = {
  collectionReset: () => void;
  imageReset: () => void;
  isCreateCollectionSuccess: boolean;
  setShowForm: (val: boolean) => void;
  isUpdateCollectionSuccess: boolean;
  updateCollectionReset: () => void;
  collectionId: string;
  isModeEdit: boolean;
};

export type UseSendFormOnImageUploadArgsType = {
  createCollection: any;
  form: UseFormReturnType<CollectionFormInitialValuesType>;
  id: string | undefined;
  imageData: any;
  isUploadSuccess: boolean;
  updateCollection: any;
  isModeEdit: boolean;
  collectionId: string;
};
