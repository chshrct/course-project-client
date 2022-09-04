import { FC } from 'react';

import { Stack } from '@mantine/core';

import { ItemFieldRenderPicker } from './components';
import { PropsType } from './types';

export const ItemAdditionalFieldsList: FC<PropsType> = ({ itemFields }) => {
  return (
    <Stack spacing="sm">
      {itemFields?.map(field => (
        <ItemFieldRenderPicker key={field.title} field={field} />
      ))}
    </Stack>
  );
};
