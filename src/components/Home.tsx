/* eslint-disable jsx-a11y/anchor-has-content */
import { useState } from 'react';
import { Tab } from '@headlessui/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Home() {
  let [categories] = useState({
    All: [
      {
        id: 1,
        title: `function classNames(...classes: string[]) {
          return classes.filter(Boole...`,
        date: '5h ago',
        category: 'Code snippet',
        shareCount: 2,
      },
      {
        id: 2,
        title: 'https://www.kevc.xyz/',
        date: '2h ago',
        category: 'Url',
        shareCount: 2,
      },
      {
        id: 3,
        title: `YouTube: What State Management Library Should I Use with React?
          `,
        date: '2d ago',
        category: 'Video',
        shareCount: 5,
      },
      {
        id: 4,
        title: "The worst advice we've ever heard about coffee",
        date: '4d ago',
        category: 'Image',
        shareCount: 2,
      },
      {
        id: 5,
        title: 'https://www.bookmarkr.link/',
        date: 'Jan 7',
        category: 'Url',
      },
      {
        id: 6,
        title: 'The most innovative things happening in coffee',
        date: 'Mar 19',
        category: 'Rich text',
      },
      {
        id: 7,
        title: 'An example of a rich text entry',
        date: 'Oct 21',
        category: 'Rich text',
      },
    ],
    Text: [
      {
        id: 1,
        title: 'Does drinking coffee make you smarter?',
        date: '5h ago',
        category: 'Image',
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: '2h ago',
        category: 'Note',
      },
    ],
    Link: [
      {
        id: 1,
        title: 'Is tech making coffee better or worse?',
        date: 'Jan 7',
        category: 'Todo',
      },
      {
        id: 2,
        title: 'The most innovative things happening in coffee',
        date: 'Mar 19',
        category: 'Video',
      },
    ],
    Image: [
      {
        id: 1,
        title: 'Ask Me Anything: 10 answers to your questions about coffee',
        date: '2d ago',
        category: 'Image',
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: '4d ago',
        category: 'Code snippet',
      },
    ],
    Video: [
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: '4d ago',
        category: 1,
      },
      {
        id: 1,
        title: 'Ask Me Anything: 10 answers to your questions about coffee',
        date: '2d ago',
        category: 9,
      },
    ],
  });

  return (
    <div className='flex justify-center'>
      <div className='max-w-7xl w-5/6 px-2 py-16 font-mono mt-24'>
        <Tab.Group>
          <Tab.List className='mb-6 flex p-1 space-x-1 bg-neutral-200 dark:bg-neutral-800 rounded-md'>
            {Object.keys(categories).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    'w-full py-3 font-sans leading-5 font-medium rounded-md',
                    selected
                      ? 'bg-white text-neutral-900 dark:text-neutral-100 dark:bg-neutral-600 shadow-sm'
                      : ' text-neutral-600 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className='mt-2'>
            {Object.values(categories).map((posts, idx) => (
              <Tab.Panel
                key={idx}
                className='bg-neutral-50 dark:bg-neutral-800 rounded-md p-3'
              >
                <ul>
                  {posts.map((post) => (
                    <li
                      key={post.id}
                      className='relative p-3 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    >
                      <h3 className='font-medium leading-5'>{post.title}</h3>

                      <ul className='flex text-sm mt-1 space-x-2 font-normal leading-4 text-neutral-500 dark:text-neutral-400'>
                        <li>{post.date}</li>
                        <li>&middot;</li>
                        <li
                          className={
                            post.category === 'Rich text'
                              ? 'text-red-400'
                              : post.category === 'Code snippet'
                              ? 'text-blue-400'
                              : post.category === 'Url'
                              ? 'text-green-400'
                              : post.category === 'Video'
                              ? 'text-purple-400'
                              : post.category === 'Image'
                              ? 'text-yellow-400'
                              : 'text-black dark:text-neutral-400'
                          }
                        >
                          {post.category}
                        </li>
                      </ul>

                      <a href='/' className='absolute inset-0 rounded-md' />
                    </li>
                  ))}
                </ul>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
