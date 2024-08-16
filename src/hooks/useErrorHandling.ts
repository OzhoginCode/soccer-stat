import { useState, useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const useErrorHandling = (error, fetchStatus, queryKey) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [reloadTime, setReloadTime] = useState(0);
  const [errorType, setErrorType] = useState('');

  const queryClient = useQueryClient();

  const reload = useCallback(() => {
    queryClient.invalidateQueries(queryKey);
    setModalOpen(false);
  }, [queryClient]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!error || fetchStatus === 'fetching') return;
    const { status, data } = error.response;
    setErrorType(status);
    setModalOpen(true);

    if (status === 429) {
      const { message } = data;
      const waitTime = parseInt(message.match(/\d+/)[0], 10);
      setReloadTime(waitTime);

      const timer = setTimeout(reload, waitTime * 1000);
      return () => clearTimeout(timer); // eslint-disable-line consistent-return
    }
  }, [error, fetchStatus, reload]);

  return {
    modalOpen, setModalOpen, reloadTime, reload, errorType,
  };
};

export default useErrorHandling;
