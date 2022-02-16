/* eslint-disable jsx-a11y/anchor-has-content */
import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { format, formatDistance, formatRelative, subDays } from 'date-fns';
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
            <span className='font-medium text-lg leading-6'>
              {item.primary}
            </span>
            <ul className='flex flex-wrap text-sm mt-1 font-normal leading-6 text-neutral-500 dark:text-neutral-400'>
              <li className='text-gray-500'>
                {format(new Date(item.secondary), "MMM d, yyyy '–' h:mm bb")}
              </li>
              <li className='mx-2 md:visible'>&middot;</li>
              <li className='text-red-400'>{item.department}</li>
            </ul>
            <a href='/' className='absolute inset-0 rounded-md' />{' '}
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default EntryListItem;
