import i18n from 'localization/i18n';

export const getGreetingMessage = (
  loggedUserName: string,
  userNameData:
    | {
        name: string;
      }
    | undefined,
): string => {
  if (userNameData) {
    return loggedUserName === userNameData.name
      ? i18n.t('text_yourCollections')
      : `${i18n.t('text_collectionsOfUser')} ${
          userNameData ? userNameData.name : i18n.t('text_user')
        }`;
  }

  return '';
};
