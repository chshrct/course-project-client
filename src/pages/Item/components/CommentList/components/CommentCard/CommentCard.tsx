import { FC } from 'react';

import { Badge, Card, Group, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import s from './style/CommentCard.module.css';
import { PropsType } from './types';

import { selectLocale } from 'app';
import { APP_ROUTES } from 'routes';
import { useAppSelector } from 'store';

export const CommentCard: FC<PropsType> = ({
  comment: {
    date,
    message,
    user: { id, name },
  },
}) => {
  const locale = useAppSelector(selectLocale);
  const navigate = useNavigate();
  const commentDate = new Date(date).toLocaleDateString(locale);

  const onAuthorBadgeClick = (): void => {
    navigate(`${APP_ROUTES.USER}/${id}`);
  };

  return (
    <Card className={s.commentSize} shadow="sm" withBorder>
      <Card.Section p={3}>
        <Group position="apart" noWrap>
          <Badge
            className={s.cursorPoint}
            size="md"
            variant="gradient"
            gradient={{ from: 'indigo', to: 'cyan' }}
            onClick={onAuthorBadgeClick}
          >
            <Text transform="capitalize">{name}</Text>
          </Badge>
          <Text transform="lowercase" mr={5} size="xs" weight={500}>
            {commentDate}
          </Text>
        </Group>
      </Card.Section>
      <Card.Section px={10} pb={10} pt={0} className={s.whitespace}>
        <div>{message}</div>
      </Card.Section>
    </Card>
  );
};
