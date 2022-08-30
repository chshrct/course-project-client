import { Dispatch, FC, SetStateAction, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  MultiSelect,
  Stack,
  TextInput,
} from '@mantine/core';
import { IconHash } from '@tabler/icons';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { AdditionalFieldsList } from './AdditionalFieldsList';
import s from './style/ItemForm.module.css';

import {
  useCreateItemMutation,
  useLazyGetItemQuery,
  useUpdateItemMutation,
} from 'shared/api';
import { FieldType } from 'shared/api/collections/types';
import { tagsApi } from 'shared/api/tags/tagsApi';
import { WithStar } from 'shared/components';
import { useAppDispatch } from 'store';

type PropsType = {
  itemFields: FieldType[];
  collectionId: string;
  setShowForm: Dispatch<SetStateAction<boolean>>;
  limit: number;
  page: number;
  itemId: string | undefined;
  tags: string[];
};

export const ItemForm: FC<PropsType> = ({
  itemFields,
  collectionId,
  setShowForm,
  limit,
  page,
  itemId,
  tags,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [getItem, { data: itemData, isFetching: isGetItemFetching }] =
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

  const itemSchema = Yup.object().shape({
    title: Yup.string().required(t('error_required')),
    tags: Yup.array().min(1, t('error_tags')),
    itemFields: Yup.object().shape(
      itemFields.reduce((acc, { title, type }) => {
        let validation: any;

        switch (type) {
          case 'date':
            validation = Yup.date().nullable().required(t('error_required'));
            break;
          case 'number':
            validation = Yup.number().required(t('error_required'));
            break;
          case 'check':
            validation = Yup.boolean();
            break;
          case 'text':
          case 'title':
          default:
            validation = Yup.string().required(t('error_required'));
            break;
        }
        acc[title] = validation;

        return acc;
      }, {} as any),
    ),
  });

  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(itemSchema),
  });

  useEffect(() => {
    if (itemId) getItem({ itemId });
  }, [getItem, itemId]);

  useEffect(() => {
    if (itemData) {
      setValue('title', itemData.title);
      setValue('tags', itemData.tags);
      itemData.itemFields.forEach(field =>
        setValue(
          `itemFields.${field.title}`,
          field.type === 'date' ? new Date(field.value as string) : field.value,
        ),
      );
    }
  }, [itemData, setValue]);

  useEffect(() => {
    if (isCreateItemSuccess || isUpdateItemSuccess) {
      resetCreateItem();
      setShowForm(false);
    }
  }, [isCreateItemSuccess, isUpdateItemSuccess, resetCreateItem, setShowForm]);

  const onSubmit = (data: any): void => {
    if (itemId) {
      const payload = {
        ...data,
        itemFields: itemFields.map(field => ({
          ...field,
          value: data.itemFields[field.title],
        })),
      };

      updateItem({ id: itemId, payload, pageInfo: { id: collectionId, limit, page } });

      return;
    }
    const newItem = {
      collection: collectionId,
      ...data,
      itemFields: itemFields.map(field => ({
        ...field,
        value: data.itemFields[field.title],
      })),
    };

    createItem({
      item: newItem,
      pageInfo: {
        id: collectionId,
        limit,
        page,
      },
    });
  };

  const onTagCreate = (query: string): { value: string; label: string } => {
    const item = { value: query, label: query };

    dispatch(
      tagsApi.util.updateQueryData('getTags', undefined, draftPosts => {
        draftPosts.push({ value: query, count: 0 });
      }),
    );

    return item;
  };

  return (
    <Box className={s.width300} mx="auto">
      <LoadingOverlay
        visible={isCreateItemLoading || isGetItemFetching || isUpdateItemLoading}
        overlayBlur={2}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="md">
          <TextInput
            label={<WithStar>{t('label_title')}</WithStar>}
            placeholder={t('placeholder_text_item')}
            defaultValue=""
            error={errors.title?.message?.toString()}
            {...register('title')}
          />
          <AdditionalFieldsList control={control} itemFields={itemFields} />
          <Controller
            control={control}
            name="tags"
            defaultValue={[]}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <MultiSelect
                error={error?.message}
                onChange={value => {
                  onChange(value);
                }}
                value={value}
                icon={<IconHash size={18} />}
                label={<WithStar>{t('label_tags')}</WithStar>}
                data={tags || []}
                placeholder={t('placeholder_text_selectTags')}
                searchable
                creatable
                clearable
                getCreateLabel={query => `+ Create ${query}`}
                onCreate={onTagCreate}
                maxDropdownHeight={120}
              />
            )}
          />

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
