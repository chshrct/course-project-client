import { FC } from 'react';

import { Checkbox, NumberInput, Stack, Text, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import MDEditor from '@uiw/react-md-editor';
import { useTranslation } from 'react-i18next';

import s from './style/ItemFieldPicker.module.css';
import { PropsType } from './types';

import { selectColorScheme, selectLocale } from 'app';
import { WithStar } from 'components';
import { useAppSelector } from 'store';

export const ItemFieldPicker: FC<PropsType> = ({ field, onChange, value, error }) => {
  const { t } = useTranslation();
  const locale = useAppSelector(selectLocale);
  const colorScheme = useAppSelector(selectColorScheme);

  const label = <WithStar>{field.title}</WithStar>;

  switch (field.type) {
    case 'check':
      return <Checkbox label={field.title} checked={value} onChange={onChange} />;
    case 'date':
      return (
        <DatePicker
          error={error}
          locale={locale}
          placeholder={t('placeholder_text_date')}
          label={label}
          value={value}
          onChange={onChange}
        />
      );
    case 'number':
      return (
        <NumberInput
          precision={1}
          step={0.1}
          error={error}
          placeholder="451"
          label={label}
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
      );

    case 'title':
    default:
      return (
        <TextInput
          error={error}
          label={label}
          placeholder={t('placeholder_text_string')}
          value={value}
          onChange={onChange}
        />
      );
  }
};
