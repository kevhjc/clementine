import { memo } from 'react';

import { Item } from '../typings';
import EntryListItem from './EntryListItem';

interface IDraggableListProps {
  items: Item[];
}

const EntryList = memo(({ items }: IDraggableListProps) => {
  return (
    <div className={'rounded-md'}>
      {Object.values(items).map((item) => (
        <EntryListItem item={item} key={item.id} />
      ))}
    </div>
  );
});

export default EntryList;
