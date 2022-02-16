import { useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { Tab } from '@headlessui/react';
import { getItems, reorder } from '../helpers';

import EntryList from './EntryList';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Home = () => {
  const [items, setItems] = useState(getItems(5));
  const [allTab, setAllTab] = useState(true);

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    const newItems = reorder(items, source.index, destination.index);
    setItems(newItems);
  };

  const handleAllTabs = (index: number) => {
    console.log('index of this tab is', index);
    if (index > 0) {
      setAllTab(false);
    }
    if (index === 0) {
      setAllTab(true);
    }
  };

  return (
    <div className='flex justify-center'>
      <div className='max-w-7xl w-5/6 px-2 py-16 font-mono mt-24'>
        <Tab.Group onChange={(index) => handleAllTabs(index)}>
          <Tab.List className='mb-6 flex p-1 space-x-1 bg-neutral-200 dark:bg-neutral-800 rounded-md'>
            <Tab
              key={0}
              className={({ selected }) =>
                classNames(
                  'w-full py-3 font-sans leading-5 font-medium rounded-md',
                  selected
                    ? 'bg-white text-neutral-900 dark:text-neutral-100 dark:bg-neutral-600 shadow-sm'
                    : ' text-neutral-600 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                )
              }
            >
              {'All'}
            </Tab>
            {Object.values(items).map((item) => (
              <Tab
                key={item.id}
                className={({ selected }) =>
                  classNames(
                    'w-full py-3 font-sans leading-5 font-medium rounded-md',
                    selected
                      ? 'bg-white text-neutral-900 dark:text-neutral-100 dark:bg-neutral-600 shadow-sm'
                      : ' text-neutral-600 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                  )
                }
              >
                {item.department}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className='mt-2'>
            <Tab.Panel
              key={0}
              className='bg-neutral-50 dark:bg-neutral-800 rounded-md p-3'
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
                className='bg-neutral-50 dark:bg-neutral-800 rounded-md p-3'
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
  );
};

export default Home;
