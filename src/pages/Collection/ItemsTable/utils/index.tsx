import { ReactNode } from 'react';

import { IconCheck } from '@tabler/icons';

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
      return value;
  }
};
