import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';
import { categories, ENTRIES, filterByCategory } from '../utils/data';
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
          ? 'flex w-full justify-center rounded-md bg-white py-4 font-sans font-medium leading-5 text-neutral-900 shadow-sm dark:bg-neutral-500 dark:text-neutral-100'
          : 'flex w-full justify-center rounded-md py-4 font-sans font-medium leading-5 text-neutral-600 hover:bg-neutral-200 dark:text-neutral-100 dark:hover:bg-neutral-700'
      }
    >
      {children}
    </Link>
  );
}

const Home = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  const entries = useMemo(() => {
    if (!category) return ENTRIES;
    return filterByCategory(category);
  }, [category]);

  return (
    <div>
      <div className="flex justify-center">
        <div className="mt-24 mb-24 w-5/6 max-w-7xl py-8 font-mono">
          <div className="mb-6 flex space-x-1 rounded-md bg-neutral-100 p-1 dark:bg-neutral-800">
            <div className="flex w-full gap-x-1 rounded-md font-sans font-medium leading-5">
              <Link
                to={`/home`}
                className="flex w-full justify-center rounded-md py-4 font-sans font-medium leading-5 text-neutral-600 hover:bg-neutral-200 dark:text-neutral-100 dark:hover:bg-neutral-700"
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
