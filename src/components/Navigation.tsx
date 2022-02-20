import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { useKBar } from 'kbar';
import { MenuAlt3Icon } from '@heroicons/react/outline';

import { UserContext } from '../context/UserContext';
import Logo from '../assets/logo.svg';

export default function Navigation() {
  const session = useContext(UserContext);
  const { query } = useKBar();

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-10 flex min-w-[360px] items-center border-b border-neutral-200/60 bg-neutral-50/60 py-6 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/60">
        <div className="ml-6 flex basis-1/12">
          {session ? (
            <a href="/home">
              <img src={Logo} alt="Lerret Logo" width={28} height={28} />
            </a>
          ) : (
            <a href="/">
              <img src={Logo} alt="Lerret Logo" width={28} height={28} />
            </a>
          )}
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
