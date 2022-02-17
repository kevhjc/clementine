import * as React from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { Tab } from '@headlessui/react';
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  KBarResults,
  useMatches,
  NO_GROUP,
} from 'kbar';
import {
  ImageIcon,
  Link1Icon,
  TextIcon,
  VideoIcon,
} from '@radix-ui/react-icons';

import { getItems, reorder } from '../helpers';
import EntryList from './EntryList';

const actions = [
  {
    id: 'Text',
    name: 'Text',
    shortcut: ['t'],
    keywords: 'text',
    icon: TextIcon,
    perform: () => (window.location.pathname = 'text'),
  },
  {
    id: 'url',
    name: 'URL',
    shortcut: ['u'],
    keywords: 'hyperlink',
    icon: Link1Icon,
    perform: () => (window.location.pathname = 'url'),
  },
  {
    id: 'image',
    name: 'Image',
    shortcut: ['i'],
    keywords: 'image',
    icon: ImageIcon,
    perform: () => (window.location.pathname = 'image'),
  },
  {
    id: 'video',
    name: 'Video',
    shortcut: ['v'],
    keywords: 'video',
    icon: VideoIcon,
    perform: () => (window.location.pathname = 'video'),
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Home = () => {
  const [items, setItems] = React.useState(getItems(15));
  const [allTab, setAllTab] = React.useState(true);

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    const newItems = reorder(items, source.index, destination.index);
    setItems(newItems);
  };

  const handleAllTabs = (index: number) => {
    if (index > 0) {
      setAllTab(false);
    }
    if (index === 0) {
      setAllTab(true);
    }
  };

  return (
    <>
      <KBarProvider actions={actions}>
        <KBarPortal>
          <KBarPositioner className="bg-neutral-800/75">
            <KBarAnimator className="min-h-[204px] w-1/2 min-w-[320px] overflow-scroll rounded border bg-neutral-100 p-2 shadow-xl">
              <KBarSearch
                className="mb-2 w-full rounded bg-white px-4 py-2 text-lg"
                defaultPlaceholder="Type or select an entry category"
              />
              <RenderResults actions={actions} />
            </KBarAnimator>
          </KBarPositioner>
        </KBarPortal>
        <div className="flex justify-center">
          <div className="mt-24 w-5/6 max-w-7xl py-16 font-mono">
            <Tab.Group onChange={(index) => handleAllTabs(index)}>
              <Tab.List className="mb-6 flex space-x-1 rounded-md bg-neutral-100 p-1 dark:bg-neutral-800">
                <Tab
                  key={0}
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-md py-3 font-sans font-medium leading-5',
                      selected
                        ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-500 dark:text-neutral-100'
                        : ' text-neutral-600 hover:bg-neutral-200 dark:text-neutral-100 dark:hover:bg-neutral-700'
                    )
                  }
                >
                  {'All'}
                </Tab>
                {Object.values(items)
                  .slice(0, 4)
                  .map((item) => (
                    <Tab
                      key={item.id}
                      className={({ selected }) =>
                        classNames(
                          'w-full rounded-md py-3 font-sans font-medium leading-5',
                          selected
                            ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-500 dark:text-neutral-100'
                            : ' text-neutral-600 hover:bg-neutral-200 dark:text-neutral-100 dark:hover:bg-neutral-700'
                        )
                      }
                    >
                      {item.department}
                    </Tab>
                  ))}
              </Tab.List>
              <Tab.Panels className="mt-2">
                <Tab.Panel
                  key={0}
                  className="rounded-md bg-neutral-50 p-3 dark:bg-neutral-800"
                >
                  <ul>
                    <EntryList
                      items={items}
                      onDragEnd={onDragEnd}
                      key={0}
                      category={'all'}
                    />
                  </ul>
                </Tab.Panel>
                {Object.values(items).map((categories, idx) => (
                  <Tab.Panel
                    key={idx}
                    className="rounded-md bg-neutral-50 p-3 dark:bg-neutral-800"
                  >
                    <ul>
                      <EntryList
                        items={items}
                        onDragEnd={onDragEnd}
                        key={idx}
                        category={!allTab ? categories.department : 'all'}
                      />
                    </ul>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </KBarProvider>
    </>
  );
};

function RenderResults(actions: any) {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <div className="text-xl">{item}</div>
        ) : (
          <div
            className={
              active
                ? 'text-md flex cursor-copy gap-y-2 rounded bg-neutral-200 py-2 px-4 font-mono text-lg'
                : 'text-md flex cursor-pointer gap-y-2 rounded bg-neutral-100 py-2 px-4 font-mono text-lg'
            }
          >
            {item.name}
          </div>
        )
      }
    />
  );
}

export default Home;
