import React, { ReactNode, useRef, useContext } from 'react';
import { supabase } from '../supabaseClient';
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
  ExitIcon,
  ImageIcon,
  InfoCircledIcon,
  HomeIcon,
  Link1Icon,
  MagicWandIcon,
  TextIcon,
  VideoIcon,
} from '@radix-ui/react-icons';

import { UserContext } from '../context/UserContext';

interface ICommandPaletteProps {
  children: ReactNode;
}

/* eslint-disable no-unused-vars */
enum Sections {
  Account = 'Account',
  Navigation = 'Navigation',
  Entry = 'New Entry',
}

/* eslint-enable */
export default function CommandPalette({ children }: ICommandPaletteProps) {
  // const [loading, setLoading] = useState(false);
  // const [email, setEmail] = useState('');
  const session = useContext(UserContext);

  // TODO: fix session check and user login via kbar
  // useEffect(() => {
  //   getProfile();
  // }, [session]);

  // const handleLogin = async (email: string) => {
  //   try {
  //     setLoading(true);
  //     const { error } = await supabase.auth.signIn({ email });
  //     if (error) throw error;
  //   } catch (error) {
  //     console.log('Error logging in: ', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // async function getProfile() {
  //   try {
  //     setLoading(true);
  //     const user = supabase.auth.user();

  //     let { error, status } = await supabase
  //       .from('profiles')
  //       .select(`id`)
  //       .eq('id', user?.id)
  //       .single();

  //     if (error && status !== 406) {
  //       throw error;
  //     }
  //   } catch (error) {
  //     console.log('Error retrieving profile: ', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  const sessionActions = [
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
      id: 'more',
      name: 'Learn more',
      icon: <InfoCircledIcon />,
      shortcut: ['?'],
      section: Sections.Navigation,
      keywords: 'learn more',
      perform: () => (window.location.pathname = 'learn-more'),
    },
    {
      id: 'signout',
      name: 'Sign out',
      icon: <ExitIcon />,
      shortcut: [''],
      section: Sections.Account,
      keywords: 'sign out',
      perform: () => supabase.auth.signOut(),
    },
  ];

  const noSessionActions = [
    {
      id: 'signin',
      name: 'Sign in with Magic Link',
      icon: <MagicWandIcon />,
      shortcut: [''],
      section: Sections.Account,
      keywords: 'sign in',
    },
    {
      id: 'email',
      name: 'Sign in with Magic Link',
      icon: <MagicWandIcon />,
      shortcut: [''],
      section: Sections.Account,
      keywords: 'enter email',
      parent: 'signin',
      // perform: () => handleLogin(email),
    },
    {
      id: 'more',
      name: 'Learn more',
      icon: <InfoCircledIcon />,
      shortcut: ['?'],
      section: Sections.Navigation,
      keywords: 'learn more',
      perform: () => (window.location.pathname = 'learn-more'),
    },
  ];

  return (
    <>
      {session ? (
        <KBarProvider actions={noSessionActions}>
          <CommandMenu />
          {children}
        </KBarProvider>
      ) : (
        <KBarProvider actions={sessionActions}>
          <CommandMenu />
          {children}
        </KBarProvider>
      )}
    </>
  );
}

function CommandMenu() {
  return (
    <KBarPortal>
      <KBarPositioner
        className="bg-neutral-100/50 backdrop-blur-sm dark:bg-black/50"
        style={{ padding: '10vh 16px 16px' }}
      >
        <KBarAnimator className="z-10 w-full max-w-2xl overflow-hidden rounded-lg border border-neutral-300 bg-white/80 shadow-2xl backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-800/80 dark:text-white">
          <div>
            <KBarSearch className="mb-2 box-border w-full border-b-[1px] bg-white/70 px-4 pt-4 pb-4 outline-none backdrop-blur-sm dark:border-neutral-700/80 dark:bg-neutral-800/80 dark:placeholder:text-neutral-100/60" />
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
            action.id === 'signout' &&
            'bg-red-200/30 dark:bg-red-600/20'
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
