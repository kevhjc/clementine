import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { supabase } from '../supabaseClient';

const EntryItemView = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [entry, setEntry] = useState<any>();

  useEffect(() => {
    fetchUserEntryById().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserEntryById = async () => {
    let { data: entry, error } = await supabase
      .from('entries')
      .select('*')
      .eq('id', params.entry);
    if (error) console.log('error', error);
    else setEntry(entry);
  };

  const deleteEntryById = async (id: string) => {
    try {
      await supabase.from('entries').delete().eq('id', id);
      navigate('/home');
    } catch (error) {
      console.log('Error deleting entry: ', error);
    }
  };

  if (entry) {
    return (
      <div className="flex justify-center">
        <div className="mt-24 mb-24 w-5/6 max-w-7xl py-8 text-sm">
          <dl className="grid grid-cols-2">
            <div className="col-start-1">
              <button
                type="button"
                className={classNames(
                  entry[0].category === 'note'
                    ? 'bg-rose-600 hover:bg-rose-500 dark:bg-rose-500 hover:dark:bg-rose-600'
                    : entry[0].category === 'task'
                    ? 'bg-sky-500 hover:bg-sky-400 dark:bg-sky-400 dark:hover:bg-sky-500'
                    : entry[0].category === 'bookmark'
                    ? 'bg-green-600 hover:bg-green-500 dark:bg-green-500 dark:hover:bg-green-600'
                    : 'bg-gray-200/70 hover:bg-neutral-300/70',
                  'mb-8 w-28 justify-center rounded px-2 py-3 pb-3 font-bold leading-tight text-white transition duration-150 ease-in-out focus:outline-none focus:ring-0 dark:text-neutral-900'
                )}
                onClick={() => navigate(-1)}
              >
                &larr; Go back
              </button>
            </div>
            <div className="col-end-4">
              <button
                type="button"
                className="mb-8 w-28 justify-center rounded bg-gray-200/70 px-2 py-3 pb-3 font-bold leading-tight text-neutral-400 transition duration-150 ease-in-out hover:bg-neutral-300/70 focus:outline-none focus:ring-0 dark:bg-neutral-700 dark:hover:bg-neutral-600"
              >
                Edit (Soon)
              </button>
              <button
                type="button"
                className="mb-8 ml-4 w-24 justify-center rounded bg-gray-200/70 px-2 py-3 pb-3 font-bold leading-tight text-red-500 transition duration-150 ease-in-out hover:bg-red-600 hover:text-white focus:outline-none focus:ring-0 dark:bg-neutral-700 dark:hover:bg-red-600"
                onClick={() => deleteEntryById(entry[0].id)}
              >
                Delete
              </button>
            </div>
          </dl>
          <p className="mt-2 rounded-md p-2 text-3xl font-medium leading-8 tracking-tight outline-none hover:bg-neutral-100 sm:text-5xl dark:hover:bg-neutral-800">
            {entry[0].title}
          </p>
          {entry[0].content ? (
            <p className="mx-auto mt-8 rounded-md p-2 text-lg text-neutral-500 outline-none hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800">
              {entry[0].content}
            </p>
          ) : null}
        </div>
      </div>
    );
  }
  return <div>Loading...</div>;
};

export default EntryItemView;
