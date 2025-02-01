import { useEffect, MutableRefObject } from 'react';

const useClickOutside = (ref: MutableRefObject<HTMLElement | null> | null, callback: () => void, id?: string) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const element = ref?.current || (id ? document.getElementById(id) : null);

      if (element && !element.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback, id]);
};

export default useClickOutside;