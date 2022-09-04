import React, { Dispatch, FC, SetStateAction } from 'react';

import { Carousel } from '@mantine/carousel';
import { Group } from '@mantine/core';

import { useGetFiveBiggestCollectionsQuery } from 'api';
import { CollectionType } from 'api/collections/types';
import { CollectionCard } from 'components';

type PropsType = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setCollectionForEdit: Dispatch<SetStateAction<CollectionType | null>>;
};

export const LargeCollections: FC<PropsType> = ({
  setCollectionForEdit,
  setIsModalOpen,
}) => {
  const { data } = useGetFiveBiggestCollectionsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (!data || data.length < 1) return null;

  return (
    <Carousel
      withControls
      slideSize="24.9%"
      slideGap="xs"
      align="start"
      breakpoints={[
        { maxWidth: 'lg', slideSize: '33.3333%' },
        { maxWidth: 'md', slideSize: '50%' },
        { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
      ]}
      styles={{
        root: {
          maxWidth: '100%',
        },
        controls: {
          top: 210,
        },
      }}
      loop
    >
      {data.map(collection => (
        <Carousel.Slide key={collection.id}>
          <Group position="center">
            <CollectionCard
              collection={collection}
              setCollectionForEdit={setCollectionForEdit}
              setShowForm={setIsModalOpen}
            />
          </Group>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};
