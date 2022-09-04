import { CollectionFormInitialValuesType } from '../types';

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
