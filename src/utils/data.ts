interface Entry {
  id: string;
  category: string;
  content: string;
  createdAt: string;
}

let ENTRIES: Entry[] = [
  {
    id: 'Item 1',
    category: 'text',
    content: 'this is the first item in the items array',
    createdAt: 'Fri Nov 19 2021 16:08:53 GMT-0800 (Pacific Standard Time)',
  },
  {
    id: 'Item 2',
    category: 'bookmark',
    content: 'this is the first bookmark entry',
    createdAt: 'Fri Nov 08 2021 12:41:23 GMT-0800 (Pacific Standard Time)',
  },
  {
    id: 'Item 3',
    category: 'text',
    content: 'this is the second text entry',
    createdAt: 'Fri Nov 19 2021 16:08:53 GMT-0800 (Pacific Standard Time)',
  },
  {
    id: 'Item 4',
    category: 'code',
    content: 'this is the first code snippet entry',
    createdAt: 'Fri Nov 08 2021 12:41:23 GMT-0800 (Pacific Standard Time)',
  },
  {
    id: 'Item 5',
    category: 'bookmark',
    content: 'this is the second bookmark entry',
    createdAt: 'Fri Nov 19 2021 16:08:53 GMT-0800 (Pacific Standard Time)',
  },
  {
    id: 'Item 6',
    category: 'code',
    content: 'this is the second code snippet entry',
    createdAt: 'Fri Nov 08 2021 12:41:23 GMT-0800 (Pacific Standard Time)',
  },
];

function filterByCategory(category: string) {
  return ENTRIES.filter(
    (item) => item.category.toLowerCase() === category.toLowerCase()
  );
}

function getEntryById(id: string) {
  return ENTRIES.find((item) => item.id === id);
}

let categories = [...new Set(ENTRIES.map((item) => item.category))];

export { categories, ENTRIES, filterByCategory, getEntryById };
