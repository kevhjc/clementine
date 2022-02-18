import { Outlet } from 'react-router-dom';
import { useKBar } from 'kbar';
import { MenuAlt3Icon } from '@heroicons/react/outline';

export default function Navigation() {
  const { query } = useKBar();

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-10 flex min-w-[360px] items-center border-b border-neutral-200/60 bg-neutral-50/60 py-6 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/60">
        <div className="ml-6 flex basis-1/12">
          <a href="/" className="header-link mr-4 text-xl font-black">
            Lerret
          </a>
        </div>
        <div className="flex basis-11/12 justify-end">
          <button
            title="Add entry"
            className="mr-6 rounded-md p-2 outline-none transition-colors duration-100 ease-in-out hover:bg-neutral-200 hover:text-neutral-900 dark:hover:bg-neutral-700 dark:hover:text-neutral-100"
            onClick={query.toggle}
          >
            <MenuAlt3Icon className="h-6 w-6" />
          </button>
        </div>
      </div>
      <Outlet />
    </>
  );
}
