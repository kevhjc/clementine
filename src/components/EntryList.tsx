import * as React from 'react';
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from 'react-beautiful-dnd';

import { Item } from '../typings';
import EntryListItem from './EntryListItem';

interface IDraggableListProps {
  items: Item[];
  category: string;
  onDragEnd: OnDragEndResponder;
}

const EntryList = React.memo(
  ({ items, category, onDragEnd }: IDraggableListProps) => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-list">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={
                snapshot.isDraggingOver
                  ? 'rounded-md bg-neutral-100 transition-colors duration-150 ease-in-out dark:bg-neutral-700'
                  : 'rounded-md transition-colors duration-150 ease-in-out'
              }
            >
              {category !== 'all'
                ? Object.values(items)
                    .filter((item) => item.department === category)
                    .map((item, index) => (
                      <EntryListItem item={item} index={index} key={item.id} />
                    ))
                : Object.values(items).map((item, index) => (
                    <EntryListItem item={item} index={index} key={item.id} />
                  ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
);

export default EntryList;
