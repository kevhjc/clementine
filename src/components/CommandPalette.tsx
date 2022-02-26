import React, { useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
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
  FileTextIcon,
  ExitIcon,
  InfoCircledIcon,
  HomeIcon,
  Link2Icon,
  Pencil2Icon,
  PersonIcon,
  MagicWandIcon,
} from '@radix-ui/react-icons';

import * as PATHS from '../constants/paths';

import { ICommandPaletteProps } from '../lib/interfaces';
import { Sections } from '../lib/enums';

import { SessionContext } from '../context/SessionContext';

export default function CommandPalette({ children }: ICommandPaletteProps) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    supabase.auth.signOut();
    return navigate('/signin');
  };

  const actions = [
    {
      id: 'note',
      name: 'Note',
      icon: <FileTextIcon />,
      shortcut: ['n'],
      section: Sections.Entry,
      keywords: 'note',
      perform: () => (window.location.href = PATHS.NEW_NOTE),
    },
    {
      id: 'task',
      name: 'Task',
      shortcut: ['t'],
      section: Sections.Entry,
      keywords: 'task',
      icon: <Pencil2Icon />,
      perform: () => (window.location.href = PATHS.NEW_TASK),
    },
    {
      id: 'bookmark',
      name: 'Bookmark',
      shortcut: ['b'],
      section: Sections.Entry,
      keywords: 'bookmark',
      icon: <Link2Icon />,
      perform: () => (window.location.href = PATHS.NEW_BOOKMARK),
    },
    {
      id: 'home',
      name: 'Home',
      icon: <HomeIcon />,
      shortcut: ['h'],
      section: Sections.Navigation,
      keywords: 'home',
      perform: () => (window.location.href = PATHS.HOME),
    },
    {
      id: 'more',
      name: 'Learn more',
      icon: <InfoCircledIcon />,
      shortcut: ['?'],
      section: Sections.Navigation,
      keywords: 'learn more',
      perform: () => (window.location.href = PATHS.LEARN_MORE),
    },
    {
      id: 'signin',
      name: 'Sign in with Magic Link',
      icon: <MagicWandIcon />,
      shortcut: [''],
      section: Sections.Account,
      keywords: 'sign in',
      perform: () => (window.location.href = PATHS.SIGN_IN),
    },
    {
      id: 'signout',
      name: 'Sign out',
      icon: <ExitIcon />,
      shortcut: [''],
      section: Sections.Account,
      keywords: 'sign out',
      perform: () => handleSignOut(),
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
  const session = useContext(SessionContext);

  return (
    <KBarPortal>
      <KBarPositioner
        className="bg-neutral-100/50 backdrop-blur-sm dark:bg-black/50"
        style={{ padding: '9rem 16px 16px' }}
      >
        {session ? (
          <div>
            <span
              className="fixed top-20 z-20 flex cursor-pointer justify-center rounded-lg border border-neutral-200 bg-white/80 px-4 py-2 font-mono dark:border-neutral-700/80 dark:bg-neutral-800 dark:text-neutral-100/80
              "
            >
              <PersonIcon className="mr-2 h-6 w-4 opacity-80" />
              {session.user.email}
            </span>
          </div>
        ) : null}
        <KBarAnimator className="z-10 w-full max-w-2xl overflow-hidden rounded-lg border border-neutral-300 bg-white/80 shadow-2xl backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-800/80 dark:text-white">
          <div>
            <KBarSearch
              defaultPlaceholder="What would you like to do?"
              className="mb-2 box-border w-full border-b-[1px] bg-white/70 px-4 pt-4 pb-4 outline-none backdrop-blur-sm dark:border-neutral-700/80 dark:bg-neutral-800/80 dark:placeholder:text-neutral-100/60"
            />
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
  const session = useContext(SessionContext);

  return (
    <div className="relative" ref={wrapperRef}>
      {session ? (
        <KBarResults
          items={results.filter((action) =>
            action !== NO_GROUP && typeof action !== 'string'
              ? action.id !== 'signin'
              : action
          )}
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
      ) : (
        <KBarResults
          items={results.filter((action) =>
            action !== NO_GROUP && typeof action !== 'string'
              ? action.section !== 'New Entry' &&
                action.id !== 'signout' &&
                action.id !== 'home'
              : action !== 'New Entry'
          )}
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
      )}
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
					mx-1.5 flex cursor-pointer
					items-center justify-between rounded-md py-2 px-3
					${active && 'bg-gray-200/70 dark:bg-neutral-600/30'}
          ${
            active &&
            action.id === 'signin' &&
            'bg-sky-200/30 dark:bg-sky-600/20'
          }
          ${
            active &&
            action.id === 'note' &&
            'bg-rose-200/30 dark:bg-rose-600/20'
          }
          ${
            active && action.id === 'task' && 'bg-sky-200/30 dark:bg-sky-600/20'
          }
          ${
            active &&
            action.id === 'bookmark' &&
            'bg-emerald-200/30 dark:bg-emerald-600/20'
          }
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
