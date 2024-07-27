import {
  Button, Dialog, DialogPanel, DialogTitle,
} from '@headlessui/react';

import './ErrorModal.css';

const ErrorModal = ({ isOpen, setIsOpen }) => {
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
              Слишком много запросов
            </DialogTitle>
            <p className="error-modal-text">
              Так как мы используем бесплатный API, к сожалению,
              количество запросов в минуту ограничено.
              Не уходите, в течение минуты лимит обновится,
              и всё заработает!
            </p>
            <div className="error-modal-button-container">
              <Button
                className="error-modal-button"
                onClick={close}
              >
                Понял, спасибо!
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ErrorModal;
