import React, { useRef, useContext } from 'react';
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
import { PersonIcon } from '@radix-ui/react-icons';

import { ACTIONS } from '../constants/actions';

import { ICommandPaletteProps } from '../lib/interfaces';

import { SessionContext } from '../context/SessionContext';

const CommandPalette = ({ children }: ICommandPaletteProps) => {
  return (
    <KBarProvider actions={ACTIONS}>
      <CommandMenu />
      {children}
    </KBarProvider>
  );
};

const CommandMenu = () => {
  const session = useContext(SessionContext);

  return (
    <KBarPortal>
      <KBarPositioner
        className="bg-neutral-100/50 backdrop-blur-sm dark:bg-black/50"
        style={{ padding: '9rem 16px 16px' }}
      >
        {session ? (
          <>
            <span className="fixed z-20 flex justify-center px-4 py-2 border rounded-lg cursor-pointer top-20 border-neutral-200 bg-white/80 dark:border-neutral-700/80 dark:bg-neutral-800 dark:text-neutral-100/80 ">
              <PersonIcon className="w-4 h-6 mr-2 opacity-80" />
              {session.user.email}
            </span>
          </>
        ) : null}
        <KBarAnimator className="z-10 w-full max-w-2xl overflow-hidden border rounded-lg shadow-2xl border-neutral-300 bg-white/80 backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-800/80 dark:text-white">
          <>
            <KBarSearch
              defaultPlaceholder="What would you like to do?"
              className="mb-2 box-border w-full border-b-[1px] bg-white/70 px-4 pt-4 pb-4 outline-none backdrop-blur-sm dark:border-neutral-700/80 dark:bg-neutral-800/80 dark:placeholder:text-neutral-100/60"
            />
          </>
          <div className="pb-2">
            <Results />
          </div>
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
};

const Results = () => {
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
              <p className="pt-3 pb-2 pl-3 text-xs uppercase text-neutral-500 dark:text-neutral-100">
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
              <p className="pt-3 pb-2 pl-3 text-xs uppercase text-neutral-500 dark:text-neutral-100">
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
};

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
					transition-colors delay-[0]
					duration-[.15s] dark:text-neutral-100/80
				`}
      >
        <div className="flex items-center gap-3 text-md">
          <span className="w-5 h-4 opacity-80">
            {action.icon && action.icon}
          </span>

          <div className="mt-0.5 flex flex-col">
            <>
              {ancestors.length > 0 &&
                ancestors.map((ancestor: ActionImpl) => (
                  <React.Fragment key={ancestor.id}>
                    <span>{ancestor.name}</span>
                    <span className="mr-0.5">&rsaquo;</span>
                  </React.Fragment>
                ))}
              <span>{action.name}</span>
            </>
            {action.subtitle && (
              <span className="text-[0.75rem]">{action.subtitle}</span>
            )}
          </div>
        </div>

        {action.shortcut?.length ? (
          <div aria-hidden className="grid grid-flow-cols">
            {action.shortcut.map((sc) => (
              <kbd
                key={sc}
                className="px-2 rounded-md text-md bg-neutral-300/70 dark:bg-neutral-600/70"
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

export default CommandPalette;
