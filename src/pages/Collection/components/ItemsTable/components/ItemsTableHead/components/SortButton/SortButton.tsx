import { FC } from 'react';

import { Button } from '@mantine/core';
import { IconArrowNarrowDown, IconArrowNarrowUp } from '@tabler/icons';
import { useTranslation } from 'react-i18next';

import { PropsType } from './types';

export const SortButton: FC<PropsType> = ({
  setSortSettings,
  sortSettings,
  fieldTitle,
  fieldType,
}) => {
  const { t } = useTranslation();
  const { direction, title } = sortSettings;
  const isButtonActive = title === fieldTitle;
  const isDirectionDown = direction === 'down';
  const directionIcon = isDirectionDown ? <IconArrowNarrowDown /> : <IconArrowNarrowUp />;
  const icon = isButtonActive ? directionIcon : null;
  const label = fieldTitle === 'title' ? t('label_title') : fieldTitle;
  const buttonTitle =
    fieldTitle !== title || !isDirectionDown
      ? t('button_title_sortDown')
      : t('button_title_sortUp');

  const onButtonClick = (): void => {
    setSortSettings({
      title: fieldTitle,
      direction: fieldTitle !== title || !isDirectionDown ? 'down' : 'up',
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
      color={isButtonActive ? 'blue' : 'dark'}
      onClick={onButtonClick}
    >
      {label}
    </Button>
  );
};
