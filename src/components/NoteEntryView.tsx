import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import format from 'date-fns/format';
import classNames from 'classnames';

const NoteEntryView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const [entry, setEntry] = useState<any>();
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchUserEntryById().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserEntryById = async () => {
    let { data: entries, error } = await supabase
      .from('entries')
      .select('*')
      .eq('id', params.entry);
    if (error) console.log('Error fetching entries: ', error);
    else setEntry(entries);
  };

  const updateEntryById = async (
    id: string,
    title: string | undefined,
    content: string | undefined
  ) => {
    let updatedTitle = title!.trim();
    let updatedContent = content!.trim();
    const { data: entries, error } = await supabase
      .from('entries')
      .update({ title: updatedTitle, content: updatedContent })
      .eq('id', id);
    if (error) console.log('Error updating entry: ', error);
    else {
      setEntry(entries);
      setEditMode(!editMode);
    }
  };

  const deleteEntryById = async (id: string) => {
    try {
      await supabase.from('entries').delete().eq('id', id);
      navigate('/home');
    } catch (error) {
      console.log('Error deleting entry: ', error);
    }
  };

  const toggleMode = () => {
    setEditMode(!editMode);
  };

  if (entry)
    return (
      <div className="flex justify-center">
        <div className="mt-24 mb-24 w-5/6 max-w-7xl py-8">
          <dl className="mb-4 grid grid-cols-2">
            <div className="col-start-1">
              <button
                type="button"
                className="mb-8 w-28 justify-center rounded border border-neutral-300 bg-white px-2 py-3 pb-3 text-sm font-bold leading-tight transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus:ring-0 dark:border-neutral-500 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                onClick={() =>
                  (location.key !== 'default' && navigate(-1)) ||
                  navigate('/home')
                }
              >
                &larr; Go {location.key !== 'default' ? 'back' : 'home'}
              </button>
            </div>
            <div className="col-end-4">
              {!editMode ? (
                <button
                  type="button"
                  className="mb-8 w-24 justify-center rounded border border-neutral-300 bg-white px-2 py-3 pb-3 text-sm font-bold leading-tight transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus:ring-0 dark:border-neutral-500 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                  onClick={toggleMode}
                >
                  {'Edit'}
                </button>
              ) : null}
              {editMode ? (
                <button
                  type="button"
                  className="mb-8 w-24 justify-center rounded border border-black bg-black px-2 py-3 pb-3 text-sm font-bold leading-tight text-white transition duration-150 ease-in-out hover:bg-neutral-100 hover:text-neutral-900 focus:outline-none focus:ring-0 dark:border-white dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-white"
                  onClick={() =>
                    updateEntryById(
                      entry[0].id,
                      document.getElementById('title')?.innerText,
                      document.getElementById('content')?.innerText
                    )
                  }
                >
                  {'Save'}
                </button>
              ) : null}
              <button
                type="button"
                disabled={editMode ? true : false}
                className={classNames(
                  editMode
                    ? 'border-neutral-300 text-neutral-300 hover:bg-white dark:border-neutral-600 dark:text-neutral-500 dark:hover:bg-neutral-900'
                    : 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white dark:border-red-500 dark:hover:bg-red-500',
                  'mb-8 ml-4 w-24 justify-center rounded border bg-white px-2 py-3 pb-3 text-sm font-bold leading-tight transition duration-150 ease-in-out focus:outline-none focus:ring-0 dark:bg-neutral-900'
                )}
                onClick={() => deleteEntryById(entry[0].id)}
              >
                {'Delete'}
              </button>
            </div>
          </dl>
          <span className="text-neutral-600 group-hover:block dark:text-neutral-300">
            {format(new Date(entry[0].inserted_at), "MMM d, yyyy '–' h:mm bb")}
          </span>
          <div className="group relative mt-12">
            <span className="absolute top-0 -mt-8 hidden text-xs text-neutral-400 group-hover:block">
              {'Title'}
            </span>
            {editMode ? (
              <p
                id="title"
                contentEditable
                suppressContentEditableWarning={true}
                className="mt-2 mb-8 py-[3.5px] text-3xl font-bold leading-8 tracking-tight outline outline-offset-1 outline-neutral-300 ring-neutral-600 sm:text-5xl dark:outline-neutral-500"
              >
                {entry[0].title}
              </p>
            ) : (
              <p
                id="title"
                className="mt-2 mb-8 py-[3.5px] text-3xl font-bold leading-8 tracking-tight outline-none sm:text-5xl"
              >
                {entry[0].title}
              </p>
            )}
          </div>
          <div className="group relative mt-12 mb-24">
            {editMode ? (
              <div>
                <span className="absolute top-0 -mt-8 hidden text-xs text-neutral-400 group-hover:block">
                  {'Body'}
                </span>
                <p
                  id="content"
                  contentEditable
                  suppressContentEditableWarning={true}
                  className="mt-2 text-lg text-neutral-500 outline outline-offset-1 outline-neutral-300 ring-neutral-600 dark:text-neutral-400 dark:outline-neutral-500"
                >
                  {entry[0].content}
                </p>
              </div>
            ) : (
              <div>
                <span className="absolute top-0 -mt-8 hidden text-xs text-neutral-400 group-hover:block">
                  {'Body'}
                </span>
                <p
                  id="content"
                  className="mt-2 text-lg text-neutral-500 dark:text-neutral-400"
                >
                  {entry[0].content}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  return null;
};

export default NoteEntryView;
