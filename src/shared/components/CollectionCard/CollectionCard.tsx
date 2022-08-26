import { FC, MouseEventHandler } from 'react';

import { ActionIcon, Badge, Box, Card, Group, Image, Menu, Text } from '@mantine/core';
import { IconDots, IconEdit, IconTrash } from '@tabler/icons';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';

import { BadgesList } from './BadgesList';
import { ItemsFieldsAccordion } from './ItemsFieldsAccordion';
import s from './style/CollectionCard.module.css';
import { PropsType } from './types';

import { APP_ROUTES } from 'routes/enums';
import { useDeleteCollectionMutation } from 'shared/api';

export const CollectionCard: FC<PropsType> = ({
  id,
  image,
  title,
  description,
  owner,
  itemFields,
  topics,
  setCollectionForEdit,
  setShowForm,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [deleteCollection] = useDeleteCollectionMutation();

  const onDeleteCollectionClick: MouseEventHandler<HTMLButtonElement> = (e): void => {
    e.stopPropagation();
    deleteCollection({ id, userId: owner.id });
  };

  const onEditCollectionClick: MouseEventHandler<HTMLButtonElement> = (e): void => {
    e.stopPropagation();
    setShowForm(true);
    setCollectionForEdit({
      id,
      description,
      image,
      itemFields,
      owner: owner.id,
      title,
      topics,
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
    navigate(`${APP_ROUTES.USER}/${owner.id}`);
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
            variant="gradient"
            gradient={{ from: 'indigo', to: 'cyan' }}
            ml={3}
            mt={3}
            title={t('title_owner')}
            onClick={onOwnerBadgeClick}
          >
            {owner.name}
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
          <ReactMarkdown className={s.whitespace}>{description}</ReactMarkdown>
        </Text>
      </Card.Section>
      {itemFields.length > 0 && <ItemsFieldsAccordion itemFields={itemFields} />}
      <Card.Section p="xs">
        <BadgesList topics={topics} />
      </Card.Section>
    </Card>
  );
};
