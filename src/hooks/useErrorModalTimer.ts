import { useState, useEffect } from 'react';

const useErrorModalTimer = (initialTime: number, isOpen: boolean) => {
  const [reloadTime, setReloadTime] = useState(initialTime);

  useEffect(() => {
    if (!isOpen) return;

    setReloadTime(initialTime);

    const interval = setInterval(() => {
      setReloadTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // eslint-disable-line consistent-return
  }, [isOpen, initialTime]);

  return reloadTime;
};

export default useErrorModalTimer;
