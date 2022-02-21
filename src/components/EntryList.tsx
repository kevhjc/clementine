import { memo } from 'react';
import format from 'date-fns/format';

import { Item } from '../typings';

interface IEntryProps {
  items: Item[];
}

const EntryList = memo(({ items }: IEntryProps) => {
  return (
    <div className={'rounded-md'}>
      {Object.values(items).map((item, index) => (
        <li
          key={index}
          className="group relative rounded-md p-3 hover:bg-neutral-100 dark:hover:bg-neutral-700"
        >
          <div className="flex flex-col justify-center">
            {item.category === 'task' ? (
              <div className="mb-2 flex items-center">
                <input
                  type="checkbox"
                  id={item.id}
                  name="checkbox"
                  className="absolute h-6 w-6 opacity-0"
                />
                <div className="mr-2 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border-[1.5px] border-neutral-400/70 bg-transparent focus-within:border-blue-400">
                  <svg
                    className="pointer-events-none hidden h-3 w-3 fill-current"
                    version="1.1"
                    viewBox="0 0 17 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fillRule="evenodd">
                      <g
                        transform="translate(-9 -11)"
                        fill="#3b82f6"
                        fillRule="nonzero"
                      >
                        <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
                      </g>
                    </g>
                  </svg>
                </div>
                <label
                  htmlFor={item.id}
                  className="select-none font-sans text-lg font-bold"
                >
                  {item.title}
                </label>
              </div>
            ) : item.category === 'bookmark' ? (
              <div>
                <span className="break-words font-sans text-lg font-bold leading-6 underline hover:no-underline">
                  <a
                    href={item.content}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.title}
                  </a>
                </span>
              </div>
            ) : (
              <span className="font-sans text-lg font-bold leading-6">
                {item.title}
              </span>
            )}
            {item.content ? (
              <span className="... mt-1 truncate font-mono text-sm italic leading-6 text-neutral-500 dark:text-neutral-400">
                {item.content}
              </span>
            ) : null}
            <ul className="mt-1 flex flex-wrap text-sm font-normal leading-6 text-neutral-500 dark:text-neutral-400">
              <li
                className={
                  item.category === 'note'
                    ? 'text-orange-600 dark:text-orange-400'
                    : item.category === 'task'
                    ? 'text-blue-600 dark:text-blue-400'
                    : item.category === 'bookmark'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-neutral-500'
                }
              >
                {item.category}
              </li>
              <li className="mx-2 md:visible">&middot;</li>
              <li className="text-neutral-500">
                {format(new Date(item.inserted_at), "MMM d, yyyy '–' h:mm bb")}
              </li>
            </ul>
            {/* <Link
              className="absolute inset-0"
              to={`/${item.category}/${item.id}`}
            ></Link> */}
          </div>
        </li>
      ))}
    </div>
  );
});

export default EntryList;
