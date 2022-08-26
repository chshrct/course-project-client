import { FC } from 'react';

import { Stack } from '@mantine/core';

import { ItemFieldRenderPicker } from '../ItemFieldRenderPicker';

import { ItemFieldType } from 'shared/api/items/types';

type PropsType = {
  itemFields: ItemFieldType[] | undefined;
};

export const ItemAdditionalFieldsList: FC<PropsType> = ({ itemFields }) => {
  return (
    <Stack spacing="sm">
      {itemFields?.map(field => (
        <ItemFieldRenderPicker key={field.title} field={field} />
      ))}
    </Stack>
  );
};
