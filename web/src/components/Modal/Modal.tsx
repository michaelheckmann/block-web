import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

const Modal = ({ children, isOpen, setIsOpen }) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="z-60 relative"
          onClose={() => setIsOpen(false)}
          unmount={false}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-75"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 z-30 bg-white bg-opacity-70" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 overflow-y-auto">
            <div className="flex h-full items-center justify-center px-4 py-10 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-75"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="stransition-all h-full w-full transform overflow-y-auto rounded-sm border-1 border-gray-300 bg-white p-4 text-left align-middle shadow-lg shadow-blue-900/10">
                  {React.cloneElement(children, {
                    close: () => setIsOpen(false),
                  })}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Modal
