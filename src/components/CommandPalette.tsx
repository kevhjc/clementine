import React, { ReactNode, useRef } from 'react';
import {
  ActionId,
  ActionImpl,
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarResults,
  KBarSearch,
  NO_GROUP,
  useMatches,
} from 'kbar';
import {
  ImageIcon,
  Link1Icon,
  TextIcon,
  VideoIcon,
} from '@radix-ui/react-icons';

/* eslint-disable no-unused-vars */
enum Sections {
  Post = 'new post',
}

/* eslint-enable */
export default function CommandPalette({ children }: { children: ReactNode }) {
  const actions = [
    {
      id: 'text',
      name: 'Text',
      icon: <TextIcon />,
      shortcut: ['t'],
      section: Sections.Post,
      keywords: 'text',
      perform: () => (window.location.pathname = 'text'),
    },
    {
      id: 'url',
      name: 'URL',
      shortcut: ['u'],
      keywords: 'url',
      icon: <Link1Icon />,
      perform: () => (window.location.pathname = 'url'),
    },
    {
      id: 'image',
      name: 'Image',
      shortcut: ['i'],
      keywords: 'image',
      icon: <ImageIcon />,
      perform: () => (window.location.pathname = 'image'),
    },
    {
      id: 'video',
      name: 'Video',
      shortcut: ['v'],
      keywords: 'video',
      icon: <VideoIcon />,
      perform: () => (window.location.pathname = 'video'),
    },
  ];

  return (
    <KBarProvider actions={actions}>
      <CommandMenu />
      {children}
    </KBarProvider>
  );
}

function CommandMenu() {
  return (
    <KBarPortal>
      <KBarPositioner
        className="bg-white/80 dark:bg-black/80"
        style={{ padding: '10vh 16px 16px' }}
      >
        <KBarAnimator className="z-10 w-full max-w-2xl overflow-hidden rounded-lg border bg-white shadow-2xl dark:border-neutral-700 dark:bg-neutral-800 dark:text-white">
          <div>
            <KBarSearch className="mb-2 box-border w-full border-b-[1px] px-4 pt-4 pb-4 outline-none dark:border-neutral-500/40 dark:bg-neutral-800 dark:placeholder:text-neutral-100/60" />
          </div>
          <div className="pb-2">
            <Results />
          </div>
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
}

function Results() {
  const { results, rootActionId } = useMatches();
  const wrapperRef = useRef(null);

  return (
    <div className="relative" ref={wrapperRef}>
      <KBarResults
        items={results.filter((i) => i !== NO_GROUP)}
        onRender={({ item, active }) =>
          typeof item === 'string' ? (
            <p className="pb-2 pl-3 pt-3 text-xs uppercase dark:text-neutral-100/60">
              {item}
            </p>
          ) : (
            <ResultItem
              action={item}
              active={active}
              currentRootActionId={rootActionId as string}
            />
          )
        }
      />
    </div>
  );
}

// eslint-disable-next-line react/display-name
const ResultItem = React.forwardRef(
  (
    {
      action,
      active,
      currentRootActionId,
    }: {
      action: ActionImpl;
      active: boolean;
      currentRootActionId: ActionId;
    },
    ref: React.Ref<HTMLDivElement>
  ) => {
    const ancestors = React.useMemo(() => {
      if (!currentRootActionId) return action.ancestors;
      const index = action.ancestors.findIndex(
        (ancestor) => ancestor.id === currentRootActionId
      );
      return action.ancestors.slice(index + 1);
    }, [action.ancestors, currentRootActionId]);

    return (
      <div
        ref={ref}
        className={`
					mx-1.5 flex
					cursor-pointer items-center justify-between rounded-md py-2 px-3
					${active && 'bg-gray-100 dark:bg-neutral-600/30'}
					font-mono transition-colors delay-[0]
					duration-[.15s] dark:text-neutral-100/80
				`}
      >
        <div className="text-md flex items-center gap-3">
          <span className="h-4 w-5 opacity-70">
            {action.icon && action.icon}
          </span>

          <div className="mt-0.5 flex flex-col">
            <div>
              {ancestors.length > 0 &&
                ancestors.map((ancestor: ActionImpl) => (
                  <React.Fragment key={ancestor.id}>
                    <span>{ancestor.name}</span>
                    <span className="mr-0.5">&rsaquo;</span>
                  </React.Fragment>
                ))}
              <span>{action.name}</span>
            </div>

            {action.subtitle && (
              <span className="text-[0.75rem]">{action.subtitle}</span>
            )}
          </div>
        </div>

        {action.shortcut?.length ? (
          <div aria-hidden className="grid-flow-cols grid">
            {action.shortcut.map((sc) => (
              <kbd
                key={sc}
                className="text-md rounded-md bg-neutral-200 px-2 dark:bg-neutral-700"
              >
                {sc}
              </kbd>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
);
