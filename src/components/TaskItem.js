import { useState } from 'react';
import { supabase } from '../supabaseClient';

const TaskItem = ({ task, updateEntryById, onDelete }) => {
  const [isComplete, setIsComplete] = useState(task.is_complete);
  const [editMode, setEditMode] = useState(false);

  const toggleComplete = async () => {
    const { data, error } = await supabase
      .from('entries')
      .update({ is_complete: !isComplete })
      .eq('id', task.id)
      .single();
    if (error) {
      console.error(error);
    }
    setIsComplete(data.is_complete);
  };

  const handleUpdateTask = (id, title) => {
    updateEntryById(id, title);
    setEditMode(!editMode);
  };

  const toggleMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="z-20 mb-1 flex items-start">
      {editMode ? (
        <input
          contentEditable
          suppressContentEditableWarning={true}
          className="absolute h-6 w-6 opacity-0"
          name="checkbox"
          type="checkbox"
          checked={''}
        />
      ) : (
        <input
          id={task.id}
          className="absolute h-6 w-6 opacity-0"
          name="checkbox"
          type="checkbox"
          onChange={toggleComplete}
          checked={isComplete ? true : ''}
        />
      )}
      <div className="mr-2 mt-[1px] flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border-[1.5px] border-neutral-800/70 bg-transparent focus-within:border-sky-400 dark:border-neutral-400">
        <svg
          className="pointer-events-none hidden h-3 w-3 fill-current"
          version="1.1"
          viewBox="0 0 17 12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fillRule="evenodd">
            <g transform="translate(-9 -11)" fill="#0ea5e9" fillRule="nonzero">
              <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
            </g>
          </g>
        </svg>
      </div>
      {editMode && !isComplete ? (
        <p
          id="task-title"
          contentEditable
          suppressContentEditableWarning={true}
          className="z-20 bg-yellow-300/70 font-sans text-lg font-bold outline-none dark:bg-yellow-700/70"
        >
          {task.title}
        </p>
      ) : (
        <p
          htmlFor={task.id}
          onClick={toggleComplete}
          className={`z-40 select-none font-sans text-lg font-bold hover:line-through  ${
            isComplete
              ? 'text-neutral-400 line-through decoration-1 transition-colors duration-150 ease-in-out'
              : ''
          }`}
        >
          {task.title}
        </p>
      )}
      <div className="absolute right-3 z-50 flex justify-center gap-x-3">
        {!isComplete && !editMode ? (
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
              handleUpdateTask(
                task.id,
                document.getElementById('task-title')?.innerText
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
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
