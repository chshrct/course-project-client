import { FC } from 'react';

import {
  Box,
  Group,
  Image,
  Paper,
  Space,
  Spoiler,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

import s from './style/CollectionInfo.module.css';

import { selectColorScheme } from 'app';
import { CollectionResponseType } from 'shared/api/collections/types';
import { BadgesList } from 'shared/components/CollectionCard/BadgesList';
import { useAppSelector } from 'store';

type PropsType = {
  collectionData: CollectionResponseType;
};

export const CollectionInfo: FC<PropsType> = ({ collectionData }) => {
  const { t } = useTranslation();
  const colorScheme = useAppSelector(selectColorScheme);

  const { description, title, image, topics } = collectionData;

  return (
    <Paper shadow="sm" p="xs" className={colorScheme === 'dark' ? s.paperDarkbg : ''}>
      <Space h="sm" />
      <Group align="flex-start" position="apart">
        <Stack spacing="xs" className={!image ? s.fullwidth : s.textWidth}>
          <Text lineClamp={2}>
            <Title order={2} className={s.whitespace}>
              {title}
            </Title>
          </Text>
          <Group spacing="xs">
            <BadgesList topics={topics || []} />
          </Group>
          <Text size="sm">
            <Spoiler
              maxHeight={140}
              showLabel={t('text_spoilerClosed')}
              hideLabel={t('text_spoilnerOpened')}
            >
              <ReactMarkdown className={s.whitespace}>{description || ''}</ReactMarkdown>
            </Spoiler>
          </Text>
        </Stack>
        {image && (
          <Box>
            <Space h="md" />
            <Image radius="sm" src={image || ''} height={200} width={300} />
          </Box>
        )}
      </Group>
    </Paper>
  );
};
