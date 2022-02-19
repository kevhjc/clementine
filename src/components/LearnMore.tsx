export default function LearnMore() {
  return (
    <div className="h-screen px-4 pt-40 font-mono">
      <div className="mx-auto max-w-7xl px-10">
        <div className="text-center">
          <p className="mt-2 text-3xl font-medium leading-8 tracking-tight sm:text-5xl">
            What's <span className="font-black">Lerret?</span>
          </p>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-xl text-neutral-500 dark:text-neutral-300">
            A place to save your thoughts and ideas. Save notes, links, or
            images/videos to your Lerret.
          </p>
          <p className="mt-20 text-3xl font-medium leading-8 tracking-tight sm:text-5xl">
            What's the stack?
          </p>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-xl text-neutral-500 dark:text-neutral-300">
            TypeScript, React, React Beautiful DnD, kbar, Tailwind CSS, Supabase
          </p>
          <p className="mt-20 text-3xl font-medium leading-8 tracking-tight sm:text-5xl">
            Who made it?
          </p>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-xl text-neutral-500 dark:text-neutral-300">
            Built by{' '}
            <a
              href="https://www.kevc.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
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
