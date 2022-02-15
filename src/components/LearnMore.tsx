export default function LearnMore() {
  return (
    <div className='px-4 font-mono mt-40'>
      <div className='max-w-7xl mx-auto px-10'>
        <div className='text-center'>
          <p className='mt-2 text-3xl leading-8 font-medium tracking-tight sm:text-5xl'>
            What's <span className='font-black'>Canvas?</span>
          </p>
          <p className='font-sans mt-4 max-w-2xl text-xl text-neutral-500 dark:text-neutral-300 mx-auto'>
            A place to save your thoughts and ideas. Save your notes, links, or
            images/videos to your Canvas.
          </p>
          <p className='mt-20 text-3xl leading-8 font-medium tracking-tight sm:text-5xl'>
            What's the stack?
          </p>
          <p className='font-sans mt-4 max-w-2xl text-xl text-neutral-500 dark:text-neutral-300 mx-auto'>
            TypeScript, React, Tailwind CSS
          </p>
          <p className='mt-20 text-3xl leading-8 font-medium tracking-tight sm:text-5xl'>
            Who made it?
          </p>
          <p className='font-sans mt-4 max-w-2xl text-xl text-neutral-500 dark:text-neutral-300 mx-auto'>
            Built by{' '}
            <a
              href='https://www.kevc.xyz/'
              target='_blank'
              rel='noopener noreferrer'
              className='underline hover:no-underline'
            >
              {`Kevin`}
            </a>
            {' ✌️'}
          </p>
        </div>
      </div>
    </div>
  );
}
