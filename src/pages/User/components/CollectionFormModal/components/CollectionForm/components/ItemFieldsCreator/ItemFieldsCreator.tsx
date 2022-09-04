import React, { FC } from 'react';

import { ActionIcon, Group, NativeSelect, Stack, Text, TextInput } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import { useTranslation } from 'react-i18next';

import s from './style/ItemFieldsCreator.module.css';
import { PropsType } from './types';

export const ItemFieldsCreator: FC<PropsType> = ({ form, onAddItemFieldClick }) => {
  const { t } = useTranslation();

  return (
    <Group mt="md" align="flex-start" noWrap>
      <Stack spacing={0} align="flex-start">
        <Text size="sm" weight={500} align="center">
          {t('text_fieldType')}
        </Text>
        <NativeSelect
          className={s.selectWidth}
          data={['title', 'text', 'number', 'date', 'check']}
          value={form.values.itemField.type}
          onChange={e => form.setFieldValue('itemField.type', e.currentTarget.value)}
        />
      </Stack>
      <Stack spacing={0} align="flex-start">
        <Text size="sm" weight={500} align="center">
          {t('text_fieldTitle')}
        </Text>
        <TextInput {...form.getInputProps('itemField.title')} />
      </Stack>
      <ActionIcon
        variant="default"
        onClick={onAddItemFieldClick}
        title={t('button_title_homePage')}
        size="md"
        mt={26}
        disabled={!form.values.itemField.title}
      >
        <IconPlus size={18} />
      </ActionIcon>
    </Group>
  );
};
