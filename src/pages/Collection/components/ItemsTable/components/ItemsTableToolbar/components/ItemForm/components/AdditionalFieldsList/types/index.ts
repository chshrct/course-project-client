import { Control, FieldValues } from 'react-hook-form';

import { FieldType } from 'api';

export type PropsType = {
  itemFields: FieldType[];
  control: Control<FieldValues, any>;
};
