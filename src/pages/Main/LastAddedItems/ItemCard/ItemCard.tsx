import { FC, MouseEventHandler } from 'react';

import { Badge, Box, Card, Group, Image, Stack } from '@mantine/core';
import { IconAlbum, IconBallpen, IconUser } from '@tabler/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import s from './style/ItemCard.module.css';

import { APP_ROUTES } from 'routes/enums';
import { GetLatestItemDataType } from 'shared/api/items/types';

type PropsType = {
  itemData: GetLatestItemDataType;
};

export const ItemCard: FC<PropsType> = ({ itemData: { collection, item, owner } }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onOwnerBadgeClick: MouseEventHandler<HTMLDivElement> = e => {
    e.stopPropagation();
    navigate(`${APP_ROUTES.USER}/${owner.id}`);
  };

  const onCollectionBadgeClick: MouseEventHandler<HTMLDivElement> = e => {
    e.stopPropagation();
    navigate(`${APP_ROUTES.COLLECTION}/${collection.id}`);
  };

  const onItemClick = (): void => {
    navigate(`${APP_ROUTES.ITEM}/${item.id}`);
  };

  return (
    <Card
      className={`${s.cardSize} ${s.positionRelative}`}
      p={0}
      onClick={onItemClick}
      withBorder
    >
      <Image
        className={s.bgImage}
        src={collection.image || undefined}
        height={200}
        width={300}
        fit="cover"
        withPlaceholder
      />
      <Card.Section>
        <Badge
          size="xs"
          className={s.badge}
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan' }}
          ml={3}
          mt={3}
          title={t('title_owner')}
          onClick={onOwnerBadgeClick}
        >
          <Group spacing={3}>
            <IconUser size={12} />
            {owner.title}
          </Group>
        </Badge>
      </Card.Section>
      <Card.Section>
        <Stack className={s.itemInfo} spacing="xs" align="center">
          <Badge
            title={t('badge_title_item')}
            variant="filled"
            size="md"
            className={s.cursorP}
            color="blue"
            leftSection={
              <Box mt={5}>
                <IconBallpen size={16} stroke={1.5} />
              </Box>
            }
          >
            {item.title}
          </Badge>
          <Badge
            variant="filled"
            title={t('badge_title_collection')}
            className={s.cursorP}
            color="green"
            size="md"
            onClick={onCollectionBadgeClick}
            leftSection={
              <Box mt={5}>
                <IconAlbum size={16} stroke={1.5} />
              </Box>
            }
          >
            {collection.title}
          </Badge>
        </Stack>
      </Card.Section>
    </Card>
  );
};
