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
    const { data: entries, error } = await supabase
      .from('entries')
      .update({ title: title, content: content })
      .eq('id', id);
    if (error) console.log('Error updating entry: ', error);
    else setEntry(entries);
  };

  const deleteEntryById = async (id: string) => {
    try {
      await supabase.from('entries').delete().eq('id', id);
      navigate('/home');
    } catch (error) {
      console.log('Error deleting entry: ', error);
    }
  };

  if (entry)
    return (
      <div className="flex justify-center">
        <div className="mt-24 mb-24 w-5/6 max-w-7xl py-8">
          <dl className="grid grid-cols-2">
            <div className="col-start-1">
              <button
                type="button"
                className="mb-8 w-28 justify-center rounded bg-rose-600 px-2 py-3 pb-3 text-sm font-bold leading-tight text-white transition duration-150 ease-in-out hover:bg-rose-500 focus:outline-none focus:ring-0 dark:bg-rose-500 dark:text-neutral-900 hover:dark:bg-rose-600"
                onClick={() => navigate(-1)}
              >
                &larr; Go back
              </button>
            </div>
            <div className="col-end-4">
              <button
                type="button"
                className="mb-8 ml-4 w-24 justify-center rounded bg-gray-200/70 px-2 py-3 pb-3 text-sm font-bold leading-tight text-red-500 transition duration-150 ease-in-out hover:bg-red-600 hover:text-white focus:outline-none focus:ring-0 dark:bg-neutral-700 dark:text-white dark:hover:bg-red-600"
                onClick={() => deleteEntryById(entry[0].id)}
              >
                Delete
              </button>
            </div>
          </dl>
          <div className="group relative mt-8">
            <span className="absolute top-0 -mt-8 hidden p-2 text-xs text-neutral-400 group-hover:block">
              Title
            </span>
            <p
              contentEditable
              suppressContentEditableWarning={true}
              id="title"
              onBlur={() =>
                updateEntryById(
                  entry[0].id,
                  document.getElementById('title')?.innerText,
                  entry[0].content
                )
              }
              className="mt-2 mb-8 rounded-md p-2 text-3xl font-bold leading-8 tracking-tight outline-none ring-red-500 hover:bg-neutral-100/70 focus:ring-2 sm:text-5xl dark:hover:bg-neutral-800"
            >
              {entry[0].title}
            </p>
          </div>
          <div className="group relative mt-12 mb-24">
            {entry[0].content ? (
              <>
                <span className="absolute top-0 -mt-8 hidden p-2 text-xs text-neutral-400 group-hover:block">
                  Body
                </span>
                <p
                  contentEditable
                  suppressContentEditableWarning={true}
                  id="content"
                  onBlur={() =>
                    updateEntryById(
                      entry[0].id,
                      entry[0].title,
                      document.getElementById('content')?.innerText
                    )
                  }
                  className="mt-2 rounded-md p-2 text-lg text-neutral-500 outline-none ring-red-500 hover:bg-neutral-100/70 focus:ring-2 dark:text-neutral-400 dark:hover:bg-neutral-800"
                >
                  {entry[0].content}
                </p>
              </>
            ) : null}
          </div>
        </div>
      </div>
    );
  return null;
};

export default EntryItemView;
