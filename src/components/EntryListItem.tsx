import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { CaretSortIcon } from '@radix-ui/react-icons';

import { Item } from '../typings';

interface IDraggableListItemProps {
  item: Item;
  index: number;
}

const EntryListItem = ({ item, index }: IDraggableListItemProps) => {
  return (
    <Draggable draggableId={item.id} index={index} key={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='group relative p-3 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700'
        >
          <div className='flex flex-col justify-center'>
            <div className='-ml-14 absolute'>
              <CaretSortIcon
                className='hidden group-hover:block flex-shrink-0 h-6 w-6'
                aria-hidden='true'
              />
            </div>

            <span className='font-medium text-lg leading-5'>
              {item.primary}
            </span>
            <ul className='flex text-md mt-1 space-x-2 font-normal leading-4 text-neutral-500 dark:text-neutral-400'>
              <li className='text-gray-500'>{item.secondary}</li>
              <li>&middot;</li>
              <li className='text-red-400'>{item.department}</li>
            </ul>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default EntryListItem;
