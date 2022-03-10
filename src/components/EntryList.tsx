import { memo } from 'react';
import { useLocation } from 'react-router-dom';

import * as PATHS from '../constants/paths';
import * as PARAMS from '../constants/params';

import { IEntryProps } from '../lib/interfaces';

import EntryItem from './EntryItem';

const EntryList = memo(
  ({ items, updateEntryById, deleteEntryById }: IEntryProps) => {
    const location = useLocation();

    return (
      <div className="rounded-md">
        {items.length === 0 && (
          <li className="relative z-10 p-2 py-6 rounded-md group">
            {location.pathname === PATHS.HOME && (
              <div className="flex flex-col justify-center text-center">
                {'No entries'}
              </div>
            )}
            {location.search === PARAMS.NOTE_PARAMS && (
              <div className="flex flex-col justify-center text-center">
                {'No notes'}
              </div>
            )}
            {location.search === PARAMS.TASK_PARAMS && (
              <div className="flex flex-col justify-center text-center">
                {'No tasks'}
              </div>
            )}
            {location.search === PARAMS.BOOKMARK_PARAMS && (
              <div className="flex flex-col justify-center text-center">
                {'No bookmarks'}
              </div>
            )}
          </li>
        )}
        {Object.values(items).map((item, index) => (
          <li key={index} className="relative z-10 p-2 rounded-md">
            <div className="flex flex-col justify-center">
              <EntryItem
                key={item.id}
                item={item}
                updateEntryById={updateEntryById}
                onDelete={() => deleteEntryById(item.id)}
              />
            </div>
          </li>
        ))}
      </div>
    );
  }
);

export default EntryList;
