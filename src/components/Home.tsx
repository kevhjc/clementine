import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';
import { supabase } from './../supabaseClient';

import EntryList from './EntryList';

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
  const [userEntries, setuserEntries] = useState<any>([]);
  const [searchParams] = useSearchParams();
  const categories = ['note', 'task', 'bookmark'];
  const category = searchParams.get('category');

  useEffect(() => {
    fetchuserEntries().catch(console.error);
  }, []);

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

  const fetchuserEntries = async () => {
    let { data: entries, error } = await supabase
      .from('entries')
      .select('*')
      .order('inserted_at', { ascending: false });
    if (error) console.log('error', error);
    else setuserEntries(entries);
  };

  return (
    <div>
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
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </CategoryLink>
              ))}
            </div>
          </div>
          <ul>
            {userEntries.length === 0 ? (
              <li className="mt-24 text-center text-lg">
                <div className="flex flex-col justify-center dark:text-neutral-500">
                  Use cmd/ctrl + K or click the command icon to begin
                </div>
              </li>
            ) : (
              <div className="rounded-md bg-neutral-50/50 p-3 dark:bg-neutral-800/50">
                <EntryList items={entries} />
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
