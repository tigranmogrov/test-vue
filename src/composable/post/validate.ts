import { ICreatePost } from '@/types';
import { reactive } from 'vue';

export interface IErrorValues {
  message: string;
  invalid: boolean;
}
export interface IErrors {
  [key: string]: IErrorValues;
}

// eslint-disable-next-line
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const errorMessages = {
  required: 'This field is Required',
  email: 'Email should be correct',
};

const isRequired = (value: string): IErrorValues | undefined => {
  if (!value) {
    return { message: errorMessages['required'], invalid: true };
  }
};
const isEmailCheck = (value: string): IErrorValues | undefined => {
  if (!value) {
    return { message: errorMessages['required'], invalid: true };
  } else if (!regexEmail.test(value)) {
    return { message: errorMessages['email'], invalid: true };
  }
};
export const validate = (form: ICreatePost): IErrors => {
  const errors = reactive<IErrors>({});
  const nameError = isRequired(form.name);
  const emailError = isEmailCheck(form.email);
  if (nameError) {
    errors['name'] = nameError;
  } else if (emailError) {
    errors['email'] = emailError;
  }
  return errors;
};
