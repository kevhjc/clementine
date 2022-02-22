import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';
import { supabase } from './../supabaseClient';

import EntryList from './EntryList';

import AddTask from './AddTask';

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

  console.log(location.pathname);

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
      {location.pathname === '/new/task' && (
        <div className="z-10 w-full max-w-2xl overflow-hidden rounded-lg border border-neutral-300 bg-white/80 shadow-2xl backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-800/80 dark:text-white">
          <AddTask userEntries={userEntries} setUserEntries={setUserEntries} />
        </div>
      )}

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
