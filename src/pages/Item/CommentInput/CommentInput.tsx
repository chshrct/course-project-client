import { FC, useEffect } from 'react';

import { Box, Button, Stack, Textarea } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import s from './style/CommentInput.module.css';

import { useCreateCommentMutation } from 'api';
import { selectUserId } from 'app';
import { useAppSelector } from 'store';

type FieldValues = {
  message: string;
};

type PropsType = {
  item: string;
};

export const CommentInput: FC<PropsType> = ({ item }) => {
  const { t } = useTranslation();
  const user = useAppSelector(selectUserId);
  const [createComment, { isLoading, isSuccess }] = useCreateCommentMutation();

  const { handleSubmit, register, watch, reset } = useForm<FieldValues>();

  useEffect(() => {
    if (isSuccess) reset();
  }, [isSuccess, reset]);

  const onSubmit = (values: FieldValues): void => {
    createComment({ message: values.message, item, user });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.formSize}>
      <Stack spacing="xs">
        <Textarea
          label={t('comment_input_label')}
          {...register('message')}
          disabled={isLoading}
        />
        <Box>
          <Button
            type="submit"
            disabled={watch().message?.length === 0}
            loading={isLoading}
          >
            {t('comment_button_text')}
          </Button>
        </Box>
      </Stack>
    </form>
  );
};
