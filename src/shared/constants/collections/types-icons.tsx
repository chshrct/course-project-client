import { ReactElement } from 'react';

import { Box } from '@mantine/core';
import {
  IconAlignJustified,
  IconBaseline,
  IconCalendar,
  IconCheck,
  IconNumbers,
} from '@tabler/icons';

import i18n from 'shared/localization/i18n';

export const typesIcon: { [key: string]: ReactElement } = {
  number: (
    <Box title={i18n.t('title_number')} style={{ height: '20px' }}>
      <IconNumbers size={20} />
    </Box>
  ),
  title: (
    <Box title={i18n.t('title_title')} style={{ height: '20px' }}>
      <IconBaseline size={20} />
    </Box>
  ),
  date: (
    <Box title={i18n.t('title_date')} style={{ height: '20px' }}>
      <IconCalendar size={20} />
    </Box>
  ),
  text: (
    <Box title={i18n.t('title_text')} style={{ height: '20px' }}>
      <IconAlignJustified size={20} />
    </Box>
  ),
  check: (
    <Box title={i18n.t('title_check')} style={{ height: '20px' }}>
      <IconCheck size={20} />
    </Box>
  ),
};
