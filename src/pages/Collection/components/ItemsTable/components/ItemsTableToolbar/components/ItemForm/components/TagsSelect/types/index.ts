import { Control, FieldValues } from 'react-hook-form';

export type PropsType = {
  control: Control<FieldValues, any>;
  tags: string[];
};
