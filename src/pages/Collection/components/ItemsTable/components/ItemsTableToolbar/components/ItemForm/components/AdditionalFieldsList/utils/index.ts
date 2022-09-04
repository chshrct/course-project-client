import { FieldType, FieldTypesType } from 'api';

const getInitialValueFromType = (
  type: FieldTypesType,
): boolean | Date | string | number => {
  switch (type) {
    case 'check':
      return false;
    case 'date':
      return new Date();
    case 'number':
      return 0;
    case 'text':
    case 'title':
    default:
      return '';
  }
};

export const getInitialValues = (
  itemFields: FieldType[],
): {
  [key: string]: number | Date | string | boolean;
} => {
  const initialValues = {} as {
    [key: string]: number | Date | string | boolean;
  };

  itemFields.forEach(field => {
    initialValues[field.title] = getInitialValueFromType(field.type);
  });

  return initialValues;
};
