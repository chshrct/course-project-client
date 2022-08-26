import { FC } from 'react';

import { Group, Spoiler, Stack, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';

import s from './style/ItemFieldRenderPicker.module.css';

import { ItemFieldType } from 'shared/api/items/types';
import { TypesIconPicker } from 'shared/components';

type PropsType = {
  field: ItemFieldType;
};

export const ItemFieldRenderPicker: FC<PropsType> = ({ field }) => {
  const { t } = useTranslation();

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
            <Text>{new Date(field.value as Date).toLocaleDateString()}</Text>
          </Group>
        </Stack>
      );
    case 'check':
      return (
        <Stack spacing="xs">
          <Group spacing="xs">
            <TypesIconPicker type={field.type} />
            <Text weight={500}>{`${field.title}: `}</Text>
            <Text>{field.value ? 'yes' : 'no'}</Text>
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
              mt={-20}
              maxHeight={90}
              showLabel={t('text_spoilerClosed')}
              hideLabel={t('text_spoilnerOpened')}
            >
              <ReactMarkdown className={s.whitespace}>
                {field.value as string}
              </ReactMarkdown>
            </Spoiler>
          </Text>
        </Stack>
      );

    default:
      return null;
  }
};
