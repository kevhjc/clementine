import { useState } from 'react';
import classNames from 'classnames';

const BookmarkItem = ({ bookmark, updateEntryById, onDelete }) => {
  const [editMode, setEditMode] = useState(false);

  const handleUpdateBookmark = (id, title, content) => {
    if (title.length === 0 || content.length === 0) {
      return;
    } else {
      updateEntryById(id, title, content);
      setEditMode(!editMode);
    }
  };

  const toggleMode = () => {
    setEditMode(!editMode);
  };

  return (
    <>
      <div className="mb-2 flex items-start">
        {editMode ? (
          <span
            id="bookmark-title"
            contentEditable
            suppressContentEditableWarning={true}
            className="... z-20 truncate break-words bg-white font-sans text-lg font-bold leading-6 outline outline-offset-1 outline-neutral-300 dark:bg-neutral-800/50 dark:outline-neutral-500"
          >
            <a
              href={bookmark.content}
              target="_blank"
              rel="noopener noreferrer"
            >
              {bookmark.title ? bookmark.title : bookmark.content}
            </a>
          </span>
        ) : (
          <span className="... z-30 truncate break-words font-sans text-lg font-bold leading-6 decoration-1 underline-offset-1 hover:underline">
            <a
              href={bookmark.content}
              target="_blank"
              rel="noopener noreferrer"
            >
              {bookmark.title ? bookmark.title : bookmark.content}
            </a>
          </span>
        )}
        <div className="absolute right-3 z-50 -mt-[1.5px] flex justify-center gap-x-3 font-sans">
          {!editMode ? (
            <button
              className="hidden flex-shrink-0 rounded border border-neutral-300 bg-white px-2 pb-0.5 transition-all duration-75 ease-in-out hover:bg-neutral-100 group-hover:block dark:border-neutral-500 dark:bg-neutral-800 dark:hover:bg-neutral-700"
              aria-hidden="true"
              onClick={toggleMode}
            >
              {'Edit'}
            </button>
          ) : null}
          {editMode ? (
            <button
              className="hidden flex-shrink-0 rounded border border-black bg-black px-2 pb-0.5 text-white transition-all duration-75 ease-in-out hover:bg-neutral-100 hover:text-black group-hover:block dark:border-white dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-white"
              aria-hidden="true"
              onClick={() =>
                handleUpdateBookmark(
                  bookmark.id,
                  document.getElementById('bookmark-title')?.innerText,
                  document.getElementById('bookmark-url')?.innerText
                )
              }
            >
              {'Save'}
            </button>
          ) : null}
          <button
            className={classNames(
              editMode
                ? 'border-neutral-300 text-neutral-300 hover:bg-white dark:border-neutral-600 dark:text-neutral-500 dark:hover:bg-neutral-800'
                : 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white dark:border-red-500 dark:hover:bg-red-500',
              'hidden flex-shrink-0 rounded border bg-white px-2 pb-0.5 transition-all duration-75 ease-in-out focus:outline-none focus:ring-0 group-hover:block dark:bg-neutral-800'
            )}
            aria-hidden="true"
            disabled={editMode ? true : false}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete();
            }}
          >
            {'Delete'}
          </button>
        </div>
      </div>
      <div className="flex">
        {editMode ? (
          <p
            contentEditable
            suppressContentEditableWarning={true}
            id="bookmark-url"
            className="... mt-1 truncate bg-white font-mono text-sm leading-6 text-neutral-500 outline outline-offset-1 outline-neutral-300 dark:bg-neutral-800/50 dark:text-neutral-400 dark:outline-neutral-500"
          >
            {bookmark.content}
          </p>
        ) : (
          <p className="... mt-1 truncate font-mono text-sm leading-6 text-neutral-500 dark:text-neutral-400">
            {bookmark.content}
          </p>
        )}
      </div>
    </>
  );
};

export default BookmarkItem;
