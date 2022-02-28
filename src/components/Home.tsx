import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

import * as PATHS from '../constants/paths';

import { ICategoryLinkProps } from '../lib/interfaces';

import AddNote from './AddNote';
import AddTask from './AddTask';
import AddBookmark from './AddBookmark';
import EntryList from './EntryList';

function CategoryLink({ category, children, ...props }: ICategoryLinkProps) {
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
  const categories = ['note', 'task', 'bookmark'];
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

  const updateEntryById = async (
    id: string,
    title: string | undefined,
    content?: string | undefined
  ) => {
    const { error } = await supabase
      .from('entries')
      .update({ title: title, content: content })
      .eq('id', id);
    if (error) console.log('Error updating entry: ', error);
    fetchUserEntries();
  };

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
      {location.pathname === PATHS.NEW_NOTE && (
        <AddNote userEntries={userEntries} setUserEntries={setUserEntries} />
      )}
      {location.pathname === PATHS.NEW_TASK && (
        <AddTask userEntries={userEntries} setUserEntries={setUserEntries} />
      )}
      {location.pathname === PATHS.NEW_BOOKMARK && (
        <AddBookmark
          userEntries={userEntries}
          setUserEntries={setUserEntries}
        />
      )}

      <div className="flex justify-center">
        <div className="mt-24 mb-24 w-5/6 max-w-7xl py-8 font-mono">
          <div className="mb-6 flex space-x-1 rounded-md bg-neutral-100 p-2 dark:bg-neutral-800">
            <div className="flex w-full gap-x-2 rounded-md font-sans text-sm font-medium leading-5">
              <Link
                to={`/home`}
                className={
                  window.location.pathname === PATHS.HOME
                    ? 'flex w-full justify-center rounded-md bg-white py-3 font-sans font-medium leading-5 text-neutral-900 shadow-sm dark:bg-neutral-500 dark:text-neutral-100'
                    : 'flex w-full justify-center rounded-md py-3 font-sans font-medium leading-5 text-neutral-600 hover:bg-neutral-200/50 dark:text-neutral-100 dark:hover:bg-neutral-700/50'
                }
              >
                {'All'}
              </Link>
              {categories.map((category, index) => (
                <CategoryLink category={category} key={index}>
                  {category.charAt(0).toUpperCase() + category.slice(1) + 's'}
                </CategoryLink>
              ))}
            </div>
          </div>
          <ul>
            <div className="rounded-md bg-neutral-50/50 p-3 dark:bg-neutral-800/50">
              <EntryList
                items={entries}
                updateEntryById={updateEntryById}
                deleteEntryById={deleteEntryById}
              />
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
