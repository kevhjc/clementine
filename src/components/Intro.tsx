import { Link } from 'react-router-dom';
import { CodeIcon, ImageIcon, Link1Icon } from '@radix-ui/react-icons';

const features = [
  {
    name: 'Text',
    description: 'Add notes or code snippets',
    icon: CodeIcon,
  },
  {
    name: 'Links',
    description: 'Save links to webpages',
    icon: Link1Icon,
  },
  {
    name: 'Media',
    description: 'Embed images or videos',
    icon: ImageIcon,
  },
];

export default function Intro() {
  return (
    <div className="mt-40 px-4 font-mono">
      <div className="mx-auto max-w-7xl px-10">
        <div className="text-center">
          <p className="mt-2 text-3xl font-medium leading-8 tracking-tight sm:text-5xl">
            Say 👋 to <span className="font-black">Canvas.</span>
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-neutral-500 dark:text-neutral-300">
            A place to save your thoughts and ideas
          </p>
        </div>

        <div className="mt-24 flex justify-center">
          <dl className="space-y-10 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10 md:space-y-0">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-red-100 text-red-800 dark:bg-red-400">
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

        <div className="mt-24 flex justify-center text-center font-medium leading-8 tracking-tight text-neutral-900">
          <div className="relative inline-flex w-fit">
            <Link to="/signin">
              <button
                type="button"
                className="mb-2 flex animate-bounce items-center justify-center rounded bg-red-500 px-8 py-3 pb-3 font-medium leading-tight text-white transition duration-150 ease-in-out hover:bg-red-600 focus:outline-none focus:ring-0 dark:bg-red-700"
              >
                Get started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
