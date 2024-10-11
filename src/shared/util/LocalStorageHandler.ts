import { LocalStorageKeys } from '@/shared/const/LocalStorage';

export const setLocalStorageValue = (value: number) => {
  localStorage.setItem(LocalStorageKeys.VERSION, JSON.stringify(value));
};

export const getLocalStorageValue = (key: string) => {
  const item = localStorage.getItem(key);
  if (item) {
    return JSON.parse(item);
  }
  return {};
};
