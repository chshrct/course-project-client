import { Dispatch, SetStateAction } from 'react';

import { FieldTypesType } from 'api';
import { SortSettingsType } from 'pages/Collection/components/ItemsTable/types';

export type PropsType = {
  sortSettings: SortSettingsType;
  setSortSettings: Dispatch<SetStateAction<SortSettingsType>>;
  fieldTitle: string;
  fieldType: FieldTypesType;
};
