import { UserAccessType, UserStatusType } from './auth';

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

export type UpdateUsersStatusRequestBodyType = GetAllUsersRequestQueryType & {
  userIds: string[];
  status: UserStatusType;
};
export type UpdateUsersStatusResponseBodyType = {
  status: UserStatusType;
};
export type UpdateUsersAccessRequestBodyType = GetAllUsersRequestQueryType & {
  userIds: string[];
  access: UserAccessType;
};
export type UpdateUsersAccessResponseBodyType = {
  access: UserAccessType;
};

export type DeleteUsersRequestBodyType = GetAllUsersRequestQueryType & {
  userIds: string[];
};
