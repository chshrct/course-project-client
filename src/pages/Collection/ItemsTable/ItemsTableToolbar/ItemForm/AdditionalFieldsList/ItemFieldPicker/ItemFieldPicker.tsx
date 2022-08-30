import { FC } from 'react';

import { Checkbox, NumberInput, Stack, Text, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import MDEditor from '@uiw/react-md-editor';
import { useTranslation } from 'react-i18next';

import s from './style/ItemFieldPicker.module.css';

import { selectColorScheme, selectLocale } from 'app';
import { FieldType } from 'shared/api/collections/types';
import { WithStar } from 'shared/components';
import { useAppSelector } from 'store';

type PropsType = {
  field: FieldType;
  value: any;
  onChange: (...event: any[]) => void;
  error: string | undefined;
};

export const ItemFieldPicker: FC<PropsType> = ({ field, onChange, value, error }) => {
  const { t } = useTranslation();
  const locale = useAppSelector(selectLocale);
  const colorScheme = useAppSelector(selectColorScheme);

  switch (field.type) {
    case 'check':
      return <Checkbox label={field.title} checked={value} onChange={onChange} />;
    case 'date':
      return (
        <DatePicker
          error={error}
          locale={locale}
          placeholder={t('placeholder_text_date')}
          label={<WithStar>{field.title}</WithStar>}
          value={value}
          onChange={onChange}
        />
      );
    case 'number':
      return (
        <NumberInput
          error={error}
          placeholder="451"
          label={<WithStar>{field.title}</WithStar>}
          value={value}
          onChange={onChange}
        />
      );
    case 'text':
      return (
        <Stack spacing={0} data-color-mode={colorScheme}>
          <Text weight={500} size="sm">
            <WithStar>{t('label_description')}</WithStar>
          </Text>
          <MDEditor
            value={value}
            onChange={onChange}
            preview="edit"
            className={`${error ? s.editorError : ''} ${
              colorScheme === 'dark' ? s.darkbg : ''
            }`}
          />
          {error && (
            <Text size="xs" color="red">
              {error}
            </Text>
          )}
        </Stack>
        // <Textarea
        //   error={error}
        //   placeholder={t('placeholder_text_text')}
        //   label={<WithStar>{field.title}</WithStar>}
        //   autosize
        //   minRows={3}
        //   value={value}
        //   onChange={onChange}
        // />
      );

    case 'title':
    default:
      return (
        <TextInput
          error={error}
          label={<WithStar>{field.title}</WithStar>}
          placeholder={t('placeholder_text_string')}
          value={value}
          onChange={onChange}
        />
      );
  }
};
