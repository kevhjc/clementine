import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { FEATURES } from '../constants/features';

import { SessionContext } from '../context/SessionContext';

import Button from './Button';
import FeatureDescription from './FeatureDescription';

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
            {FEATURES.map((feature) => (
              <div key={feature.name} className="relative">
                <FeatureDescription feature={feature} />
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-col items-center justify-center mt-20 font-medium leading-8 tracking-tight text-neutral-900">
          {!session ? (
            <div className="relative inline-flex w-fit">
              <Link to="/signin">
                <Button text={'Get Started'} />
              </Link>
            </div>
          ) : (
            <Link to="/home">
              <Button text={'Go home'} />
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
