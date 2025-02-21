import { useEffect } from 'react';

const useClickOutside = (ref, callback, id) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      const element = ref?.current || (id ? document.getElementById(id) : null);

      if (element && !element.contains(event.target)) {
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
