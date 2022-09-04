import { UseFormReturnType } from '@mantine/form';

import { CollectionFormInitialValuesType } from '../../../types';

export type PropsType = {
  form: UseFormReturnType<CollectionFormInitialValuesType>;
  onAddItemFieldClick: () => void;
};
