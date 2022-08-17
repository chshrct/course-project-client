import { FC } from 'react';

import { useParams } from 'react-router-dom';

export const Collection: FC = () => {
  const { id } = useParams();

  return <div>Collection id: {id}</div>;
};
