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
      <div className="h-screen px-4 pt-40">
        <div className="mx-auto max-w-7xl px-10">
          <div className="text-left">
            <button onClick={() => navigate(-1)}>&larr; Go back</button>
            <p className="mt-2 text-3xl font-medium leading-8 tracking-tight sm:text-5xl">
              {entry[0].title}
            </p>
            <p className="mx-auto mt-4 text-xl text-neutral-500 dark:text-neutral-300">
              {entry[0].content}
            </p>
          </div>
        </div>
      </div>
    );
  }
  return <div>Loading...</div>;
};

export default EntryItemView;
