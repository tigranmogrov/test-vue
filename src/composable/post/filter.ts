function findSomeText(el: any, keys: string[], search: string): boolean {
  for (const key of keys) {
    const value = el[key];
    if (value.toLowerCase().includes(search.trim().toLowerCase())) {
      return true;
    }
  }
  return false;
}

function sortByKey<T>(data: T[], key: string | number): T[] {
  return [...data].sort((a, b) => {
    if (typeof a[key] === 'string' && typeof b[key] === 'string') {
      return (a[key] as unknown as string).localeCompare(
        b[key] as unknown as string
      );
    }
    if (typeof a[key] === 'number' && typeof b[key] === 'number') {
      return (a[key] as unknown as number) - (b[key] as unknown as number);
    }
    return 0;
  });
}

export function filteredArray<T>(
  data: T[],
  sortBy: string,
  searchText: string,
  keys: string[]
): T[] {
  const filteredData: T[] = sortByKey(data, sortBy);

  return filteredData.filter((el) => findSomeText(el, keys, searchText));
}
