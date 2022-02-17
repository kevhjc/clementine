import { useRef } from 'react';

export default function Submit() {
  const input = useRef<HTMLInputElement>(null);

  return (
    <div className='flex justify-center'>
      <div className='mt-32 w-5/6 max-w-7xl rounded-lg border border-red-100 bg-red-50 p-4 duration-300 hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800'>
        <form className='relative my-1' action='#' method='POST'>
          <input
            ref={input}
            aria-label='Add an entry'
            placeholder='Add an entry'
            type='text'
            required
            className={
              'mt-1 block w-full rounded-lg bg-white px-4 py-3 pr-32 text-neutral-900 dark:bg-neutral-500 dark:text-neutral-200'
            }
          />
          <button
            className='absolute right-1 top-1 flex h-10 w-28 items-center justify-center rounded bg-red-200 px-4 font-sans font-medium text-neutral-900 transition-all hover:bg-red-300 dark:bg-red-600 dark:text-neutral-200 dark:hover:bg-red-700'
            type='submit'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
