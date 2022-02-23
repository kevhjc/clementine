const NoteItem = ({ note, onDelete }) => {
  return (
    <div className="mb-1 flex items-start">
      <span className="font-sans text-lg font-bold leading-6">
        {note.title}
      </span>
      <div className="absolute right-3 z-50 justify-center">
        <button
          className="hidden flex-shrink-0 rounded bg-neutral-200 px-2 pb-0.5 transition-all duration-75 ease-in-out hover:bg-red-600 hover:text-white group-hover:block dark:bg-neutral-600"
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
