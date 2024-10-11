import { LocalStorageKeys } from '@/shared/const/LocalStorage';

export const isLogged = () => {
  return !!localStorage.getItem(LocalStorageKeys.USER);
};
