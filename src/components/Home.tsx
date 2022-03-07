import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

import * as PATHS from '../constants/paths';
import * as PARAMS from '../constants/params';

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
  const [hasCompletedTask, setHasCompletedTask] = useState(false);
  const categories = ['note', 'task', 'bookmark'];
  const category = searchParams.get('category');

  useEffect(() => {
    fetchUserEntries().catch(console.error);
    userEntries.some(
      (entry: { is_complete: boolean }) => entry.is_complete === true
    )
      ? setHasCompletedTask(true)
      : setHasCompletedTask(false);
  }, [setUserEntries, userEntries]);

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

  const clearCompletedTasks = async () => {
    try {
      await supabase.from('entries').delete().match({ is_complete: true });
      setUserEntries(
        userEntries.filter(
          (entry: { is_complete: boolean }) => entry.is_complete !== true
        )
      );
    } catch (error) {
      console.log('Error clearing completed tasks: ', error);
    } finally {
      fetchUserEntries();
    }
  };

  return (
    <>
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
        <div className="w-5/6 py-8 mt-24 mb-24 max-w-7xl">
          <div className="flex p-2 mb-6 space-x-1 rounded-md bg-neutral-100 dark:bg-neutral-800">
            <div className="flex w-full font-sans text-sm font-medium leading-5 rounded-md gap-x-2">
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
            <div className="p-3 rounded-md bg-neutral-50/50 dark:bg-neutral-800/50">
              <EntryList
                items={entries}
                updateEntryById={updateEntryById}
                deleteEntryById={deleteEntryById}
              />
            </div>
          </ul>
          {location.search === PARAMS.TASK_PARAMS && (
            <div className="flex justify-end px-6 pt-6 space-x-6">
              {hasCompletedTask ? (
                <button
                  className="rounded border border-neutral-400 bg-white px-2 pb-0.5 font-sans transition-all duration-75 ease-in-out hover:border-red-500 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-0 dark:border-neutral-500 dark:bg-neutral-800 dark:hover:bg-red-500"
                  aria-hidden="true"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    clearCompletedTasks();
                  }}
                >
                  Clear completed
                </button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
