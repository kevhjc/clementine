import { useState } from 'react';

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
            className="z-20 break-words bg-yellow-300/70 font-sans text-lg font-bold leading-6 outline-none dark:bg-yellow-700/70"
          >
            <a
              href={bookmark.content}
              target="_blank"
              rel="noopener noreferrer"
            >
              {bookmark.title}
            </a>
          </span>
        ) : (
          <span className="z-20 break-words font-sans text-lg font-bold leading-6 underline underline-offset-1 hover:no-underline">
            <a
              href={bookmark.content}
              target="_blank"
              rel="noopener noreferrer"
            >
              {bookmark.title}
            </a>
          </span>
        )}
        <div className="absolute right-3 z-50 flex justify-center gap-x-3">
          {!editMode ? (
            <button
              className="hidden flex-shrink-0 rounded bg-neutral-200 px-2 pb-0.5 transition-all duration-75 ease-in-out hover:bg-neutral-300 group-hover:block dark:bg-neutral-600 dark:hover:bg-neutral-500"
              aria-hidden="true"
              onClick={toggleMode}
            >
              {'Edit'}
            </button>
          ) : null}
          {editMode ? (
            <button
              className="hidden flex-shrink-0 rounded bg-neutral-200 px-2 pb-0.5 transition-all duration-75 ease-in-out hover:bg-neutral-300 group-hover:block dark:bg-neutral-600 dark:hover:bg-neutral-500"
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
            className="hidden flex-shrink-0 rounded bg-neutral-200 px-2 pb-0.5 transition-all duration-75 ease-in-out hover:bg-red-600 hover:text-white group-hover:block dark:bg-neutral-600"
            aria-hidden="true"
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
      <div>
        {editMode ? (
          <span
            contentEditable
            suppressContentEditableWarning={true}
            id="bookmark-url"
            className="... truncate bg-yellow-300/70 font-mono text-sm italic leading-6 text-neutral-500 outline-none dark:bg-yellow-700/70 dark:text-neutral-400"
          >
            {bookmark.content}
          </span>
        ) : (
          <span className="... truncate font-mono text-sm italic leading-6 text-neutral-500 dark:text-neutral-400">
            {bookmark.content}
          </span>
        )}
      </div>
    </>
  );
};

export default BookmarkItem;
