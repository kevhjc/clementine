import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { useKBar } from 'kbar';

import { UserContext } from '../context/UserContext';
import Logo from '../assets/logo.svg';

export default function Navigation() {
  const session = useContext(UserContext);
  const { query } = useKBar();

  const handleMenuClick = () => {
    query.toggle();
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-10 flex min-w-[360px] items-center border-b border-neutral-200/60 bg-neutral-50/60 py-6 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/60">
        <div className="ml-6 flex basis-1/12">
          {session ? (
            <a href="/home">
              <img src={Logo} alt="Logo" width={30} height={30} />
            </a>
          ) : (
            <a href="/">
              <img src={Logo} alt="Logo" width={30} height={30} />
            </a>
          )}
        </div>
        <div className="flex basis-11/12 justify-end">
          <button
            title="Add entry"
            className="mr-6 rounded-md bg-neutral-200/40 p-2 outline-none transition-colors duration-100 ease-in-out hover:bg-neutral-200 hover:text-neutral-900 dark:bg-neutral-800/50 dark:hover:bg-neutral-700 dark:hover:text-neutral-100"
            onClick={handleMenuClick}
          >
            <svg viewBox="0 0 60 60" className="h-5 w-5 fill-current">
              <path
                d="M49,38h-7V22h7c6.065,0,11-4.935,11-11S55.065,0,49,0S38,4.935,38,11v7H22v-7c0-6.065-4.935-11-11-11S0,4.935,0,11
	s4.935,11,11,11h7v16h-7C4.935,38,0,42.935,0,49s4.935,11,11,11s11-4.935,11-11v-7h16v7c0,6.065,4.935,11,11,11s11-4.935,11-11
	S55.065,38,49,38z M42,11c0-3.859,3.14-7,7-7s7,3.141,7,7s-3.14,7-7,7h-7V11z M11,18c-3.86,0-7-3.141-7-7s3.14-7,7-7s7,3.141,7,7v7
	H11z M18,49c0,3.859-3.14,7-7,7s-7-3.141-7-7s3.14-7,7-7h7V49z M22,38V22h16v16H22z M49,56c-3.86,0-7-3.141-7-7v-7h7
	c3.86,0,7,3.141,7,7S52.86,56,49,56z"
              />
            </svg>
          </button>
        </div>
      </div>
      <Outlet />
    </>
  );
}
