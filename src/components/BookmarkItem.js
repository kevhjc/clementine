const BookmarkItem = ({ bookmark, onDelete }) => {
  return (
    <div className="mb-1 flex items-center">
      <span className="z-20 break-words font-sans text-lg font-bold leading-6 underline hover:no-underline">
        <a href={bookmark.content} target="_blank" rel="noopener noreferrer">
          {bookmark.title}
        </a>
      </span>
      <div className="absolute right-3 justify-center">
        <button
          className="hidden flex-shrink-0 rounded bg-neutral-200 px-2 pb-0.5 transition-all duration-75 ease-in-out hover:bg-orange-600 hover:text-white group-hover:block dark:bg-neutral-600"
          aria-hidden="true"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookmarkItem;
