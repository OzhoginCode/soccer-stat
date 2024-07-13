import {
  Button, Dialog, DialogPanel, DialogTitle,
} from '@headlessui/react';

const ErrorModal = ({ isOpen, setIsOpen }) => {
  const close = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white dark:bg-slate-800 shadow-2xl p-6 backdrop-blur-2xl duration-200 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle as="h3" className="text-base/7 font-medium text-black dark:text-white">
              Слишком много запросов
            </DialogTitle>
            <p className="mt-2 text-sm/6 text-gray-800 dark:text-gray-300">
              Так как мы используем бесплатный API, к сожалению,
              количество запросов в минуту ограничено.
              Не уходите, в течение минуты лимит обновится,
              и всё заработает!
            </p>
            <div className="mt-4">
              <Button
                className="inline-flex items-center gap-2 rounded-md bg-indigo-600 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
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
