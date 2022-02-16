/* eslint-disable jsx-a11y/anchor-has-content */
import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { format } from 'date-fns';
import { CaretSortIcon } from '@radix-ui/react-icons';

import { Item } from '../typings';

interface IDraggableListItemProps {
  item: Item;
  index: number;
}

const EntryListItem = ({ item, index }: IDraggableListItemProps) => {
  return (
    <Draggable draggableId={item.id} index={index} key={index}>
      {(provided, snapshot) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={
            snapshot.isDragging
              ? 'group relative rounded-md bg-red-50 p-3 dark:bg-red-300'
              : 'group relative rounded-md p-3 hover:bg-neutral-200 dark:hover:bg-neutral-700'
          }
        >
          <div className="flex flex-col justify-center">
            <div className="absolute -ml-14">
              <CaretSortIcon
                className="hidden h-6 w-6 flex-shrink-0 group-hover:block"
                aria-hidden="true"
              />
            </div>
            <span
              className={
                snapshot.isDragging
                  ? 'text-lg font-medium leading-6 text-neutral-900'
                  : 'text-lg font-medium leading-6'
              }
            >
              {item.primary}
            </span>
            <ul className="mt-1 flex flex-wrap text-sm font-normal leading-6 text-neutral-500 dark:text-neutral-400">
              <li
                className={
                  snapshot.isDragging ? 'text-neutral-800' : 'text-neutral-500'
                }
              >
                {format(new Date(item.secondary), "MMM d, yyyy '–' h:mm bb")}
              </li>
              <li
                className={
                  snapshot.isDragging
                    ? 'mx-2 text-neutral-800 md:visible'
                    : 'mx-2 md:visible'
                }
              >
                &middot;
              </li>
              <li
                className={
                  snapshot.isDragging ? 'text-red-700' : 'text-red-400'
                }
              >
                {item.department}
              </li>
            </ul>
            <a href="/" className="absolute inset-0 rounded-md" />{' '}
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default EntryListItem;
