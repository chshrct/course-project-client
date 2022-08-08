import { UserAccessType, UserStatusType } from './auth';

export type UserType = {
  id: string;
  name: string;
  email: string;
  access: UserAccessType;
  status: UserStatusType;
};
