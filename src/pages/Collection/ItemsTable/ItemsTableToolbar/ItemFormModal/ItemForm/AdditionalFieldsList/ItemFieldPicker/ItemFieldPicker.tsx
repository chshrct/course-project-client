import { FC } from 'react';

import { Checkbox, NumberInput, Textarea, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useTranslation } from 'react-i18next';

import { selectLocale } from 'app';
import { FieldType } from 'shared/api/collections/types';
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

  switch (field.type) {
    case 'check':
      return <Checkbox label={field.title} checked={value} onChange={onChange} />;
    case 'date':
      return (
        <DatePicker
          error={error}
          locale={locale}
          placeholder={t('placeholder_text_date')}
          label={field.title}
          value={value}
          onChange={onChange}
        />
      );
    case 'number':
      return (
        <NumberInput
          error={error}
          placeholder="451"
          label={field.title}
          value={value}
          onChange={onChange}
        />
      );
    case 'text':
      return (
        <Textarea
          error={error}
          placeholder={t('placeholder_text_text')}
          label={field.title}
          autosize
          minRows={3}
          value={value}
          onChange={onChange}
        />
      );

    case 'title':
    default:
      return (
        <TextInput
          error={error}
          label={field.title}
          placeholder={t('placeholder_text_string')}
          value={value}
          onChange={onChange}
        />
      );
  }
};
