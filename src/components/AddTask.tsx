import { useContext, useRef, MutableRefObject } from 'react';
import { supabase } from './../supabaseClient';

import { SessionContext } from '../context/SessionContext';

interface IAddTaskProps {
  userEntries: string[];
  setUserEntries: any;
}

const AddTask = ({ userEntries, setUserEntries }: IAddTaskProps) => {
  const session = useContext(SessionContext);
  const newTaskTextRef = useRef() as MutableRefObject<any>;

  const addTask = async () => {
    let newTaskInput = newTaskTextRef.current.value;
    let title = newTaskInput.trim();
    let { data: tasks, error } = await supabase
      .from('entries')
      .insert({
        title: title,
        user_id: session.user.id,
        category: 'task',
      })
      .single();
    if (error) console.log(error);
    else {
      setUserEntries([tasks, ...userEntries]);
      newTaskTextRef.current.value = '';
    }
  };

  return (
    <div className="flex justify-center">
      <div className="mt-40 rounded-lg border border-red-100 bg-red-50 p-4 duration-300 hover:shadow-lg md:w-3/4 dark:border-neutral-700 dark:bg-neutral-800">
        <div className="relative my-1">
          <input
            ref={newTaskTextRef}
            type="text"
            onKeyUp={(e) => e.key === 'Enter' && addTask()}
            placeholder="Enter a new task..."
            className={
              'mt-1 block w-full rounded-lg bg-white px-4 py-3 pr-28 text-neutral-900 outline-none dark:border-neutral-600 dark:bg-neutral-900/70 dark:text-neutral-200'
            }
          />
          <button
            className="absolute right-1 top-1 flex h-10 w-32 items-center justify-center rounded-md bg-red-500 px-4 font-sans font-medium text-white transition duration-150 ease-in-out hover:bg-red-600 dark:bg-red-700 dark:text-neutral-200"
            type="submit"
            onClick={addTask}
          >
            Add task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
