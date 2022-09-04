import { FC } from 'react';

import { Checkbox } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { PropsType } from './types';

export const UsersTableHead: FC<PropsType> = ({ areUsersChecked, onUsersChange }) => {
  const { t } = useTranslation();

  return (
    <thead>
      <tr>
        <th>
          <Checkbox
            size="xs"
            onChange={onUsersChange}
            checked={areUsersChecked}
            title={t('button_title_toggleAll')}
          />
        </th>
        <th>#</th>
        <th>Id</th>
        <th>{t('label_name')}</th>
        <th>{t('label_email')}</th>
        <th>{t('title_access')}</th>
        <th>{t('title_status')}</th>
      </tr>
    </thead>
  );
};
