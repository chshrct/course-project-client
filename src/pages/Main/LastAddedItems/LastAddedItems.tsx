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
    <Carousel withControls height={200} slideSize="33%" slideGap="xs" align="center" loop>
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
