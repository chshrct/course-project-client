import { FC } from 'react';

import { Text } from '@mantine/core';
import { IconCheck } from '@tabler/icons';
import MDEditor from '@uiw/react-md-editor';

import s from './style/FieldDataPicker.module.css';
import { PropsType } from './types';

import { selectColorScheme, selectLocale } from 'app';
import { useAppSelector } from 'store';

export const FieldDataPicker: FC<PropsType> = ({ type, value }) => {
  const colorScheme = useAppSelector(selectColorScheme);
  const locale = useAppSelector(selectLocale);

  const markdownClass = `${s.markdown} ${colorScheme === 'light' ? s.textDark : ''}`;

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
          <MDEditor.Markdown source={value} className={markdownClass} />
        </Text>
      );
  }
};
