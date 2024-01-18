import { IPost } from '@/types';
import { Ref } from 'vue';

const searchText = (el: string, search: string) =>
  el.toLowerCase().includes(search.toLowerCase());

export const filteredAndSorted = (
  postData: Ref,
  sortBy: Ref,
  search: Ref
): IPost[] => {
  switch (sortBy.value) {
    case 'first_name':
      return [...postData.value]
        .sort((a, b) => a[sortBy.value].localeCompare(b[sortBy.value]))
        .filter(
          (el) =>
            searchText(el.first_name, search.value) ||
            searchText(el.last_name, search.value)
        );
    case 'id':
      return [...postData.value]
        .sort((a, b) => a[sortBy.value] - b[sortBy.value])
        .filter(
          (el) =>
            searchText(el.first_name, search.value) ||
            searchText(el.last_name, search.value)
        );
    default:
      return [...postData.value].filter(
        (el) =>
          searchText(el.first_name, search.value) ||
          searchText(el.last_name, search.value)
      );
  }
};
