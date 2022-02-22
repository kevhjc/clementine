import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

  if (entry) {
    return (
      <div className="flex justify-center">
        <div className="mt-24 mb-24 w-5/6 max-w-7xl py-8">
          <dl className="grid grid-cols-2">
            <div className="col-start-1">
              <button
                type="button"
                className="mb-8 w-36 justify-center rounded bg-orange-500 px-2 py-3 pb-3 font-bold leading-tight text-white transition duration-150 ease-in-out hover:bg-orange-600 focus:outline-none focus:ring-0 dark:bg-orange-700"
                onClick={() => navigate(-1)}
              >
                &larr; Go back
              </button>
            </div>
            <div className="col-end-4">
              <button
                type="button"
                className="mb-8 w-36 justify-center rounded bg-gray-200/70 px-2 py-3 pb-3 font-bold leading-tight transition duration-150 ease-in-out hover:bg-neutral-300/70 focus:outline-none focus:ring-0 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600"
              >
                Edit
              </button>
            </div>
          </dl>
          <p className="mt-2 text-3xl font-medium leading-8 tracking-tight sm:text-5xl">
            {entry[0].title}
          </p>
          <p className="mx-auto mt-8 text-lg text-neutral-500 dark:text-neutral-400">
            {entry[0].content}
          </p>
        </div>
      </div>
    );
  }
  return <div>Loading...</div>;
};

export default EntryItemView;
