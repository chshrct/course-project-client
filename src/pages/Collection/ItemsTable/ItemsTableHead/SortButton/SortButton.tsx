import { Dispatch, FC, SetStateAction } from 'react';

import { Button } from '@mantine/core';
import { IconArrowNarrowDown, IconArrowNarrowUp } from '@tabler/icons';
import { useTranslation } from 'react-i18next';

import { SortSettingsType } from '../../ItemsTable';

import { FieldTypesType } from 'shared/api/collections/types';

type PropsType = {
  sortSettings: SortSettingsType;
  setSortSettings: Dispatch<SetStateAction<SortSettingsType>>;
  fieldTitle: string;
  fieldType: FieldTypesType;
};

export const SortButton: FC<PropsType> = ({
  setSortSettings,
  sortSettings,
  fieldTitle,
  fieldType,
}) => {
  const { t } = useTranslation();
  const { direction, title } = sortSettings;

  const buttonActive = title === fieldTitle;

  const directionDown = direction === 'down';

  const pickIconDirection = directionDown ? (
    <IconArrowNarrowDown />
  ) : (
    <IconArrowNarrowUp />
  );

  const icon = buttonActive ? pickIconDirection : null;
  const label = fieldTitle === 'title' ? t('label_title') : fieldTitle;

  const buttonTitle =
    fieldTitle !== title || !directionDown
      ? t('button_title_sortDown')
      : t('button_title_sortUp');

  const onButtonClick = (): void => {
    setSortSettings({
      title: fieldTitle,
      direction: fieldTitle !== title || !directionDown ? 'down' : 'up',
      type: fieldType,
    });
  };

  return (
    <Button
      p={0}
      px={5}
      title={buttonTitle}
      rightIcon={icon}
      variant="subtle"
      color={buttonActive ? 'blue' : 'dark'}
      onClick={onButtonClick}
    >
      {label}
    </Button>
  );
};
