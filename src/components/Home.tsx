import * as React from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { Tab } from '@headlessui/react';

import { getItems, reorder } from '../utils/helpers';
import EntryList from './EntryList';
import Footer from './Footer';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Home = () => {
  const [items, setItems] = React.useState(getItems(25));
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
      <div className="flex justify-center">
        <div className="mt-24 mb-24 w-5/6 max-w-7xl py-16 font-mono">
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
                  className="rounded-md bg-neutral-50/50 p-3 dark:bg-neutral-800/50"
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
      <Footer />
    </>
  );
};

export default Home;
