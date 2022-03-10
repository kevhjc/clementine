import { useState } from 'react';
import { supabase } from '../lib/supabase';
import classNames from 'classnames';
import format from 'date-fns/format';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronRightIcon } from '@radix-ui/react-icons';

const EntryItem = ({ item, updateEntryById, onDelete }: any) => {
  const [isComplete, setIsComplete] = useState(item.is_complete);
  const [editMode, setEditMode] = useState(false);

  const toggleComplete = async () => {
    const { data, error } = await supabase
      .from('entries')
      .update({ is_complete: !isComplete })
      .eq('id', item.id)
      .single();
    if (error) {
      console.error(error);
    }
    setIsComplete(data.is_complete);
  };

  const handleUpdateEntry = (id: any, title: any, content: any) => {
    updateEntryById(id, title, content);
    toggleMode();
  };

  const toggleMode = () => {
    setEditMode(!editMode);
  };

  return (
    <Disclosure>
      {({ open, close }) => (
        <>
          <div className="flex items-center p-2 space-y-2 text-sm font-medium rounded hover:bg-neutral-200/30 focus:outline-none focus-visible:ring focus-visible:ring-neutral-500 focus-visible:ring-opacity-75 dark:hover:bg-neutral-600/20">
            <div className="flex-col justify-start pl-2 space-y-2 basis-11/12">
              <div className="flex items-start">
                {item.category === 'task' ? (
                  <>
                    <input
                      name="checkbox"
                      type="checkbox"
                      className="absolute w-6 h-6 opacity-0 cursor-pointer"
                      onChange={() => {
                        toggleComplete();
                      }}
                      checked={isComplete ? true : false}
                      disabled={editMode ? true : false}
                    />
                    <div className="mr-2 mt-[1.5px] flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border-2 border-neutral-500/80 bg-transparent focus-within:border-sky-400 dark:border-neutral-400">
                      <svg
                        className="hidden w-3 h-3 fill-current"
                        version="1.1"
                        viewBox="0 0 17 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g fill="none" fillRule="evenodd">
                          <g
                            transform="translate(-9 -11)"
                            fill="#0ea5e9"
                            fillRule="nonzero"
                          >
                            <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
                          </g>
                        </g>
                      </svg>
                    </div>
                  </>
                ) : null}
                {item.category === 'task' ? (
                  <p
                    id="title"
                    contentEditable={editMode}
                    suppressContentEditableWarning={true}
                    className={`z-40 text-xl font-bold  ${
                      isComplete
                        ? 'cursor-pointer text-neutral-400 line-through decoration-1 transition-colors duration-150 ease-in-out'
                        : ''
                    }
                    ${
                      editMode
                        ? 'bg-white px-[1px] outline outline-offset-1 outline-neutral-300 dark:bg-neutral-800/50 dark:outline-neutral-500'
                        : 'cursor-pointer px-[1px] hover:line-through'
                    }`}
                    onClick={() => {
                      if (!editMode) {
                        toggleComplete();
                      }
                      return;
                    }}
                  >
                    {item.title}
                  </p>
                ) : item.category === 'bookmark' ? (
                  <p
                    id="title"
                    contentEditable={editMode}
                    suppressContentEditableWarning={true}
                    className={`z-40 px-[1px] text-xl font-bold
                    ${
                      editMode
                        ? 'w-fit bg-white px-[1px] outline outline-offset-1 outline-neutral-300 dark:bg-neutral-800/50 dark:outline-neutral-500'
                        : 'underline hover:no-underline'
                    }`}
                  >
                    <a
                      href={item.content}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.title ? item.title : item.content}
                    </a>
                  </p>
                ) : (
                  <p
                    id="title"
                    contentEditable={editMode}
                    suppressContentEditableWarning={true}
                    className={`z-40 px-[1px] text-xl font-bold
                    ${
                      editMode
                        ? 'w-fit bg-white px-[1px] outline outline-offset-1 outline-neutral-300 dark:bg-neutral-800/50 dark:outline-neutral-500'
                        : ''
                    }`}
                  >
                    {item.title}
                  </p>
                )}
              </div>
              {item.content && item.category === 'note' ? (
                <p
                  id="content"
                  contentEditable={editMode}
                  suppressContentEditableWarning={true}
                  className={`w-fit break-words px-[1px] text-lg text-neutral-600 dark:text-neutral-400
              ${
                editMode
                  ? 'bg-white px-[1px] outline outline-offset-1 outline-neutral-300 dark:bg-neutral-800/50 dark:outline-neutral-500'
                  : ''
              }`}
                >
                  {item.content}
                </p>
              ) : item.content && item.category === 'bookmark' ? (
                <p
                  id="content"
                  contentEditable={editMode}
                  suppressContentEditableWarning={true}
                  className={`w-fit break-all px-[1px] text-lg text-neutral-600 dark:text-neutral-400
                  ${
                    editMode
                      ? 'bg-white px-[1px] outline outline-offset-1 outline-neutral-300 dark:bg-neutral-800/50 dark:outline-neutral-500'
                      : ''
                  }`}
                >
                  {item.content}
                </p>
              ) : null}
              <ul className="flex font-mono font-normal leading-6 text-neutral-500 dark:text-neutral-400">
                <li
                  className={
                    item.category === 'note'
                      ? 'text-rose-600 dark:text-rose-400'
                      : item.category === 'task'
                      ? 'text-sky-500 dark:text-sky-400'
                      : item.category === 'bookmark'
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-neutral-500'
                  }
                >
                  {item.category}
                </li>
                <li className="mx-2 md:visible">&middot;</li>
                <li className="text-neutral-600 dark:text-neutral-400">
                  {format(new Date(item.inserted_at), 'MMM d, yyyy')}
                </li>
              </ul>
            </div>
            <div className="flex justify-end pb-2 basis-1/12">
              <Disclosure.Button className="p-2">
                <ChevronRightIcon
                  className={`${
                    open
                      ? 'rotate-90 transform duration-200'
                      : '-rotate-90 transform duration-100'
                  } h-6 w-6 text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-400`}
                />
              </Disclosure.Button>
            </div>
          </div>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <div className="flex justify-end">
              <Disclosure.Panel className="p-2 mt-2 space-x-2 text-sm text-center border rounded w-fit dark:border-neutral-700 dark:bg-neutral-700/20">
                {!isComplete && !editMode ? (
                  <button
                    className="w-16 rounded border border-neutral-500 bg-white px-2 pb-0.5 transition-all duration-75 ease-in-out hover:border-black hover:bg-black hover:text-white dark:border-neutral-500 dark:bg-neutral-800 dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
                    aria-hidden="true"
                    onClick={toggleMode}
                  >
                    {'Edit'}
                  </button>
                ) : null}
                {editMode ? (
                  <>
                    <button
                      className="w-16 rounded border border-black bg-black px-2 pb-0.5 text-white transition-all duration-75 ease-in-out hover:bg-neutral-100 hover:text-black group-hover:block dark:border-white dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-white"
                      aria-hidden="true"
                      onClick={() =>
                        handleUpdateEntry(
                          item.id,
                          document.getElementById('title')?.innerText,
                          document.getElementById('content')?.innerText
                        )
                      }
                    >
                      {'Save'}
                    </button>
                    <button
                      className="w-16 rounded border border-neutral-500 bg-white px-2 pb-0.5 transition-all duration-75 ease-in-out hover:border-black hover:bg-black hover:text-white dark:border-neutral-500 dark:bg-neutral-800 dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
                      aria-hidden="true"
                      onClick={() => {
                        toggleMode();
                        updateEntryById(item.id, item.title, item.content);
                      }}
                    >
                      {'Cancel'}
                    </button>
                  </>
                ) : null}
                <button
                  className={classNames(
                    editMode
                      ? 'cursor-not-allowed border-neutral-300 text-neutral-300 hover:bg-white dark:border-neutral-600 dark:text-neutral-500 dark:hover:bg-neutral-800'
                      : 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white dark:border-red-500 dark:hover:bg-red-500',
                    'w-16 rounded border bg-white px-2 pb-0.5 transition-all duration-75 ease-in-out focus:outline-none focus:ring-0 group-hover:block dark:bg-neutral-800'
                  )}
                  aria-hidden="true"
                  disabled={editMode ? true : false}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDelete();
                  }}
                >
                  Delete
                </button>
              </Disclosure.Panel>
            </div>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default EntryItem;
