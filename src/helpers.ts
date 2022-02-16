import faker from '@faker-js/faker';

export const reorder = <T>(
  list: T[],
  startIndex: number,
  endIndex: number
): T[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const getItems = (count: number) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `Item ${k + 1}`,
    primary: faker.commerce.productName(),
    secondary: faker.company.catchPhrase(),
    department: faker.name.firstName(),
  }));
