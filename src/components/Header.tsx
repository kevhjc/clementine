import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Popover, Transition } from '@headlessui/react';
import { MenuAlt3Icon } from '@heroicons/react/outline';
import { InfoCircledIcon } from '@radix-ui/react-icons';

export default function Header() {
  return (
    <Popover className='font-mono'>
      {({ open }) => (
        <>
          <div className='z-10 fixed top-0 left-0 right-0 flex justify-between items-center border-b border-gray-100 dark:border-gray-800 py-6 dark:bg-neutral-900 bg-gray-50'>
            <div className='flex justify-start lg:w-0 lg:flex-1'>
              <a href='/'>
                <span className='ml-6 header-link font-black text-xl'>
                  Canvas
                </span>
              </a>
            </div>
            <Popover.Button className='mr-6 rounded-md p-2 flex items-center justify-center hover:text-gray-900 hover:bg-gray-100 dark:hover:text-gray-100 dark:hover:bg-gray-700'>
              <span className='sr-only'>Open menu</span>
              <MenuAlt3Icon className='h-6 w-6' aria-hidden='true' />
            </Popover.Button>
            <Popover.Overlay
              className={`${open ? 'fixed inset-0' : 'opacity-0'}`}
            />
          </div>

          <Transition
            as={Fragment}
            enter='duration-200 ease-out'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='duration-100 ease-in'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <Popover.Panel
              focus
              className='absolute right-0 top-20 transition transform origin-top-right z-10 w-auto max-w-sm pr-6'
            >
              <div className='overflow-hidden rounded-lg shadow-md ring-1 ring-gray-200 dark:ring-gray-700 bg-white dark:bg-neutral-800 divide-y-2 divide-gray-50 dark:divide-gray-700'>
                <div className='pb-6 px-6'>
                  <div className='mt-6'>
                    <nav className='grid gap-y-6'>
                      <Popover.Button>
                        <Link
                          to='/learn-more'
                          className='-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600'
                        >
                          <InfoCircledIcon
                            className='flex-shrink-0 h-6 w-6 text-gray-600 dark:text-gray-100'
                            aria-hidden='true'
                          />
                          <span className='ml-3 font-medium text-gray-900 dark:text-gray-300'>
                            Learn More
                          </span>
                        </Link>
                      </Popover.Button>
                    </nav>
                  </div>
                </div>
                <div className='py-6 px-5 space-y-6'>
                  <div>
                    <a
                      href='/'
                      className='w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm font-medium text-white bg-red-500 dark:bg-red-700 hover:bg-red-600'
                    >
                      Sign up
                    </a>
                    <p className='mt-6 text-center text-sm font-medium text-gray-500 dark:text-gray-300'>
                      Already have an account?{' '}
                      <a
                        href='/'
                        className='text-red-500 dark:text-red-400 underline decoration-transparent hover:decoration-inherit transition duration-200 ease-in-out'
                      >
                        Log in
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
          <Outlet />
        </>
      )}
    </Popover>
  );
}
