import { FC } from 'react';

import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  MultiSelect,
  Space,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import MDEditor from '@uiw/react-md-editor';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { ImageDrop, ItemFieldsCreator, ItemFieldsList } from './components';
import { initialValuesForCreation } from './constant';
import { useResetFormAndQuery, useSendFormOnImageUpload } from './hooks';
import s from './style/CollectionForm.module.css';
import { PropsType } from './types';
import {
  addItemFieldHandler,
  getCollectionSchema,
  getInitialValuesForEdit,
  onSubmitHandler,
  setImageHandler,
} from './utils';

import {
  useCreateCollectionMutation,
  useGetTopicsQuery,
  useUpdateCollectionMutation,
  useUploadImageMutation,
} from 'api';
import { selectColorScheme } from 'app';
import { WithStar } from 'components';
import { useAppSelector } from 'store';

export const CollectionForm: FC<PropsType> = ({ setShowForm, collection }) => {
  const colorScheme = useAppSelector(selectColorScheme);
  const { id } = useParams();
  const { t } = useTranslation();
  const isModeEdit = !!collection;
  const collectionId = collection ? collection.id : '';

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

  const form = useForm({
    initialValues: isModeEdit
      ? getInitialValuesForEdit(collection)
      : initialValuesForCreation,
    validate: yupResolver(getCollectionSchema()),
  });

  const onSubmit = onSubmitHandler({
    form,
    uploadImage,
    createCollection,
    id,
    updateCollection,
    isModeEdit,
    collectionId,
  });

  useSendFormOnImageUpload({
    createCollection,
    form,
    id,
    imageData,
    isUploadSuccess,
    updateCollection,
    isModeEdit,
    collectionId,
  });

  useResetFormAndQuery({
    collectionReset,
    imageReset,
    isCreateCollectionSuccess,
    setShowForm,
    isUpdateCollectionSuccess,
    updateCollectionReset,
  });

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
        <Space h="md" />
        <ItemFieldsList form={form} isModeEdit={isModeEdit} />
        {!isModeEdit && (
          <ItemFieldsCreator form={form} onAddItemFieldClick={onAddItemFieldClick} />
        )}
        <Group position="center" mt="md">
          <Button type="submit">
            {isModeEdit ? t('modal_submit_text_edit') : t('modal_submit_text_create')}
          </Button>
        </Group>
      </form>
    </Box>
  );
};
