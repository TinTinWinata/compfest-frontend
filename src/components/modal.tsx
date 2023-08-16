/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react';
import { ChangeEvent, Dispatch, Fragment, SetStateAction } from 'react';
import { IChildrenProps } from '../interfaces/children-interface';

export interface IModalProps extends IChildrenProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
  caption?: string;
  button?: string;
  onClick?: () => void;
  onSubmit?: (e: ChangeEvent<HTMLFormElement>) => void;
}

export default function Modal({
  open,
  setOpen,
  title,
  caption,
  children,
  button,
  onClick,
  onSubmit,
}: IModalProps) {
  const handleOnSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit && onSubmit(e);
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open={open}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <form
              onSubmit={handleOnSubmit}
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full 
            sm:py-8 sm:px-12"
            >
              <div>
                <div className="mt-3 mb-6 text-center sm:mt-5">
                  <Dialog.Title className="text-3xl leading-6 font-medium text-gray-600">
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-md text-gray-400">{caption}</p>
                  </div>
                </div>
                {children}
              </div>
              {button && (
                <div className="mt-5 sm:mt-5">
                  <button
                    onClick={onClick}
                    type="submit"
                    className="inline-flex justify-center w-full rounded-full transition-all  border border-transparent shadow-sm px-4 py-3  bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-md"
                  >
                    {button}
                  </button>
                </div>
              )}
            </form>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
