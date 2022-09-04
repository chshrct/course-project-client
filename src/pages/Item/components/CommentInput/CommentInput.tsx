import { FC, useEffect } from 'react';

import { Box, Button, Stack, Textarea } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import s from './style/CommentInput.module.css';
import { FieldValues, PropsType } from './types';

import { useCreateCommentMutation } from 'api';
import { selectUserId } from 'app';
import { useAppSelector } from 'store';

export const CommentInput: FC<PropsType> = ({ itemId }) => {
  const { t } = useTranslation();
  const userId = useAppSelector(selectUserId);
  const [
    createComment,
    { isLoading: isCreateCommentLoading, isSuccess: isCreateCommentSuccess },
  ] = useCreateCommentMutation();

  const { handleSubmit, register, watch, reset } = useForm<FieldValues>();

  const isSendDisabled = watch().message?.length === 0;

  useEffect(() => {
    if (isCreateCommentSuccess) reset();
  }, [isCreateCommentSuccess, reset]);

  const onSubmit = (values: FieldValues): void => {
    createComment({ message: values.message, item: itemId, user: userId });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.formSize}>
      <Stack spacing="xs">
        <Textarea
          label={t('comment_input_label')}
          {...register('message')}
          disabled={isCreateCommentLoading}
        />
        <Box>
          <Button
            type="submit"
            disabled={isSendDisabled}
            loading={isCreateCommentLoading}
          >
            {t('comment_button_text')}
          </Button>
        </Box>
      </Stack>
    </form>
  );
};
