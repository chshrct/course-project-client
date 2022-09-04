import { uniqueId } from 'lodash';
import * as Yup from 'yup';

import {
  CollectionFormInitialValuesType,
  CreateCollectionFormType,
  OnSubmitHandlerAgsType,
} from '../types';

import { CollectionType, FieldType } from 'api/collections/types';
import i18n from 'localization/i18n';

export const addItemFieldHandler = (form: CreateCollectionFormType): void => {
  const itemFields = [...form.values.itemFields];
  const fieldExists = itemFields.some(
    field => field.title === form.values.itemField.title,
  );

  if (fieldExists) {
    form.setFieldError('itemField.title', `${i18n.t('field_validation_text_exist')}`);

    return;
  }

  itemFields.push({
    id: uniqueId(),
    type: form.values.itemField.type,
    title: form.values.itemField.title,
  });
  form.setFieldValue('itemFields', itemFields);
  form.setFieldValue('itemField.title', '');
};

export const setImageHandler =
  (form: CreateCollectionFormType) =>
  (images: File[] | null): void => {
    form.setFieldValue('image', images ? images[0] : null);
  };

export const onSubmitHandler =
  ({
    form,
    uploadImage,
    createCollection,
    id,
    updateCollection,
    isModeEdit,
    collectionId,
  }: OnSubmitHandlerAgsType) =>
  ({ image, description, itemFields, title, topics }: typeof form.values): void => {
    if (image && !(typeof image === 'string')) {
      const formData = new FormData();

      formData.append('file', image);
      formData.append('upload_preset', 'chshrct');
      uploadImage(formData);

      return;
    }
    if (isModeEdit) {
      updateCollection({
        owner: id!,
        id: collectionId,
        description,
        image,
        itemFields: itemFields.map(
          field => ({ title: field.title, type: field.type } as FieldType),
        ),
        title,
        topics,
      });

      return;
    }
    createCollection({
      image,
      owner: id!,
      description,
      itemFields: itemFields.map(
        field => ({ title: field.title, type: field.type } as FieldType),
      ),
      title,
      topics,
    });
  };

export const getInitialValuesForEdit = (
  collection: CollectionType,
): CollectionFormInitialValuesType => {
  const { title, description, image, topics, itemFields } = collection;

  return {
    title,
    description,
    image,
    topics,
    itemFields: itemFields.map(field => ({ ...field, id: uniqueId() })),
    itemField: {
      type: 'title',
      title: '',
    },
  };
};

export const getCollectionSchema = (): any =>
  Yup.object().shape({
    title: Yup.string().required(i18n.t('error_required')),
    description: Yup.string().required(i18n.t('error_required')),
    topics: Yup.array().min(1, i18n.t('error_topics')),
  });
