import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Popover, Transition } from '@headlessui/react';
import { MenuAlt3Icon } from '@heroicons/react/outline';
import { HomeIcon, InfoCircledIcon } from '@radix-ui/react-icons';

export default function Header() {
  return (
    <Popover className='font-mono'>
      {({ open }) => (
        <>
          <div className='z-10 fixed top-0 left-0 right-0 flex justify-between items-center border-b border-neutral-100 dark:border-neutral-800 py-6 dark:bg-neutral-900 bg-neutral-50'>
            <div className='pl-6 flex justify-start lg:w-0 lg:flex-1'>
              <a href='/'>
                <span className='header-link font-black text-xl'>Canvas</span>
              </a>
            </div>
            <Popover.Button className='mr-6 rounded-md p-2 flex items-center justify-center hover:text-neutral-900 hover:bg-neutral-200 dark:hover:text-neutral-100 dark:hover:bg-neutral-700'>
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
              <div className='overflow-hidden rounded-lg shadow-md ring-1 ring-neutral-200 dark:ring-neutral-700 bg-white dark:bg-neutral-800 divide-y-2 divide-neutral-100 dark:divide-neutral-700'>
                <div className='pb-6 px-5'>
                  <div className='mt-6'>
                    <nav className='grid gap-y-2'>
                      <Popover.Button>
                        <Link
                          to='/home'
                          className='p-2 flex items-center rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-600'
                        >
                          <span className='sr-only'>Go home</span>
                          <HomeIcon
                            className='flex-shrink-0 h-6 w-6 text-neutral-600 dark:text-neutral-100'
                            aria-hidden='true'
                          />
                          <span className='ml-3 font-medium text-neutral-900 dark:text-neutral-300'>
                            Home
                          </span>
                        </Link>
                      </Popover.Button>
                      <Popover.Button>
                        <Link
                          to='/learn-more'
                          className='p-2 flex items-center rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-600'
                        >
                          <span className='sr-only'>Learn more</span>
                          <InfoCircledIcon
                            className='flex-shrink-0 h-6 w-6 text-neutral-600 dark:text-neutral-100'
                            aria-hidden='true'
                          />
                          <span className='ml-3 font-medium text-neutral-900 dark:text-neutral-300'>
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
                    <p className='mt-6 text-center text-sm font-medium text-neutral-500 dark:text-neutral-300'>
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
