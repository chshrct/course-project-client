import 'dayjs/locale/en';
import 'dayjs/locale/ru';
import * as Yup from 'yup';

import { FieldType, ItemType } from 'api';
import i18n from 'localization/i18n';

export const getItemSchema = (itemFields: FieldType[]): any => {
  return Yup.object().shape({
    title: Yup.string().required(i18n.t('error_required')),
    tags: Yup.array().min(1, i18n.t('error_tags')),
    itemFields: Yup.object().shape(
      itemFields.reduce((acc, { title, type }) => {
        let validation: any;

        switch (type) {
          case 'date':
            validation = Yup.date().nullable().required(i18n.t('error_required'));
            break;
          case 'number':
            validation = Yup.number().required(i18n.t('error_required'));
            break;
          case 'check':
            validation = Yup.boolean();
            break;
          case 'text':
          case 'title':
          default:
            validation = Yup.string().required(i18n.t('error_required'));
            break;
        }
        acc[title] = validation;

        return acc;
      }, {} as any),
    ),
  });
};

export const getUpdatePayload = (
  data: any,
  itemFields: FieldType[],
): Omit<ItemType, 'id' | 'collection'> => ({
  ...data,
  itemFields: itemFields.map(field => ({
    ...field,
    value: data.itemFields[field.title],
  })),
});

export const getNewItem = (
  collectionId: string,
  data: any,
  itemFields: FieldType[],
): Omit<ItemType, 'id'> => ({
  collection: collectionId,
  ...data,
  itemFields: itemFields.map(field => ({
    ...field,
    value: data.itemFields[field.title],
  })),
});
