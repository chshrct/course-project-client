import { useEffect } from 'react';

import {
  CreateCollection,
  CreateCollectionFormType,
  UpdateCollectionType,
} from '../types';

import { FieldType } from 'api/collections/types';

export const useResetFormAndQuery = (
  collectionReset: () => void,
  imageReset: () => void,
  isCreateCollectionSuccess: boolean,
  setShowForm: (val: boolean) => void,
  isUpdateCollectionSuccess: boolean,
  updateCollectionReset: () => void,
): void => {
  useEffect(() => {
    if (isCreateCollectionSuccess || isUpdateCollectionSuccess) {
      collectionReset();
      updateCollectionReset();
      imageReset();
      setShowForm(false);
    }
  }, [
    collectionReset,
    imageReset,
    isCreateCollectionSuccess,
    isUpdateCollectionSuccess,
    setShowForm,
    updateCollectionReset,
  ]);
};

export const useSendFormOnImageUpload = (
  createCollection: CreateCollection,
  form: CreateCollectionFormType,
  id: string | undefined,
  imageData: any,
  isUploadSuccess: boolean,
  updateCollection: UpdateCollectionType,
  isModeEdit: boolean,
  collectionId: string,
): void => {
  useEffect(() => {
    if (isUploadSuccess && imageData) {
      const { description, itemFields, title, topics } = form.values;

      if (isModeEdit) {
        updateCollection({
          owner: id!,
          id: collectionId,
          description,
          image: imageData.url,
          topics,
          title,
          itemFields: itemFields.map(
            field => ({ title: field.title, type: field.type } as FieldType),
          ),
        });

        return;
      }
      createCollection({
        image: imageData.url,
        owner: id!,
        description,
        itemFields: itemFields.map(
          field => ({ title: field.title, type: field.type } as FieldType),
        ),
        title,
        topics,
      });
    }
  }, [
    collectionId,
    createCollection,
    isModeEdit,
    form.values,
    id,
    imageData,
    isUploadSuccess,
    updateCollection,
  ]);
};
