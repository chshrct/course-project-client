import { SortSettingsType } from '../../ItemsTable';

import { GetCollectionItemsResponseType, ItemFieldType } from 'shared/api/items/types';

export const filterItems = (
  tags: string[],
  items: GetCollectionItemsResponseType,
): {
  id: string;
  title: string;
  tags: string[];
  itemFields: ItemFieldType[];
}[] =>
  tags.length
    ? items.items.filter(item => tags.every(tag => item.tags.includes(tag)))
    : items.items;

const getItemFieldValue = (
  title: string,
  item: {
    id: string;
    title: string;
    tags: string[];
    itemFields: ItemFieldType[];
  },
): any => item.itemFields.find(field => field.title === title)?.value;

export const sortItems = (
  sortSettings: SortSettingsType,
  items: {
    id: string;
    title: string;
    tags: string[];
    itemFields: ItemFieldType[];
  }[],
): {
  id: string;
  title: string;
  tags: string[];
  itemFields: ItemFieldType[];
}[] => {
  const { direction, title, type } = sortSettings;

  const sortedItems = [...items];

  if (!title) return items;

  const directionDown = direction === 'down';

  if (title === 'title')
    return sortedItems.sort((a, b) =>
      directionDown ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title),
    );
  switch (type) {
    case 'text':
    case 'title':
      return sortedItems.sort((a, b) => {
        const valA = getItemFieldValue(title, a);
        const valB = getItemFieldValue(title, b);

        return directionDown ? valA.localeCompare(valB) : valB.localeCompare(valA);
      });
    case 'check':
      return sortedItems.sort((a, b) => {
        const valA = getItemFieldValue(title, a);
        const valB = getItemFieldValue(title, b);

        return directionDown ? Number(valB) - Number(valA) : Number(valA) - Number(valB);
      });
    case 'number':
      return sortedItems.sort((a, b) => {
        const valA = getItemFieldValue(title, a);
        const valB = getItemFieldValue(title, b);

        return directionDown ? valA - valB : valB - valA;
      });
    case 'date':
      return sortedItems.sort((a, b) => {
        const valA = new Date(getItemFieldValue(title, a));
        const valB = new Date(getItemFieldValue(title, b));

        return directionDown
          ? valA.getTime() - valB.getTime()
          : valB.getTime() - valA.getTime();
      });

    default:
      return items;
  }
};
