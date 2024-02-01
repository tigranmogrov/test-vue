import { IPost } from '@/types';
import { Ref } from 'vue';

interface IFilterArray {
  [k: string]: any;
}

const searchText = (el: string, search: string): boolean => {
  return el.toLowerCase().includes(search.toLowerCase());
};

const sortByKey = (data: IFilterArray[], key: string): IFilterArray[] => {
  return [...data].sort((a, b) => {
    if (typeof a[key] === 'string' && typeof b[key] === 'string') {
      return a[key].localeCompare(b[key]);
    }
    return a[key] - b[key];
  });
};

export const filteredArray = (
  postData: IFilterArray[],
  sortBy: string,
  search: string
): IFilterArray[] => {
  let filteredData: IFilterArray[] = [...postData];

  if (sortBy === 'first_name' || sortBy === 'id') {
    filteredData = sortByKey(filteredData, sortBy);
  }

  return filteredData.filter(
    (el) =>
      searchText(el.first_name, search) || searchText(el.last_name, search)
  );
};
