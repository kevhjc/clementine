import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { useKBar } from 'kbar';

import { SessionContext } from '../context/SessionContext';

import Logo from '../assets/logo.svg';

export default function Navigation() {
  const session = useContext(SessionContext);
  const { query } = useKBar();

  const handleMenuClick = () => {
    query.toggle();
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex min-w-[360px] items-center border-b border-neutral-200/60 bg-white/80 py-6 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/80">
        <div className="flex ml-6 basis-1/12">
          {session ? (
            <a href="/home">
              <img src={Logo} alt="Logo" width={40} height={40} />
            </a>
          ) : (
            <a href="/">
              <img src={Logo} alt="Logo" width={40} height={40} />
            </a>
          )}
        </div>
        <div className="flex justify-end basis-11/12">
          <button
            title="Open command palette"
            className="p-2 mr-6 transition-colors duration-100 ease-in-out rounded-md outline-none bg-neutral-200/40 hover:bg-neutral-200 hover:text-neutral-900 dark:bg-neutral-800/50 dark:hover:bg-neutral-700 dark:hover:text-neutral-100"
            onClick={handleMenuClick}
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              shapeRendering="geometricPrecision"
            >
              <path d="M18 3a3 3 0 00-3 3v12a3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3H6a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3V6a3 3 0 00-3-3 3 3 0 00-3 3 3 3 0 003 3h12a3 3 0 003-3 3 3 0 00-3-3z" />
            </svg>
          </button>
        </div>
      </div>
      <Outlet />
    </>
  );
}
