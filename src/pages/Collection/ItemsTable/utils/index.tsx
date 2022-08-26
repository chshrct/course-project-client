import { ReactNode } from 'react';

import { Text } from '@mantine/core';
import { IconCheck } from '@tabler/icons';
import ReactMarkdown from 'react-markdown';

import s from '../../CollectionInfo/style/CollectionInfo.module.css';

import { FieldTypesType } from 'shared/api/collections/types';

export const formatFieldData = (value: any, type: FieldTypesType): ReactNode => {
  switch (type) {
    case 'check':
      return value ? <IconCheck /> : null;
    case 'date':
      return new Date(value).toLocaleDateString();
    case 'number':
      return value.toString();

    default:
      return (
        <Text size="md" lineClamp={2}>
          <ReactMarkdown className={`${s.whitespace} ${s.maxWidth300}`}>
            {value as string}
          </ReactMarkdown>
        </Text>
      );
  }
};
