import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

function Modal({ children, isOpen, setIsOpen }) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-60"
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
            <div className="fixed inset-0 z-30 bg-white bg-opacity-60" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 overflow-y-auto">
            <div className="flex items-center justify-center h-full px-4 py-10 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-75"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full h-full p-4 overflow-y-auto text-left align-middle transform bg-white border-gray-300 rounded-sm shadow-lg stransition-all border-1 shadow-blue-900/10">
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
