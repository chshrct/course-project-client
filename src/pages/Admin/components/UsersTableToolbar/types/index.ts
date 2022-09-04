export type PropsType = {
  selectedUsersIds: string[];
  pageProps: { page: number; limit: number };
  setSelectedUserIds: (userIds: string[]) => void;
};
