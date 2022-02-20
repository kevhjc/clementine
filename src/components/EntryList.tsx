import { memo } from 'react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

import { Item } from '../typings';

interface IDraggableListProps {
  items: Item[];
}

const EntryList = memo(({ items }: IDraggableListProps) => {
  return (
    <div className={'rounded-md'}>
      {Object.values(items).map((item, index) => (
        <li
          key={index}
          className="group relative rounded-md p-3 hover:bg-neutral-100 dark:hover:bg-neutral-700"
        >
          <div className="flex flex-col justify-center">
            <span className="text-lg font-medium leading-6">
              {item.content}
            </span>
            <ul className="mt-1 flex flex-wrap text-sm font-normal leading-6 text-neutral-500 dark:text-neutral-400">
              <li className="text-neutral-500">
                {format(new Date(item.inserted_at), "MMM d, yyyy '–' h:mm bb")}
              </li>
              <li className="mx-2 md:visible">&middot;</li>
              <li
                className={
                  item.category === 'note'
                    ? 'text-red-400'
                    : item.category === 'task'
                    ? 'text-blue-400'
                    : item.category === 'bookmark'
                    ? 'text-purple-400'
                    : 'text-neutral-500'
                }
              >
                {item.category}
              </li>
            </ul>
            <Link
              className="absolute inset-0"
              to={`/${item.category}/${item.id}`}
            ></Link>
          </div>
        </li>
      ))}
    </div>
  );
});

export default EntryList;
