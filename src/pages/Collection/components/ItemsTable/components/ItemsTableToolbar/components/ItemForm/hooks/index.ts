import { useEffect } from 'react';

import { FieldValues, UseFormSetValue } from 'react-hook-form';

import { ItemType } from 'api';

export const useFillFieldsForEdit = (
  setValue: UseFormSetValue<FieldValues>,
  itemData: ItemType | undefined,
): void => {
  useEffect(() => {
    if (itemData) {
      setValue('title', itemData.title);
      setValue('tags', itemData.tags);
      itemData.itemFields.forEach(field =>
        setValue(
          `itemFields.${field.title}`,
          field.type === 'date' ? new Date(field.value as string) : field.value,
        ),
      );
    }
  }, [itemData, setValue]);
};
