import { Dispatch, SetStateAction } from 'react';

import { GetAllUsersResponseBodyType } from 'api/users/types';

export type PropsType = {
  usersData: GetAllUsersResponseBodyType;
  setSelectedUserIds: Dispatch<SetStateAction<string[]>>;
  selectedUserIds: string[];
  pageProps: {
    page: number;
    limit: number;
  };
};
