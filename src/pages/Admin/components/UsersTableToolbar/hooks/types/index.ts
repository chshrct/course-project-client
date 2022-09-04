import { UpdateUsersResponseBodyType } from 'api/users/types';
import { AppDispatch } from 'store';

export type UseSelfBlockOrAccessDowngradeArgsType = {
  dispatch: AppDispatch;
  isUpdateSuccess: boolean;
  signedInUserId: string;
  selectedUsersIds: string[];
  usersData: UpdateUsersResponseBodyType | undefined;
};

export type UseSelfDeleteType = {
  dispatch: AppDispatch;
  isDeleteSuccess: boolean;
  signedInUserId: string;
  selectedUsersIds: string[];
};
