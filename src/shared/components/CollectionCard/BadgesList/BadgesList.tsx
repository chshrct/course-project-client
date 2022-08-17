import { FC } from 'react';

import { Badge } from '@mantine/core';
import { uniqueId } from 'lodash';
import { useTranslation } from 'react-i18next';

import { topicBadgeColorPicker } from 'shared/utils';

type PropsType = {
  topics: string[];
};

export const BadgesList: FC<PropsType> = ({ topics }) => {
  const { t } = useTranslation();

  return (
    <>
      {topics.map(topic => (
        <Badge
          key={uniqueId()}
          variant="filled"
          color={topicBadgeColorPicker(topic)}
          ml={3}
          title={t('title_topic')}
        >
          {topic}
        </Badge>
      ))}
    </>
  );
};
