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

import { UserContext } from '../context/UserContext';
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
  const user = useContext(UserContext);

  // get/set all entries and categories for current user
  const [userEntries, setUserEntries] = useState<any>([]);
  const [searchParams] = useSearchParams();
  const categories = ['Note', 'Task', 'Bookmark'];
  const category = searchParams.get('category');
  const [errorText, setError] = useState('');

  // requirements for user tasks
  const [tasks, setTasks] = useState<any>([]);
  const newTaskTextRef = useRef() as MutableRefObject<any>;

  // fetch all user entries on page load
  useEffect(() => {
    fetchUserEntries().catch(console.error);
    fetchTasks().catch(console.error);
  }, []);

  // fetch all entries for current user
  const fetchUserEntries = async () => {
    let { data: entries, error } = await supabase
      .from('entries')
      .select('*')
      .order('inserted_at', { ascending: false });
    if (error) console.log('error', error);
    else setUserEntries(entries);
  };

  // fetch all tasks for current user
  const fetchTasks = async () => {
    let { data: tasks, error } = await supabase
      .from('entries')
      .select('*')
      .eq('category', 'task')
      .order('inserted_at', { ascending: false });
    if (error) console.log('error', error);
    else setTasks(tasks);
  };

  // filtering all user entries by category
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

  // add new task
  const addTask = async () => {
    let taskText = newTaskTextRef.current.value;
    let title = taskText.trim();
    if (title.length <= 3) {
      setError('Task length should be more than 3!');
    } else {
      let { data: tasks, error } = await supabase
        .from('entries')
        .insert({ title, user_id: user.id, category: 'task' })
        .single();
      if (error) setError(error.message);
      else {
        setTasks([tasks, ...tasks]);
        setError('');
        newTaskTextRef.current.value = '';
      }
    }
  };

  // delete task by id
  const deleteEntryById = async (id: any) => {
    try {
      await supabase.from('entries').delete().eq('id', id);
      setTasks(tasks.filter((task: { id: any }) => task.id !== id));
      setUserEntries(
        userEntries.filter((entry: { id: any }) => entry.id !== id)
      );
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        {!!errorText && (
          <div
            className={
              'absolute max-w-sm self-center border border-red-300 bg-red-100 px-4 py-2 text-center text-sm text-red-400'
            }
          >
            {errorText}
          </div>
        )}
        <div className="mt-40 rounded-lg border border-red-100 bg-red-50 p-4 duration-300 hover:shadow-lg md:w-3/4 dark:border-neutral-700 dark:bg-neutral-800">
          <form className="relative my-1" action="#">
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
          </form>
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
