const NoteItem = ({ note, onDelete }) => {
  return (
    <div className="mb-1 flex items-start">
      <span className="... truncate font-sans text-lg font-bold leading-6">
        {note.title ? note.title : 'Untitled'}
      </span>
      <div className="absolute right-3 z-50 -mt-[1.5px] justify-center">
        <button
          className="hidden flex-shrink-0 rounded border border-neutral-300 bg-white px-2 pb-0.5 font-sans text-red-500 transition-all duration-75 ease-in-out hover:bg-neutral-100 group-hover:block dark:border-neutral-500 dark:bg-neutral-700 dark:hover:bg-neutral-600"
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

export default NoteItem;
