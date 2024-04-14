import { useEffect, useState } from 'react';

export function useSessionState(key: string, initialValue = 21) {
  const [state, setState] = useState(() => {
    const storedData = sessionStorage.getItem(key);

    if (storedData) {
      return JSON.parse(storedData);
    }

    return initialValue;
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
