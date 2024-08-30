import { useState, useEffect, useCallback } from 'react';
import { useQueryClient, QueryKey } from '@tanstack/react-query';
import { AxiosError } from 'axios';

type ErrorType = AxiosError | Error | null;

const useErrorHandling = (error: ErrorType, fetchStatus: string, queryKey: QueryKey) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [reloadTime, setReloadTime] = useState(0);
  const [errorType, setErrorType] = useState(0);

  const queryClient = useQueryClient();

  const reload = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey });
    setModalOpen(false);
  }, [queryClient]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // Ниже guard expressions (if-ы) для правильной обработки разных типов ошибок
    if (!error) return;
    if (fetchStatus === 'fetching') return;

    if (!('response' in error)) {
      setErrorType(0);
      setModalOpen(true);
      return;
    }

    if (!error.response) {
      setErrorType(0);
      setModalOpen(true);
      return;
    }

    const { status, data } = error.response;
    setErrorType(status);
    setModalOpen(true);

    if (status === 429) {
      const { message } = data as { message: string };
      const waitTime = parseInt(message.match(/\d+/)![0], 10);
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
