import { useEffect } from 'react';

import { UseSuccessDeleteArgType } from '../types';

export const useSuccessDelete = ({
  isCollectionEmpty,
  isDeleteSuccess,
  page,
  resetDelete,
  setPage,
  setSelectedItemsIds,
}: UseSuccessDeleteArgType): void => {
  useEffect(() => {
    if (isDeleteSuccess) setSelectedItemsIds([]);
  }, [isDeleteSuccess, setSelectedItemsIds]);

  useEffect(() => {
    if (isDeleteSuccess && isCollectionEmpty && page > 1) {
      setPage(page => page - 1);
      resetDelete();
    }
  }, [isCollectionEmpty, isDeleteSuccess, page, resetDelete, setPage]);
};
