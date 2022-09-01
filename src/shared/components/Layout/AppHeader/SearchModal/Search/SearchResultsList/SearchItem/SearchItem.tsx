import { FC } from 'react';

import { Button, Group, Mark, Stack, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import { toggleIsSearchOpen } from 'app';
import { APP_ROUTES } from 'routes/enums';
import { HighlightType } from 'shared/api/search/types';
import { useAppDispatch } from 'store';

type PropsType = {
  id: string;
  mainText: string;
  highlight?: HighlightType;
  type: string;
  secondaryText?: string;
};

export const SearchItem: FC<PropsType> = ({
  id,
  mainText,
  highlight,
  type,
  secondaryText,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const texts = [] as any[];

  if (highlight) {
    highlight.texts.forEach(({ type, value }) => {
      texts.push(type === 'hit' ? <Mark key={value}>{value}</Mark> : value);
    });
  }

  return (
    <Button
      onClick={() => {
        navigate(
          type === 'Collection'
            ? `${APP_ROUTES.COLLECTION}/${id}`
            : `${APP_ROUTES.ITEM}/${id}`,
        );
        dispatch(toggleIsSearchOpen());
      }}
      m={2}
      size="xl"
      variant="subtle"
      color="dark"
      styles={{
        inner: {
          justifyContent: 'left',
        },
        label: { maxWidth: '90%' },
      }}
    >
      <Group position="apart" noWrap style={{ maxWidth: '100%' }}>
        <Stack spacing={0} style={{ maxWidth: '100%' }}>
          <Text
            size="md"
            weight={400}
            style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {mainText}
          </Text>
          <Text
            size="xs"
            color="dimmed"
            style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {secondaryText || texts}
          </Text>
        </Stack>
        <Text
          color="dimmed"
          size="xs"
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
          }}
        >
          {type}
        </Text>
      </Group>
    </Button>
  );
};
