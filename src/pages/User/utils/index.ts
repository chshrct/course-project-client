import { TFunction } from 'react-i18next';

export const getGreetingMessage = (
  loggedUserName: string,
  userNameData:
    | {
        name: string;
      }
    | undefined,
  t: TFunction<'translation', undefined>,
): string => {
  if (userNameData) {
    return loggedUserName === userNameData.name
      ? t('text_yourCollections')
      : `${t('text_collectionsOfUser')} ${
          userNameData ? userNameData.name : t('text_user')
        }`;
  }

  return '';
};
