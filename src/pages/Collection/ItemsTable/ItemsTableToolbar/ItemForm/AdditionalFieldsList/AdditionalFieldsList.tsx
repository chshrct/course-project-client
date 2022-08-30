import { FC } from 'react';

import { Control, Controller, FieldValues } from 'react-hook-form';

import { getInitialValues } from '../utils';

import { ItemFieldPicker } from './ItemFieldPicker';

import { FieldType } from 'shared/api/collections/types';

type PropsType = {
  itemFields: FieldType[];
  control: Control<FieldValues, any>;
};

export const AdditionalFieldsList: FC<PropsType> = ({ itemFields, control }) => {
  const initialValues = getInitialValues(itemFields);

  return (
    <>
      {itemFields.map(itemField => {
        return (
          <Controller
            key={itemField.title}
            name={`itemFields.${itemField.title}`}
            control={control}
            defaultValue={initialValues[itemField.title]}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <ItemFieldPicker
                  error={error?.message}
                  field={itemField}
                  value={value}
                  onChange={onChange}
                />
              );
            }}
          />
        );
      })}
    </>
  );
};
