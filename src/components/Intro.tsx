import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FileTextIcon, Link2Icon, Pencil2Icon } from '@radix-ui/react-icons';

import { SessionContext } from '../context/SessionContext';

const features = [
  {
    name: 'Notes',
    description: 'Save a quick note',
    icon: FileTextIcon,
  },
  {
    name: 'Tasks',
    description: 'Save todo items',
    icon: Pencil2Icon,
  },
  {
    name: 'Links',
    description: 'Save bookmarks',
    icon: Link2Icon,
  },
];

export default function Intro() {
  const session = useContext(SessionContext);

  return (
    <div className="h-screen px-4 pt-40">
      <div className="mx-auto max-w-7xl px-10">
        <div className="text-center">
          <p className="mt-2 text-3xl font-medium leading-8 sm:text-5xl">
            Say 👋 to <span className="font-black">Clementine.</span>
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-neutral-500 dark:text-neutral-300">
            A place to save your thoughts and ideas
          </p>
        </div>

        <div className="mt-24 flex justify-center">
          <dl className="space-y-10 md:grid md:grid-cols-3 md:gap-x-24 md:gap-y-12 md:space-y-0">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-orange-200/70 text-orange-600 dark:bg-orange-400 dark:text-orange-700">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg font-black leading-6">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 font-sans text-base text-neutral-500 dark:text-neutral-300">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-24 flex flex-col items-center justify-center font-medium leading-8 tracking-tight text-neutral-900">
          {!session ? (
            <div className="relative inline-flex w-fit">
              <Link to="/signin">
                <button
                  type="button"
                  className="mb-2 flex animate-bounce items-center justify-center rounded bg-orange-500 px-8 py-3 pb-3 font-bold leading-tight text-white transition duration-150 ease-in-out hover:bg-orange-600 focus:outline-none focus:ring-0 dark:bg-orange-700"
                >
                  Get started &rarr;
                </button>
              </Link>
            </div>
          ) : (
            <Link to="/home">
              <button
                type="button"
                className="mb-2 flex animate-bounce items-center justify-center rounded bg-orange-500 px-8 py-3 pb-3 font-bold leading-tight text-white transition duration-150 ease-in-out hover:bg-orange-600 focus:outline-none focus:ring-0 dark:bg-orange-700"
              >
                Go home &rarr;
              </button>
            </Link>
          )}
          <div className="mb-24 mt-28 rounded-lg bg-yellow-100/20 px-8 py-2 text-center font-mono text-sm font-medium leading-8 tracking-tight text-black dark:bg-yellow-600/20 dark:text-white">
            <span>
              <strong>Tip:</strong> Use Command + K to access the command bar
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
