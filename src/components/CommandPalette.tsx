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
  InfoCircledIcon,
  HomeIcon,
  Link1Icon,
  TextIcon,
  TwitterLogoIcon,
  VideoIcon,
} from '@radix-ui/react-icons';

/* eslint-disable no-unused-vars */
enum Sections {
  Account = 'account',
  Navigation = 'navigation',
  Entry = 'new entry',
}

/* eslint-enable */
export default function CommandPalette({ children }: { children: ReactNode }) {
  const actions = [
    {
      id: 'signin',
      name: 'Sign in with Twitter',
      icon: <TwitterLogoIcon />,
      shortcut: ['s'],
      section: Sections.Account,
      keywords: 'signin',
      perform: () => (window.location.pathname = 'signin'),
    },
    {
      id: 'home',
      name: 'Home',
      icon: <HomeIcon />,
      shortcut: ['h'],
      section: Sections.Navigation,
      keywords: 'home',
      perform: () => (window.location.pathname = 'home'),
    },
    {
      id: 'learnmore',
      name: 'Learn more',
      icon: <InfoCircledIcon />,
      shortcut: ['?'],
      section: Sections.Navigation,
      keywords: 'learnmore',
      perform: () => (window.location.pathname = 'learn-more'),
    },
    {
      id: 'text',
      name: 'Text',
      icon: <TextIcon />,
      shortcut: ['t'],
      section: Sections.Entry,
      keywords: 'text',
      perform: () => (window.location.pathname = 'text'),
    },
    {
      id: 'url',
      name: 'URL',
      shortcut: ['u'],
      section: Sections.Entry,
      keywords: 'url',
      icon: <Link1Icon />,
      perform: () => (window.location.pathname = 'url'),
    },
    {
      id: 'image',
      name: 'Image',
      shortcut: ['i'],
      section: Sections.Entry,
      keywords: 'image',
      icon: <ImageIcon />,
      perform: () => (window.location.pathname = 'image'),
    },
    {
      id: 'video',
      name: 'Video',
      shortcut: ['v'],
      section: Sections.Entry,
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
        className="bg-neutral-100/50 backdrop-blur-sm dark:bg-black/50"
        style={{ padding: '8vh 16px 16px' }}
      >
        <KBarAnimator className="z-10 w-full max-w-2xl overflow-hidden rounded-lg border border-neutral-300 bg-white/80 shadow-2xl backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-800/80 dark:text-white">
          <div>
            <KBarSearch className="mb-2 box-border w-full border-b-[1px] bg-white/70 px-4 pt-4 pb-4 outline-none backdrop-blur-sm dark:border-neutral-500/80 dark:bg-neutral-800/80 dark:placeholder:text-neutral-100/60" />
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
            <p className="pb-2 pl-3 pt-3 text-xs uppercase text-neutral-500 dark:text-neutral-100">
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
					${active && 'bg-gray-200/70 dark:bg-neutral-600/30'}
					font-mono transition-colors delay-[0]
					duration-[.15s] dark:text-neutral-100/80
				`}
      >
        <div className="text-md flex items-center gap-3">
          <span className="h-4 w-5 opacity-80">
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
                className="text-md rounded-md bg-neutral-300/70 px-2 dark:bg-neutral-600/70"
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
