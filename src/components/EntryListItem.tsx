/* eslint-disable jsx-a11y/anchor-has-content */
import { format } from 'date-fns';

import { Item } from '../typings';

interface IDraggableListItemProps {
  item: Item;
}

const EntryListItem = ({ item }: IDraggableListItemProps) => {
  return (
    <li className="group relative rounded-md p-3 hover:bg-neutral-100 dark:hover:bg-neutral-700">
      <div className="flex flex-col justify-center">
        <span className="text-lg font-medium leading-6">{item.content}</span>
        <ul className="mt-1 flex flex-wrap text-sm font-normal leading-6 text-neutral-500 dark:text-neutral-400">
          <li className="text-neutral-500">
            {format(new Date(item.createdAt), "MMM d, yyyy '–' h:mm bb")}
          </li>
          <li className="mx-2 md:visible">&middot;</li>
          <li className="text-red-400">{item.category}</li>
        </ul>
        <a href="/" className="absolute inset-0 rounded-md" />
      </div>
    </li>
  );
};

export default EntryListItem;
