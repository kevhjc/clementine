import {
  useState,
  useEffect,
  useContext,
  useRef,
  useMemo,
  MutableRefObject,
} from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';
import { supabase } from './../supabaseClient';

import { SessionContext } from '../context/SessionContext';
import EntryList from './EntryList';
// import TaskItem from './TaskItem';

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
  const session = useContext(SessionContext);

  const [userEntries, setUserEntries] = useState<any>([]);
  const [searchParams] = useSearchParams();
  const categories = ['Note', 'Task', 'Bookmark'];
  const category = searchParams.get('category');

  const newTaskTextRef = useRef() as MutableRefObject<any>;

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
    }
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
      <div className="flex justify-center">
        <div className="mt-40 rounded-lg border border-red-100 bg-red-50 p-4 duration-300 hover:shadow-lg md:w-3/4 dark:border-neutral-700 dark:bg-neutral-800">
          <div className="relative my-1">
            <input
              ref={newTaskTextRef}
              type="text"
              onKeyUp={(e) => e.key === 'Enter' && addTask()}
              placeholder="Enter a new task..."
              className={
                'mt-1 block w-full rounded-lg bg-white px-4 py-3 pr-28 text-neutral-900 outline-none dark:border-neutral-600 dark:bg-neutral-900/70 dark:text-neutral-200'
              }
            />
            <button
              className="absolute right-1 top-1 flex h-10 w-32 items-center justify-center rounded-md bg-red-500 px-4 font-sans font-medium text-white transition duration-150 ease-in-out hover:bg-red-600 dark:bg-red-700 dark:text-neutral-200"
              type="submit"
              onClick={addTask}
            >
              Add task
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="mt-24 mb-24 w-5/6 max-w-7xl py-8 font-mono">
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
            <div className="rounded-md bg-neutral-50/50 p-3 dark:bg-neutral-800/50">
              <EntryList items={entries} deleteEntryById={deleteEntryById} />
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
