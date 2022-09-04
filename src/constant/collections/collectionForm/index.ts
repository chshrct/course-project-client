import { CollectionFormInitialValuesType } from 'pages/User/components/CollectionFormModal/components/CollectionForm/types';

export const initialValuesForCreation: CollectionFormInitialValuesType = {
  title: '',
  description: '',
  image: null,
  topics: [],
  itemFields: [],
  itemField: {
    type: 'title',
    title: '',
  },
};
