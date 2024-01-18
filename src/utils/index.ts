import { ICreatePost } from '@/types';

export const clearFormData = (form: ICreatePost) => {
  for (const formKey in form) {
    form[formKey] = '';
  }
};
