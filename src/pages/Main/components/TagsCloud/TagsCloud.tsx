import { FC, memo, useCallback } from 'react';

import { Box, Group, LoadingOverlay } from '@mantine/core';
import WordCloud from 'react-d3-cloud';
import { useNavigate } from 'react-router-dom';

import s from './style/TagsCloud.module.css';

import { useGetTagsQuery } from 'api';
import { APP_ROUTES } from 'routes/enums';

const WORDCLOUD_MULTIPLAYER = 200;

export const TagsCloud: FC = memo(() => {
  const navigate = useNavigate();
  const { data: tagData, isFetching: isTagsFetching } = useGetTagsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const mappedData =
    tagData?.map(({ count, value }) => ({
      text: value,
      value: count * WORDCLOUD_MULTIPLAYER,
    })) || [];

  const onWordClick = useCallback(
    (event: any, word: any) => {
      navigate(`${APP_ROUTES.TAG}/${word.text}`);
    },
    [navigate],
  );

  if (!tagData) return null;

  return (
    <Group position="center">
      <Box className={`${s.boxSize} ${s.tagsCloud}`}>
        <LoadingOverlay visible={isTagsFetching} overlayBlur={2} />
        <WordCloud width={300} height={300} data={mappedData} onWordClick={onWordClick} />
      </Box>
    </Group>
  );
});
