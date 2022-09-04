import { FC, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Group, LoadingOverlay, Stack, TextInput } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AdditionalFieldsList, TagsSelect } from './components';
import { useFillFieldsForEdit } from './hooks';
import s from './style/ItemForm.module.css';
import { PropsType } from './types';
import { getItemSchema, getNewItem, getUpdatePayload } from './utils';

import { useCreateItemMutation, useLazyGetItemQuery, useUpdateItemMutation } from 'api';
import { WithStar } from 'components';

export const ItemForm: FC<PropsType> = ({
  setShowForm,
  itemProps: {
    tags,
    collectionData: { collectionId, itemFields },
    paginationProps: { limit, page },
    itemId,
  },
}) => {
  const { t } = useTranslation();

  const [getItem, { data: itemData, isFetching: isItemDataFetching }] =
    useLazyGetItemQuery();
  const [
    createItem,
    {
      isLoading: isCreateItemLoading,
      isSuccess: isCreateItemSuccess,
      reset: resetCreateItem,
    },
  ] = useCreateItemMutation();
  const [updateItem, { isLoading: isUpdateItemLoading, isSuccess: isUpdateItemSuccess }] =
    useUpdateItemMutation();

  const isLoading = isCreateItemLoading || isItemDataFetching || isUpdateItemLoading;

  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(getItemSchema(itemFields)),
  });
  const titleError = errors.title?.message?.toString();

  useEffect(() => {
    if (itemId) getItem({ itemId });
  }, [getItem, itemId]);

  useFillFieldsForEdit(setValue, itemData);

  useEffect(() => {
    if (isCreateItemSuccess || isUpdateItemSuccess) {
      resetCreateItem();
      setShowForm(false);
    }
  }, [isCreateItemSuccess, isUpdateItemSuccess, resetCreateItem, setShowForm]);

  const onSubmit = (data: any): void => {
    if (itemId) {
      updateItem({
        id: itemId,
        payload: getUpdatePayload(data, itemFields),
        pageInfo: { id: collectionId, limit, page },
      });

      return;
    }
    createItem({
      item: getNewItem(collectionId, data, itemFields),
      pageInfo: {
        id: collectionId,
        limit,
        page,
      },
    });
  };

  return (
    <Box className={s.width300} mx="auto">
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="md">
          <TextInput
            label={<WithStar>{t('label_title')}</WithStar>}
            placeholder={t('placeholder_text_item')}
            defaultValue=""
            error={titleError}
            {...register('title')}
          />
          <AdditionalFieldsList control={control} itemFields={itemFields} />
          <TagsSelect control={control} tags={tags} />
          <Group position="center">
            <Button type="submit">
              {itemId ? t('modal_submit_text_edit') : t('modal_submit_text_create')}
            </Button>
          </Group>
        </Stack>
      </form>
    </Box>
  );
};
