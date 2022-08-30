import { uniqueId } from 'lodash';

import {
  CollectionFormInitialValuesType,
  CreateCollectionFormType,
  CreateCollectionType,
  UpdateCollectionType,
  UploadImageType,
} from '../types';

import { CollectionType, FieldType } from 'shared/api/collections/types';
import i18n from 'shared/localization/i18n';

export const addItemFieldHandler = (form: CreateCollectionFormType): void => {
  const itemFields = [...form.values.itemFields];
  const fieldExists = itemFields.some(
    field =>
      field.type === form.values.itemField.type &&
      field.title === form.values.itemField.title,
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
  (
    form: CreateCollectionFormType,
    uploadImage: UploadImageType,
    createCollection: CreateCollectionType,
    id: string | undefined,
    updateCollection: UpdateCollectionType,
    editMode: boolean,
    colId: string,
  ) =>
  ({ image, description, itemFields, title, topics }: typeof form.values): void => {
    if (image && !(typeof image === 'string')) {
      const formData = new FormData();

      formData.append('file', image);
      formData.append('upload_preset', 'chshrct');
      uploadImage(formData);

      return;
    }
    if (editMode) {
      updateCollection({
        owner: id!,
        id: colId,
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
