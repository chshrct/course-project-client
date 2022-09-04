import { FC } from 'react';

import { Box } from '@mantine/core';
import {
  IconAlignJustified,
  IconBaseline,
  IconCalendar,
  IconCheck,
  IconNumbers,
} from '@tabler/icons';
import { useTranslation } from 'react-i18next';

import { FieldTypesType } from 'api/collections/types';

type PropsType = { type: FieldTypesType };

export const TypesIconPicker: FC<PropsType> = ({ type }) => {
  const { t } = useTranslation();

  switch (type) {
    case 'number':
      return (
        <Box title={t('title_number')} style={{ height: '20px' }}>
          <IconNumbers size={20} />
        </Box>
      );
    case 'title':
      return (
        <Box title={t('title_title')} style={{ height: '20px' }}>
          <IconBaseline size={20} />
        </Box>
      );
    case 'date':
      return (
        <Box title={t('title_date')} style={{ height: '20px' }}>
          <IconCalendar size={20} />
        </Box>
      );
    case 'text':
      return (
        <Box title={t('title_text')} style={{ height: '20px' }}>
          <IconAlignJustified size={20} />
        </Box>
      );
    case 'check':
      return (
        <Box title={t('title_check')} style={{ height: '20px' }}>
          <IconCheck size={20} />
        </Box>
      );
    default:
      return null;
  }
};
