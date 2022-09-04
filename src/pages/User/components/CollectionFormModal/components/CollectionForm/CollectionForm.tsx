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

import { ImageDrop, ItemFieldsList } from './components';
import { useResetFormAndQuery, useSendFormOnImageUpload } from './hooks';
import s from './style/CollectionForm.module.css';
import { PropsType } from './types';
import {
  addItemFieldHandler,
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
import { initialValuesForCreation } from 'constant/collections/collectionForm';
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

  const collectionSchema = Yup.object().shape({
    title: Yup.string().required(t('error_required')),
    description: Yup.string().required(t('error_required')),
    topics: Yup.array().min(1, t('error_topics')),
  });

  const form = useForm({
    initialValues: isModeEdit
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
    isModeEdit,
    collectionId,
  );

  useSendFormOnImageUpload(
    createCollection,
    form,
    id,
    imageData,
    isUploadSuccess,
    updateCollection,
    isModeEdit,
    collectionId,
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
            {isModeEdit ? t('modal_submit_text_edit') : t('modal_submit_text_create')}
          </Button>
        </Group>
      </form>
    </Box>
  );
};
