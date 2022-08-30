import { FC } from 'react';

import {
  ActionIcon,
  Box,
  Button,
  Group,
  LoadingOverlay,
  MultiSelect,
  NativeSelect,
  Space,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { IconPlus } from '@tabler/icons';
import MDEditor from '@uiw/react-md-editor';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';

import { useResetFormAndQuery, useSendFormOnImageUpload } from './hooks';
import { ImageDrop } from './ImageDrop';
import { ItemFieldsList } from './ItemFieldsList';
import s from './style/CollectionForm.module.css';
import {
  addItemFieldHandler,
  getInitialValuesForEdit,
  onSubmitHandler,
  setImageHandler,
} from './utils';

import { selectColorScheme } from 'app';
import {
  useCreateCollectionMutation,
  useGetTopicsQuery,
  useUpdateCollectionMutation,
  useUploadImageMutation,
} from 'shared/api';
import { CollectionType } from 'shared/api/collections/types';
import { WithStar } from 'shared/components';
import { initialValuesForCreation } from 'shared/constants/collections/collectionForm';
import { useAppSelector } from 'store';

type PropsType = {
  setShowForm: (val: boolean) => void;
  collection: CollectionType | null;
};

export const CollectionForm: FC<PropsType> = ({ setShowForm, collection }) => {
  const colorScheme = useAppSelector(selectColorScheme);
  const { id } = useParams();
  const { t } = useTranslation();
  const editMode = !!collection;
  const colId = collection ? collection.id : '';

  const [
    uploadImage,
    {
      data: imageData,
      isSuccess: isUploadSuccess,
      isLoading: isImageLoading,
      reset: imageReset,
    },
  ] = useUploadImageMutation();

  const { data: topicsData, isFetching: isTopicsFetching } = useGetTopicsQuery();

  const [
    createCollection,
    {
      isSuccess: isCreateCollectionSuccess,
      isLoading: isCollectionLoading,
      reset: collectionReset,
    },
  ] = useCreateCollectionMutation();
  const [
    updateCollection,
    {
      isSuccess: isUpdateCollectionSuccess,
      isLoading: isUpdateCollectionLoading,
      reset: updateCollectionReset,
    },
  ] = useUpdateCollectionMutation();

  const isLoading =
    isImageLoading ||
    isTopicsFetching ||
    isCollectionLoading ||
    isUpdateCollectionLoading;

  const collectionSchema = Yup.object().shape({
    title: Yup.string().required(t('error_required')),
    description: Yup.string().required(t('error_required')),
    topics: Yup.array().min(1, t('error_topics')),
  });

  const form = useForm({
    initialValues: editMode
      ? getInitialValuesForEdit(collection)
      : initialValuesForCreation,
    validate: yupResolver(collectionSchema),
  });

  const onSubmit = onSubmitHandler(
    form,
    uploadImage,
    createCollection,
    id,
    updateCollection,
    editMode,
    colId,
  );

  useSendFormOnImageUpload(
    createCollection,
    form,
    id,
    imageData,
    isUploadSuccess,
    updateCollection,
    editMode,
    colId,
  );

  useResetFormAndQuery(
    collectionReset,
    imageReset,
    isCreateCollectionSuccess,
    setShowForm,
    isUpdateCollectionSuccess,
    updateCollectionReset,
  );

  const onAddItemFieldClick = (): void => {
    addItemFieldHandler(form);
  };

  return (
    <Box className={s.width300} mx="auto">
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <form onSubmit={form.onSubmit(onSubmit)} data-color-mode={colorScheme}>
        <TextInput
          label={<WithStar>{t('label_title')}</WithStar>}
          placeholder={t('placeholder_title')}
          {...form.getInputProps('title')}
        />
        <Space h="md" />
        <Text weight={500} size="sm">
          <WithStar>{t('label_description')}</WithStar>
        </Text>
        <MDEditor
          preview="edit"
          {...form.getInputProps('description')}
          className={`${form.errors.description ? s.editorError : ''} ${
            colorScheme === 'dark' ? s.darkbg : ''
          }`}
        />
        {form.errors.description && (
          <Text size="xs" color="red">
            {form.errors.description}
          </Text>
        )}
        <MultiSelect
          mt="md"
          data={topicsData || []}
          label={<WithStar>{t('label_topics')}</WithStar>}
          placeholder={t('placeholder_topics')}
          {...form.getInputProps('topics')}
        />
        <ImageDrop image={form.values.image} setImage={setImageHandler(form)} />
        <Text mt="md" size="md" align="center">
          {t('text_itemsFields')}
        </Text>
        <ItemFieldsList form={form} />
        <Group mt="md" align="flex-start" noWrap>
          <Stack spacing={0} align="flex-start">
            <Text size="sm" weight={500} align="center">
              {t('text_fieldType')}
            </Text>
            <NativeSelect
              className={s.selectWidth}
              data={['title', 'text', 'number', 'date', 'check']}
              value={form.values.itemField.type}
              onChange={e => form.setFieldValue('itemField.type', e.currentTarget.value)}
            />
          </Stack>
          <Stack spacing={0} align="flex-start">
            <Text size="sm" weight={500} align="center">
              {t('text_fieldTitle')}
            </Text>
            <TextInput {...form.getInputProps('itemField.title')} />
          </Stack>
          <ActionIcon
            variant="default"
            onClick={onAddItemFieldClick}
            title={t('button_title_homePage')}
            size="md"
            mt={26}
            disabled={!form.values.itemField.title}
          >
            <IconPlus size={18} />
          </ActionIcon>
        </Group>
        <Group position="center" mt="md">
          <Button type="submit">
            {editMode ? t('modal_submit_text_edit') : t('modal_submit_text_create')}
          </Button>
        </Group>
      </form>
    </Box>
  );
};
