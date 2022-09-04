export const topicBadgeColorPicker = (title: string): string => {
  switch (title) {
    case 'Books':
      return 'green';
    case 'Movies':
      return 'orange';
    case 'Cars':
      return 'yellow';
    case 'Drinks':
      return 'indigo';
    case 'Places':
      return 'teal';

    default:
      return 'green';
  }
};
