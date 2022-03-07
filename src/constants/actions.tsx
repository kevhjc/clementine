import { supabase } from '../lib/supabase';
import {
  FileTextIcon,
  EnterIcon,
  ExitIcon,
  InfoCircledIcon,
  HomeIcon,
  Link2Icon,
  Pencil2Icon,
} from '@radix-ui/react-icons';

import * as PATHS from './paths';

import { Sections } from '../lib/enums';

export const ACTIONS = [
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
    icon: <Pencil2Icon />,
    shortcut: ['t'],
    section: Sections.Entry,
    keywords: 'task',
    perform: () => (window.location.href = PATHS.NEW_TASK),
  },
  {
    id: 'bookmark',
    name: 'Bookmark',
    icon: <Link2Icon />,
    shortcut: ['b'],
    section: Sections.Entry,
    keywords: 'bookmark',
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
    name: 'Sign in',
    icon: <EnterIcon />,
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
    perform: () => supabase.auth.signOut(),
  },
];
