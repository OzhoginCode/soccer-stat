import { useNavigate } from 'react-router-dom';
import {
  Button, Dialog, DialogPanel, DialogTitle,
} from '@headlessui/react';

import useErrorModalTimer from '../../hooks/useErrorModalTimer.jsx';

import './ErrorModal.css';

const getErrorText = (errorType, reloadTime) => {
  switch (errorType) {
    case 429:
      return {
        header: 'Слишком много запросов',
        body: `Так как мы используем открытый API, к сожалению,
          количество запросов в минуту ограничено.
          Не уходите, через ${reloadTime} секунд лимит обновится,
          и всё заработает!`,
        button: 'Перезагрузить сейчас',
      };
    case 403:
      return {
        header: 'Ошибка доступа',
        body: `Так как мы используем открытый API, к сожалению,
          иногда сервер не предоставляет доступ к нужным данным.
          Попробуйте зайти на другую страничку`,
        button: 'Вернуться на главную',
      };
    default:
      return {
        header: 'Ошибка загрузки',
        body: `Произошла ошибка получения данных с сервера.
          Попробуйте перезагрузить страницу.`,
        button: 'Перезагрузить',
      };
  }
};

const ErrorModal = ({
  isOpen, setIsOpen, initialReloadTime, reload, errorType,
}) => {
  const reloadTime = useErrorModalTimer(initialReloadTime, isOpen);

  const close = () => setIsOpen(false);

  const navigate = useNavigate();
  const navigateToRoot = () => navigate('/');

  const errorText = getErrorText(errorType, reloadTime);
  const buttonHandler = errorType === 403 ? navigateToRoot : reload;

  return (
    <Dialog open={isOpen} as="div" className="error-modal" onClose={close}>
      <div className="error-modal-container">
        <div className="error-modal-content">
          <DialogPanel
            transition
            className="error-modal-panel"
          >
            <DialogTitle as="h3" className="error-modal-title">
              {errorText.header}
            </DialogTitle>
            <p className="error-modal-text">
              {errorText.body}
            </p>
            <div className="error-modal-button-container">
              <Button
                className="error-modal-button"
                onClick={buttonHandler}
              >
                {errorText.button}
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ErrorModal;
