import React, { Dispatch, FC, SetStateAction } from 'react';

import {
  CollectionType,
  GetUserCollectionsResponseType,
} from 'shared/api/collections/types';
import { CollectionCard } from 'shared/components';

type PropsType = {
  collectionsData: GetUserCollectionsResponseType;
  setCollectionForEdit: Dispatch<SetStateAction<CollectionType | null>>;
  setShowForm: Dispatch<SetStateAction<boolean>>;
};

export const CollectionCardsList: FC<PropsType> = ({
  collectionsData,
  setCollectionForEdit,
  setShowForm,
}) => {
  return (
    <>
      {collectionsData.map(
        ({ id, title, description, image, itemFields, owner, topics }) => (
          <CollectionCard
            key={id}
            id={id}
            description={description}
            title={title}
            image={image}
            itemFields={itemFields}
            owner={owner}
            topics={topics}
            setCollectionForEdit={setCollectionForEdit}
            setShowForm={setShowForm}
          />
        ),
      )}
    </>
  );
};
