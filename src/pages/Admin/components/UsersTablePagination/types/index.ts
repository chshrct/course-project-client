import { Dispatch, SetStateAction } from 'react';

export type PropsType = {
  onLimitChange: (value: string) => void;
  pageProps: {
    page: number;
    limit: number;
  };
  setPage: Dispatch<SetStateAction<number>>;
  pagesTotal: number;
};
