export type UserAccessType = 'basic' | 'admin';
export type UserStatusType = 'blocked' | 'active';

export type TokenPayloadType = { _id: string; access: UserAccessType };

export type SignUpRequestBodyType = {
  email: string;
  name: string;
  password: string;
};

export type SignInRequestBodyType = {
  email: string;
  password: string;
};

export type SignInResponseBodyType = {
  id: string;
  name: string;
  access: UserAccessType;
  token: string;
};

export type AuthMiddlewareBodyType = {
  tokenPayload: TokenPayloadType;
};

export type AuthCheckResponseBodyType = {
  id: string;
  name: string;
  access: UserAccessType;
};
