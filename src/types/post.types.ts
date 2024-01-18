export interface IPost {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface ICreatePost {
  name: string;
  email: string;
}

export enum MethodEnum {
  SHOW_INFO = 'show-info',
  DELETE = 'delete',
  UPDATE = 'update',
}

export interface IPostInfoProps {
  id: number;
  method: MethodEnum;
}
