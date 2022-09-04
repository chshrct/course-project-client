import { FC } from 'react';

import { Controller } from 'react-hook-form';

import { ItemFieldPicker } from './ItemFieldPicker';
import { PropsType } from './types';
import { getInitialValues } from './utils';

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
