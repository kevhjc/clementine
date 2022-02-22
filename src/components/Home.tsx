import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';
import { supabase } from './../supabaseClient';

import EntryList from './EntryList';

import AddNote from './AddNote';
import AddTask from './AddTask';
import AddBookmark from './AddBookmark';

interface CategoryLinkProps extends Omit<LinkProps, 'to'> {
  category: string;
}

function CategoryLink({ category, children, ...props }: CategoryLinkProps) {
  const [searchParams] = useSearchParams();
  const isActive = searchParams.get('category') === category;

  return (
    <Link
      to={`./?category=${category}`}
      {...props}
      className={
        isActive
          ? 'flex w-full justify-center rounded-md bg-white py-3 font-sans font-medium leading-5 text-neutral-900 shadow-sm dark:bg-neutral-500 dark:text-neutral-100'
          : 'flex w-full justify-center rounded-md py-3 font-sans font-medium leading-5 text-neutral-600 hover:bg-neutral-200/50 dark:text-neutral-100 dark:hover:bg-neutral-700/50'
      }
    >
      {children}
    </Link>
  );
}

const Home = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [userEntries, setUserEntries] = useState<any>([]);
  const categories = ['Note', 'Task', 'Bookmark'];
  const category = searchParams.get('category');

  useEffect(() => {
    fetchUserEntries().catch(console.error);
  }, [setUserEntries]);

  const fetchUserEntries = async () => {
    let { data: entries, error } = await supabase
      .from('entries')
      .select('*')
      .order('inserted_at', { ascending: false });
    if (error) console.log('error', error);
    else setUserEntries(entries);
  };

  const entries = useMemo(() => {
    const filterByCategory = (category: string) => {
      return userEntries.filter(
        (item: { category: string }) =>
          item.category.toLowerCase() === category.toLowerCase()
      );
    };
    if (!category) return userEntries;
    return filterByCategory(category);
  }, [category, userEntries]);

  const deleteEntryById = async (id: string) => {
    try {
      await supabase.from('entries').delete().eq('id', id);
      setUserEntries(
        userEntries.filter((entry: { id: any }) => entry.id !== id)
      );
    } catch (error) {
      console.log('Error deleting entry: ', error);
    }
  };

  return (
    <div>
      {location.pathname === '/new/note' && (
        <AddNote userEntries={userEntries} setUserEntries={setUserEntries} />
      )}
      {location.pathname === '/new/task' && (
        <AddTask userEntries={userEntries} setUserEntries={setUserEntries} />
      )}
      {location.pathname === '/new/bookmark' && (
        <AddBookmark
          userEntries={userEntries}
          setUserEntries={setUserEntries}
        />
      )}

      <div className="flex justify-center">
        <div className="mt-24 mb-24 w-4/6 max-w-7xl py-8 font-mono">
          <div className="mb-6 flex space-x-1 rounded-md bg-neutral-100 p-2 dark:bg-neutral-800">
            <div className="flex w-full gap-x-2 rounded-md font-sans text-sm font-medium leading-5">
              <Link
                to={`/home`}
                className={
                  window.location.pathname === '/home'
                    ? 'flex w-full justify-center rounded-md bg-white py-3 font-sans font-medium leading-5 text-neutral-900 shadow-sm dark:bg-neutral-500 dark:text-neutral-100'
                    : 'flex w-full justify-center rounded-md py-3 font-sans font-medium leading-5 text-neutral-600 hover:bg-neutral-200/50 dark:text-neutral-100 dark:hover:bg-neutral-700/50'
                }
              >
                {'All'}
              </Link>
              {categories.map((category, index) => (
                <CategoryLink category={category} key={index}>
                  {category}
                  {'s'}
                </CategoryLink>
              ))}
            </div>
          </div>
          <ul>
            {userEntries ? (
              <div className="rounded-md bg-neutral-50/50 p-3 dark:bg-neutral-800/50">
                <EntryList items={entries} deleteEntryById={deleteEntryById} />
              </div>
            ) : (
              <div className="mt-24 flex flex-col items-center justify-center font-medium leading-8 tracking-tight ">
                <div className="rounded-md text-center">
                  🤔 Your content is loading or you don't any entries yet.
                  <div className="mt-24 rounded-lg bg-yellow-100/20 py-2 text-center font-mono text-sm font-medium leading-8 tracking-tight text-black dark:bg-yellow-600/20 dark:text-white">
                    <span>
                      <strong>Tip:</strong> Use Command + K to access the
                      command bar
                    </span>
                  </div>
                </div>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
