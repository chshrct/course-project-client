import { FC, MouseEventHandler } from 'react';

import { Badge, Box, Card, Group, Image, Text } from '@mantine/core';
import { IconUser } from '@tabler/icons';
import MDEditor from '@uiw/react-md-editor';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { BadgesList } from './BadgesList';
import { CollectionCardMenu } from './CollectionCardMenu';
import { ItemsFieldsAccordion } from './ItemsFieldsAccordion';
import s from './style/CollectionCard.module.css';
import { PropsType } from './types';

import { selectColorScheme, selectIsAdmin, selectUserId } from 'app';
import { APP_ROUTES } from 'routes/enums';
import { useAppSelector } from 'store';

export const CollectionCard: FC<PropsType> = ({
  collection,
  setCollectionForEdit,
  setShowForm,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const colorScheme = useAppSelector(selectColorScheme);
  const isAdmin = useAppSelector(selectIsAdmin);
  const userId = useAppSelector(selectUserId);
  const {
    id,
    owner: { id: ownerId, name: ownerName },
    image,
    description,
    itemFields,
    topics,
    title,
  } = collection;

  const isAdminOrOwner = isAdmin || userId === ownerId;

  const onCardClick = (): void => {
    navigate(`${APP_ROUTES.COLLECTION}/${id}`);
  };

  const onOwnerBadgeClick: MouseEventHandler<HTMLDivElement> = e => {
    e.stopPropagation();
    navigate(`${APP_ROUTES.USER}/${ownerId}`);
  };

  return (
    <Card
      withBorder
      shadow="sm"
      radius="md"
      className={s.cardWidth}
      onClick={onCardClick}
    >
      <Card.Section>
        <Group position="apart" noWrap>
          <Text weight={500} m="xs" lineClamp={1}>
            {title}
          </Text>
          {isAdminOrOwner && (
            <CollectionCardMenu
              setCollectionForEdit={setCollectionForEdit}
              setShowForm={setShowForm}
              collection={collection}
            />
          )}
        </Group>
      </Card.Section>
      <Card.Section withBorder>
        <Box className={s.positionRelative}>
          <Badge
            className={`${s.positionAbsolute} ${s.badgeHover}`}
            size="xs"
            variant="gradient"
            gradient={{ from: 'indigo', to: 'cyan' }}
            ml={3}
            mt={3}
            title={t('title_owner')}
            onClick={onOwnerBadgeClick}
          >
            <Group spacing={3}>
              <IconUser size={12} />
              {ownerName}
            </Group>
          </Badge>

          <Image
            src={image || undefined}
            height={200}
            width={300}
            fit="cover"
            withPlaceholder
          />
        </Box>
      </Card.Section>
      <Card.Section p="xs">
        <Text size="sm" lineClamp={4}>
          <MDEditor.Markdown
            source={description}
            className={`${s.markdown} ${colorScheme === 'light' ? s.textDark : ''}`}
          />
        </Text>
      </Card.Section>
      {itemFields.length > 0 && <ItemsFieldsAccordion itemFields={itemFields} />}
      <Card.Section p="xs">
        <BadgesList topics={topics} />
      </Card.Section>
    </Card>
  );
};
