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
    <div className="h-screen px-4 pt-32">
      <div className="px-10 mx-auto max-w-7xl">
        <div className="text-center">
          <p className="mt-2 text-3xl font-medium leading-8 sm:text-5xl">
            Say 👋 to <span className="font-black">Clementine</span>
          </p>
          <p className="max-w-2xl mx-auto mt-4 text-xl text-neutral-500 dark:text-neutral-300">
            A place to save your thoughts and ideas
          </p>
        </div>

        <div className="flex justify-center mt-14">
          <dl className="space-y-10 md:grid md:grid-cols-3 md:gap-x-24 md:gap-y-12 md:space-y-0">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center w-12 h-12 text-orange-600 rounded-md bg-orange-200/70 dark:bg-orange-400 dark:text-orange-700">
                    <feature.icon className="w-6 h-6" aria-hidden="true" />
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

        <div className="flex flex-col items-center justify-center mt-20 font-medium leading-8 tracking-tight text-neutral-900">
          {!session ? (
            <div className="relative inline-flex w-fit">
              <Link to="/signin">
                <button
                  type="button"
                  className="flex items-center justify-center px-8 py-3 pb-3 mb-2 font-bold leading-tight text-white transition duration-150 ease-in-out bg-orange-500 rounded animate-bounce hover:bg-orange-600 focus:outline-none focus:ring-0 dark:bg-orange-700"
                >
                  Get started &rarr;
                </button>
              </Link>
            </div>
          ) : (
            <Link to="/home">
              <button
                type="button"
                className="flex items-center justify-center px-8 py-3 pb-3 mb-2 font-bold leading-tight text-white transition duration-150 ease-in-out bg-orange-500 rounded animate-bounce hover:bg-orange-600 focus:outline-none focus:ring-0 dark:bg-orange-700"
              >
                Go home &rarr;
              </button>
            </Link>
          )}
          <div className="px-4 py-2 mt-12 mb-12 font-mono text-sm font-medium leading-8 tracking-tight text-center rounded-lg dark:text-neutral-300">
            <span>
              <strong>Tip:</strong> Use Command + K to access the Command
              Palette
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
