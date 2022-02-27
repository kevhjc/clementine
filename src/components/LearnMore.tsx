export default function LearnMore() {
  return (
    <div className="h-screen px-4 pt-40">
      <div className="mx-auto max-w-7xl px-10">
        <div className="pb-24 text-center">
          <p className="mt-2 text-3xl font-black leading-8 tracking-tight sm:text-5xl">
            What's Clementine?
          </p>
          <div className="mx-auto mt-4 max-w-2xl text-xl text-neutral-600 dark:text-neutral-300">
            <ul className="px-6 text-center text-lg">
              A place to save your thoughts and ideas. Add{' '}
              <span className="mx-[1px] rounded bg-rose-200/70 p-[1px] font-mono text-rose-800 dark:bg-rose-500/70 dark:text-rose-200">
                notes
              </span>
              {', '}
              <span className="mx-[1px] rounded bg-sky-200/70 p-[1px] font-mono text-sky-800 dark:bg-sky-500/70 dark:text-sky-200">
                tasks
              </span>
              {', or '}
              <span className="mx-[1px] rounded bg-emerald-200/70 p-[1px] font-mono text-emerald-800 dark:bg-emerald-500/70 dark:text-emerald-200">
                bookmarks
              </span>{' '}
              throughout the day.
            </ul>
          </div>

          <p className="mt-20 text-3xl font-black leading-8 tracking-tight sm:text-5xl">
            What are these shortcuts?
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-neutral-600 dark:text-neutral-300">
            Use{' '}
            <span className="mx-[1px] rounded bg-yellow-200/70 p-[1px] font-mono text-yellow-700 dark:bg-yellow-500/70 dark:text-yellow-100">
              Command + K
            </span>{' '}
            or (or Control + K on Windows) to access the command palette from
            any page. Use global shortcuts (like{' '}
            <span className="mx-[1px] rounded bg-yellow-200/70 p-[1px] font-mono text-yellow-700 dark:bg-yellow-500/70 dark:text-yellow-100">
              B
            </span>{' '}
            for a new bookmark) for quick entries.
          </p>

          <p className="mt-20 text-3xl font-black leading-8 tracking-tight sm:text-5xl">
            What's the stack?
          </p>
          <div className="mx-auto mt-4 max-w-2xl text-xl text-neutral-600 dark:text-neutral-300">
            <ul className="px-6 text-center text-lg">
              <strong>{`Language: `}</strong>
              {`TypeScript`}
            </ul>
            <ul className="px-6 text-center text-lg">
              <strong>{`Framework: `}</strong>
              {`React`}
            </ul>
            <ul className="px-6 text-center text-lg">
              <strong>{`Styling: `}</strong>
              {`Tailwind CSS`}
            </ul>
            <ul className="px-6 text-center text-lg ">
              <strong>{`Database: `}</strong>
              {`Supabase`}
            </ul>
            <ul className="px-6 text-center text-lg">
              <strong>{`Deployment: `}</strong>
              {`Vercel`}
            </ul>
          </div>
          <p className="mt-20 text-3xl font-black leading-8 tracking-tight sm:text-5xl">
            Who made it?
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-neutral-600 dark:text-neutral-300">
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
