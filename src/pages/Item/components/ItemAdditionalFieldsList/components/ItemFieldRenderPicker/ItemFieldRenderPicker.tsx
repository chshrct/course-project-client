import { FC } from 'react';

import { Group, Spoiler, Stack, Text } from '@mantine/core';
import { IconCheckbox, IconSquare } from '@tabler/icons';
import MDEditor from '@uiw/react-md-editor';
import { useTranslation } from 'react-i18next';

import s from './style/ItemFieldRenderPicker.module.css';
import { PropsType } from './types';

import { selectColorScheme, selectLocale } from 'app';
import { TypesIconPicker } from 'components';
import { useAppSelector } from 'store';

export const ItemFieldRenderPicker: FC<PropsType> = ({
  field: { type, title, value },
}) => {
  const { t } = useTranslation();
  const locale = useAppSelector(selectLocale);
  const colorScheme = useAppSelector(selectColorScheme);

  const markdownClass = `${s.markdown} ${colorScheme === 'light' ? s.textDark : ''}`;
  const dateString = new Date(value as Date).toLocaleDateString(locale);
  const checkIcon = value ? <IconCheckbox size={20} /> : <IconSquare size={20} />;

  switch (type) {
    case 'title':
    case 'number':
      return (
        <Stack>
          <Group spacing="xs">
            <TypesIconPicker type={type} />
            <Text weight={500}>{`${title}: `}</Text>
            <Text>
              <MDEditor.Markdown source={value.toString()} className={markdownClass} />
            </Text>
          </Group>
        </Stack>
      );
    case 'date':
      return (
        <Stack spacing="xs">
          <Group spacing="xs">
            <TypesIconPicker type={type} />
            <Text weight={500}>{`${title}: `}</Text>
            <Text>{dateString}</Text>
          </Group>
        </Stack>
      );
    case 'check':
      return (
        <Stack spacing="xs">
          <Group spacing="xs" align="center">
            {checkIcon}
            <Text weight={500}>{`${title}`}</Text>
          </Group>
        </Stack>
      );
    case 'text':
      return (
        <Stack spacing="xs">
          <Group spacing="xs">
            <TypesIconPicker type={type} />
            <Text weight={500}>{`${title}: `}</Text>
          </Group>
          <Text size="md">
            <Spoiler
              maxHeight={90}
              showLabel={t('text_spoilerClosed')}
              hideLabel={t('text_spoilnerOpened')}
            >
              <MDEditor.Markdown source={value as string} className={markdownClass} />
            </Spoiler>
          </Text>
        </Stack>
      );

    default:
      return null;
  }
};
