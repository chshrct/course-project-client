import { ChangeEventHandler } from 'react';

export type PropsType = {
  areUsersChecked: boolean;
  onUsersChange: ChangeEventHandler<HTMLInputElement>;
};
