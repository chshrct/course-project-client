import { FC } from 'react';

import { Group, Spoiler, Stack, Text } from '@mantine/core';
import { IconCheckbox, IconSquare } from '@tabler/icons';
import MDEditor from '@uiw/react-md-editor';
import { useTranslation } from 'react-i18next';

import s from './style/ItemFieldRenderPicker.module.css';

import { selectColorScheme, selectLocale } from 'app';
import { ItemFieldType } from 'shared/api/items/types';
import { TypesIconPicker } from 'shared/components';
import { useAppSelector } from 'store';

type PropsType = {
  field: ItemFieldType;
};

export const ItemFieldRenderPicker: FC<PropsType> = ({ field }) => {
  const { t } = useTranslation();
  const locale = useAppSelector(selectLocale);
  const colorScheme = useAppSelector(selectColorScheme);

  switch (field.type) {
    case 'title':
    case 'number':
      return (
        <Stack>
          <Group spacing="xs">
            <TypesIconPicker type={field.type} />
            <Text weight={500}>{`${field.title}: `}</Text>
            <Text>{field.value.toString()}</Text>
          </Group>
        </Stack>
      );
    case 'date':
      return (
        <Stack spacing="xs">
          <Group spacing="xs">
            <TypesIconPicker type={field.type} />
            <Text weight={500}>{`${field.title}: `}</Text>
            <Text>{new Date(field.value as Date).toLocaleDateString(locale)}</Text>
          </Group>
        </Stack>
      );
    case 'check':
      return (
        <Stack spacing="xs">
          <Group spacing="xs" align="center">
            {field.value ? <IconCheckbox size={20} /> : <IconSquare size={20} />}
            <Text weight={500}>{`${field.title}`}</Text>
          </Group>
        </Stack>
      );
    case 'text':
      return (
        <Stack spacing="xs">
          <Group spacing="xs">
            <TypesIconPicker type={field.type} />
            <Text weight={500}>{`${field.title}: `}</Text>
          </Group>
          <Text size="md">
            <Spoiler
              maxHeight={90}
              showLabel={t('text_spoilerClosed')}
              hideLabel={t('text_spoilnerOpened')}
            >
              <MDEditor.Markdown
                source={field.value as string}
                className={`${s.markdown} ${colorScheme === 'light' ? s.textDark : ''}`}
              />
            </Spoiler>
          </Text>
        </Stack>
      );

    default:
      return null;
  }
};
