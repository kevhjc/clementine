import {
  Fragment,
  useState,
  useContext,
  useRef,
  MutableRefObject,
} from 'react';
import { supabase } from './../supabaseClient';
import { Dialog, Transition } from '@headlessui/react';

import { SessionContext } from '../context/SessionContext';

interface IAddTaskProps {
  userEntries: string[];
  setUserEntries: any;
}

const AddTask = ({ userEntries, setUserEntries }: IAddTaskProps) => {
  const session = useContext(SessionContext);
  const [open, setOpen] = useState(true);
  const newTaskTextRef = useRef() as MutableRefObject<any>;
  const cancelButtonRef = useRef(null);

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
      setOpen(false);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-neutral-900 bg-opacity-40 backdrop-blur-sm transition-opacity" />
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block w-[420px] transform overflow-hidden rounded-lg bg-white text-left shadow-md transition-all sm:my-8 sm:align-middle">
              <div className="bg-white px-4 pt-4 pb-4 sm:p-6 sm:pb-4">
                <input
                  ref={newTaskTextRef}
                  type="text"
                  onKeyUp={(e) =>
                    e.key === 'Enter' && addTask() && setOpen(false)
                  }
                  placeholder="Enter a new task..."
                  className={
                    'w-full rounded-lg border bg-white px-4 py-4 text-neutral-900 outline-none dark:border-neutral-600 dark:bg-neutral-900/70 dark:text-neutral-200'
                  }
                />
              </div>
              <div className="border-t bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-sky-500 px-4 py-2 text-base font-medium text-white hover:bg-sky-600 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={addTask}
                >
                  Add task
                </button>
                <button
                  type="submit"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AddTask;
