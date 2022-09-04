import { FieldType } from 'api';

export type PropsType = {
  field: FieldType;
  value: any;
  onChange: (...event: any[]) => void;
  error: string | undefined;
};
