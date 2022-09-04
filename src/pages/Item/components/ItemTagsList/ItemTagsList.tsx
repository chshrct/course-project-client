import React, { FC } from 'react';

import { Badge, Group } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { PropsType } from './types';

export const ItemTagsList: FC<PropsType> = ({ tags }) => {
  const { t } = useTranslation();

  return (
    <Group spacing="xs">
      {tags?.map(tag => (
        <Badge
          key={tag}
          variant="gradient"
          gradient={{ from: 'teal', to: 'blue', deg: 60 }}
          ml={3}
          title={t('badge_title_tag')}
          size="sm"
        >
          {tag}
        </Badge>
      ))}
    </Group>
  );
};
