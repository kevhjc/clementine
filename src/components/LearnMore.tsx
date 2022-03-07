export default function LearnMore() {
  return (
    <div className="h-screen px-4 pt-40">
      <div className="mx-auto max-w-7xl px-10">
        <h1 className="mt-4 text-3xl font-black leading-8 tracking-tight sm:text-5xl">
          What's Clementine?
        </h1>
        <p className="mx-auto mb-14 mt-4 text-xl text-neutral-600 dark:text-neutral-300">
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
        </p>

        <h1 className="mt-4 text-3xl font-black leading-8 tracking-tight sm:text-5xl">
          How do I use shortcuts?
        </h1>
        <p className="mx-auto mt-4 text-xl text-neutral-600 dark:text-neutral-300">
          Enter{' '}
          <span className="mx-[1px] rounded bg-yellow-200/70 p-[1px] font-mono text-yellow-700 dark:bg-yellow-500/70 dark:text-yellow-100">
            Command + K
          </span>{' '}
          or (or Control + K on Windows) to access the Command Palette from any
          page.
        </p>
        <p className="mx-auto mt-2 mb-14 text-xl text-neutral-600 dark:text-neutral-300">
          Use global keyboard shortcuts (like{' '}
          <span className="mx-[1px] rounded bg-yellow-200/70 p-[1px] font-mono text-yellow-700 dark:bg-yellow-500/70 dark:text-yellow-100">
            B
          </span>{' '}
          for a new bookmark or{' '}
          <span className="mx-[1px] rounded bg-yellow-200/70 p-[1px] font-mono text-yellow-700 dark:bg-yellow-500/70 dark:text-yellow-100">
            T
          </span>{' '}
          for a new task) for quick entries.
        </p>

        <h1 className="mt-4 text-3xl font-black leading-8 tracking-tight sm:text-5xl">
          Questions or feedback?
        </h1>
        <p className="mx-auto mt-4 text-xl text-neutral-600 dark:text-neutral-300">
          <strong>{'Twitter: '}</strong>
          <a
            href="https://twitter.com/clementine_help"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-[1px] rounded bg-neutral-200/70 p-[1px] px-2 hover:bg-neutral-300/70 dark:bg-neutral-700/70 dark:hover:bg-neutral-600/70"
          >
            {`@clementine_help`}
          </a>
        </p>
        <p className="mx-auto mt-2 mb-14 text-xl text-neutral-600 dark:text-neutral-300">
          <strong>{'Email: '}</strong>
          <a
            href="mailto:hello@clementine.today"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-[1px] rounded bg-neutral-200/70 p-[1px] px-2 hover:bg-neutral-300/70 dark:bg-neutral-700/70 dark:hover:bg-neutral-600/70"
          >
            {`hello@clementine.today`}
          </a>
        </p>

        <h1 className="mt-4 text-3xl font-black leading-8 tracking-tight sm:text-5xl">
          Who made it?
        </h1>
        <p className="mx-auto mt-4 text-xl text-neutral-600 dark:text-neutral-300">
          Built by{' '}
          <a
            href="https://www.kevc.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-1 hover:no-underline"
          >
            {`Kevin`}
          </a>
          {' ✌️'}
        </p>
        <div className="mx-auto mt-14 pb-24 text-xl text-neutral-600 dark:text-neutral-300">
          <a
            href="https://www.producthunt.com/posts/clementine-4?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-clementine&#0045;4"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=333198&theme=dark"
              alt="Clementine: A place to save your thoughts and ideas | Product Hunt"
              width="200"
              height="43"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
