import { FC } from 'react';

import { Text } from '@mantine/core';
import { IconCheck } from '@tabler/icons';
import MDEditor from '@uiw/react-md-editor';

import s from './style/FieldDataPicker.module.css';

import { selectColorScheme, selectLocale } from 'app';
import { FieldTypesType } from 'shared/api/collections/types';
import { useAppSelector } from 'store';

type PropsType = {
  value: any;
  type: FieldTypesType;
};

export const FieldDataPicker: FC<PropsType> = ({ type, value }) => {
  const colorScheme = useAppSelector(selectColorScheme);
  const locale = useAppSelector(selectLocale);

  switch (type) {
    case 'check':
      return value ? <IconCheck /> : null;
    case 'date':
      return new Date(value).toLocaleDateString(locale);
    case 'number':
      return value;

    default:
      return (
        <Text size="md" lineClamp={2}>
          <MDEditor.Markdown
            source={value}
            className={`${s.markdown} ${colorScheme === 'light' ? s.textDark : ''}`}
          />
        </Text>
      );
  }
};
