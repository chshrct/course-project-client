import { FC } from 'react';

import { Carousel } from '@mantine/carousel';
import { Group } from '@mantine/core';

import { ItemCard } from './ItemCard/ItemCard';

import { useGetTenLatestItemsQuery } from 'shared/api';

export const LastAddedItems: FC = () => {
  const { data } = useGetTenLatestItemsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (!data) return null;

  return (
    <Carousel
      withControls
      height={200}
      slideSize="24.9%"
      slideGap="xs"
      align="start"
      loop
      breakpoints={[
        { maxWidth: 'lg', slideSize: '33.3333%' },
        { maxWidth: 'md', slideSize: '50%' },
        { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
      ]}
    >
      {data.map(itemData => (
        <Carousel.Slide key={itemData.item.id}>
          <Group position="center">
            <ItemCard itemData={itemData} />
          </Group>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};
