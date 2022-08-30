import { FC, MouseEventHandler } from 'react';

import { ActionIcon, Badge, Box, Card, Group, Image, Menu, Text } from '@mantine/core';
import { IconDots, IconEdit, IconTrash, IconUser } from '@tabler/icons';
import MDEditor from '@uiw/react-md-editor';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { BadgesList } from './BadgesList';
import { ItemsFieldsAccordion } from './ItemsFieldsAccordion';
import s from './style/CollectionCard.module.css';
import { PropsType } from './types';

import { selectColorScheme } from 'app';
import { APP_ROUTES } from 'routes/enums';
import { useDeleteCollectionMutation } from 'shared/api';
import { useAppSelector } from 'store';

export const CollectionCard: FC<PropsType> = ({
  collection,
  setCollectionForEdit,
  setShowForm,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const colorScheme = useAppSelector(selectColorScheme);
  const [deleteCollection] = useDeleteCollectionMutation();
  const {
    id,
    owner: { id: ownerId, name: ownerName },
    image,
    description,
    itemFields,
    topics,
    title,
  } = collection;

  const onDeleteCollectionClick: MouseEventHandler<HTMLButtonElement> = (e): void => {
    e.stopPropagation();
    deleteCollection({ id, userId: ownerId });
  };

  const onEditCollectionClick: MouseEventHandler<HTMLButtonElement> = (e): void => {
    e.stopPropagation();
    setShowForm(true);
    setCollectionForEdit({
      ...collection,
      owner: ownerId,
    });
  };
  const onCardClick = (): void => {
    navigate(`${APP_ROUTES.COLLECTION}/${id}`);
  };

  const stopPropagationHandler: MouseEventHandler<
    HTMLButtonElement | HTMLDivElement
  > = e => {
    e.stopPropagation();
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
          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon
                title={t('title_collectionMenu')}
                onClick={stopPropagationHandler}
              >
                <IconDots size={16} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item icon={<IconEdit size={14} />} onClick={onEditCollectionClick}>
                {t('menu_item_text_edit')}
              </Menu.Item>
              <Menu.Item
                icon={<IconTrash size={14} />}
                color="red"
                onClick={onDeleteCollectionClick}
              >
                {t('menu_item_text_delete')}
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
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
