import { GetCollectionItemsResponseType } from 'shared/api/items/types';

export const prepareDataForCSV = (
  collectionItemsData: GetCollectionItemsResponseType | undefined,
): {}[] => {
  return collectionItemsData
    ? collectionItemsData.items.map(item => {
        const flatItemObject: { [key in string]: any } = {
          ...item,
          tags: item.tags.join('+'),
        };

        delete flatItemObject.itemFields;
        item.itemFields.forEach(itemField => {
          flatItemObject[itemField.title] = itemField.value;
        });

        const objEntry = Object.entries(flatItemObject);

        objEntry.forEach(([key, value]) => {
          if (typeof value === 'string') flatItemObject[key] = value.replace(/\n/g, ' ');
        });

        return flatItemObject;
      })
    : [];
};
