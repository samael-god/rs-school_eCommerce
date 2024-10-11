import { MutableRefObject, useCallback, useRef } from 'react';

export const useDebounce = (
  callback: (...args: unknown[]) => void,
  delay: number,
) => {
  const timer = useRef() as MutableRefObject<unknown>;

  return useCallback(
    (...args: unknown[]) => {
      if (timer.current) {
        clearTimeout(timer.current as string);
      }
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );
};
