import React, { FC } from 'react';

import { ActionIcon, Group, Stack, Text } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { IconMinus } from '@tabler/icons';
import { useTranslation } from 'react-i18next';

import { CollectionFormInitialValuesType } from '../types';

import { FieldTypesType } from 'shared/api/collections/types';
import { TypesIconPicker } from 'shared/components/TypesIconPicker/TypesIconPicker';

type PropsType = {
  form: UseFormReturnType<CollectionFormInitialValuesType>;
};

export const ItemFieldsList: FC<PropsType> = ({ form }) => {
  const { t } = useTranslation();
  const deleteItemFieldHandler = (fieldId: string): void => {
    form.setFieldValue(
      'itemFields',
      form.values.itemFields.filter(field => field.id !== fieldId),
    );
  };

  return (
    <Stack spacing="xs">
      {form.values.itemFields.map(field => (
        <Group key={field.id} position="apart" align="center">
          <Group>
            <TypesIconPicker type={field.type as FieldTypesType} />
            <Text>{field.title}</Text>
          </Group>
          <ActionIcon
            variant="default"
            onClick={() => {
              deleteItemFieldHandler(field.id);
            }}
            title={t('button_title_homePage')}
            size="sm"
          >
            <IconMinus size={18} />
          </ActionIcon>
        </Group>
      ))}
    </Stack>
  );
};
