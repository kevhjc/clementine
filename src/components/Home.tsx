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
  const [supabaseEntries, setSupabaseEntries] = useState<any>([]);
  const [searchParams] = useSearchParams();
  const categories = ['note', 'task', 'bookmark'];
  const category = searchParams.get('category');

  useEffect(() => {
    fetchSupabaseEntries().catch(console.error);
  }, []);

  const entries = useMemo(() => {
    const filterByCategory = (category: string) => {
      return supabaseEntries.filter(
        (item: { category: string }) =>
          item.category.toLowerCase() === category.toLowerCase()
      );
    };

    if (!category) return supabaseEntries;
    return filterByCategory(category);
  }, [category, supabaseEntries]);

  const fetchSupabaseEntries = async () => {
    let { data: entries, error } = await supabase
      .from('entries')
      .select('*')
      .order('inserted_at', { ascending: false });
    if (error) console.log('error', error);
    else setSupabaseEntries(entries);
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="mt-24 mb-24 w-5/6 max-w-7xl py-8 font-mono">
          <div className="mb-6 flex space-x-1 rounded-md bg-neutral-100 p-2 dark:bg-neutral-800">
            <div className="flex w-full gap-x-2 rounded-md font-sans font-medium leading-5">
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
          <div className="rounded-md bg-neutral-50/50 p-3 dark:bg-neutral-800/50">
            <ul>
              <EntryList items={entries} />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
