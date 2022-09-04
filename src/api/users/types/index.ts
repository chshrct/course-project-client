import { UserAccessType, UserStatusType } from '../../auth/types';

export type UserType = {
  id: string;
  name: string;
  email: string;
  access: UserAccessType;
  status: UserStatusType;
};

export type GetAllUsersRequestQueryType = {
  page: number;
  limit: number;
};

export type GetAllUsersResponseBodyType = {
  users: UserType[];
  count: number;
};
export type UpdateUsersRequestBodyType = {
  pageInfo: GetAllUsersRequestQueryType;
  userIds: string[];
  update: { access?: UserAccessType; status?: UserStatusType };
};

export type UpdateUsersResponseBodyType = {
  users: UserType[];
};

export type DeleteUsersRequestBodyType = GetAllUsersRequestQueryType & {
  userIds: string[];
};
