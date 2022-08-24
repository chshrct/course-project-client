import { CollectionFormInitialValuesType } from 'pages/User/CollectionFormModal/CollectionForm/types';

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
