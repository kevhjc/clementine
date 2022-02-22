import { memo } from 'react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

import { Item } from '../typings';
import NoteItem from './NoteItem';
import TaskItem from './TaskItem';
import BookmarkItem from './BookmarkItem';

interface IEntryProps {
  items: Item[];
  deleteEntryById: (id: string) => void;
}

const EntryList = memo(({ items, deleteEntryById }: IEntryProps) => {
  return (
    <div className="rounded-md">
      {Object.values(items).map((item, index) => (
        <li
          key={index}
          className="group relative z-10 rounded-md p-3 hover:bg-neutral-100 dark:hover:bg-neutral-700"
        >
          <div className="flex flex-col justify-center">
            <Link
              className="absolute inset-0"
              to={`/${item.category}/${item.id}`}
            />
            {item.category === 'task' ? (
              <TaskItem
                key={item.id}
                task={item}
                onDelete={() => deleteEntryById(item.id)}
              />
            ) : item.category === 'bookmark' ? (
              <BookmarkItem
                key={item.id}
                bookmark={item}
                onDelete={() => deleteEntryById(item.id)}
              />
            ) : (
              <NoteItem
                key={item.id}
                note={item}
                onDelete={() => deleteEntryById(item.id)}
              />
            )}
            {item.content ? (
              <span className="... mt-1 truncate font-mono text-sm italic leading-6 text-neutral-500 dark:text-neutral-400">
                {item.content}
              </span>
            ) : null}
            <ul className="mt-1 flex flex-wrap text-sm font-normal leading-6 text-neutral-500 dark:text-neutral-400">
              <li
                className={
                  item.category === 'note'
                    ? 'text-rose-600 dark:text-rose-400'
                    : item.category === 'task'
                    ? 'text-sky-500 dark:text-sky-400'
                    : item.category === 'bookmark'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-neutral-500'
                }
              >
                {item.category}
              </li>
              <li className="mx-2 md:visible">&middot;</li>
              <li className="text-neutral-500">
                {format(new Date(item.inserted_at), "MMM d, yyyy '–' h:mm bb")}
              </li>
            </ul>
          </div>
        </li>
      ))}
    </div>
  );
});

export default EntryList;
