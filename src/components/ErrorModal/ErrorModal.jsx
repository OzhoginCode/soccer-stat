import { useNavigate } from 'react-router-dom';
import {
  Button, Dialog, DialogPanel, DialogTitle,
} from '@headlessui/react';

import useErrorModalTimer from '../../hooks/useErrorModalTimer.jsx';

import './ErrorModal.css';

const getErrorText = (errorType, reloadTime) => {
  switch (errorType) {
    case 403:
      return {
        header: 'Ошибка доступа',
        body: `Так как мы используем открытый API, к сожалению,
          иногда сервер не предоставляет доступ к нужным данным.
          Попробуйте зайти на другую страничку`,
        button: 'Вернуться на главную',
      };
    case 404:
      return {
        header: 'Ошибка загрузки',
        body: `Запрошенная вами страничка не найдена.
          Возможно, сервер в данный момент недоступен`,
        button: 'Перейти на главную',
      };
    case 429:
      return {
        header: 'Слишком много запросов',
        body: `Так как мы используем открытый API, к сожалению,
          количество запросов в минуту ограничено.
          Не уходите, через ${reloadTime} секунд лимит обновится,
          и всё заработает!`,
        button: 'Перезагрузить сейчас',
      };
    default:
      return {
        header: 'Ошибка загрузки',
        body: `Произошла неожиданная ошибка.
          Если ошибка повторится, пожалуйста, сообщите нам`,
        button: 'Перейти на главную',
      };
  }
};

const getButtonHandler = (errorType, handlers) => {
  const { navigateToRoot, reload } = handlers;
  switch (errorType) {
    case 403:
      return navigateToRoot;
    case 404:
      return navigateToRoot;
    case 429:
      return reload;
    default:
      return navigateToRoot;
  }
};

const ErrorModal = ({
  isOpen, setIsOpen, initialReloadTime, reload, errorType,
}) => {
  const reloadTime = useErrorModalTimer(initialReloadTime, isOpen);

  const navigate = useNavigate();
  const navigateToRoot = () => navigate('/');

  const errorText = getErrorText(errorType, reloadTime);

  const handlers = { navigateToRoot, reload };
  const buttonHandler = getButtonHandler(errorType, handlers);

  const close = () => setIsOpen(false);

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
