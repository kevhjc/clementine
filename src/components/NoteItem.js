const NoteItem = ({ note, onDelete }) => {
  return (
    <div className="flex items-start mb-2">
      <span className="font-sans text-lg font-bold leading-6 truncate">
        {note.title ? note.title : 'Untitled'}
      </span>
      <div className="absolute right-3 z-50 -mt-[1.5px] justify-center">
        <button
          className="hidden flex-shrink-0 rounded border border-red-500 bg-white px-2 pb-0.5 font-sans text-red-500 transition-all duration-75 ease-in-out hover:bg-red-500 hover:text-white group-hover:block dark:border-red-500 dark:bg-neutral-800 dark:hover:bg-red-500"
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
