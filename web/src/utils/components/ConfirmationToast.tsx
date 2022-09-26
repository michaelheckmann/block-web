import { Transition } from '@headlessui/react'
import { toast, Toast } from '@redwoodjs/web/toast'
import { Fragment, useState } from 'react'
import ReactDOM from 'react-dom'

type ConfirmationToastProps = {
  t: Toast
  actionEvent: () => void
  dismissEvent?: () => void
  text: string
  actionEventLabel?: string
  dismissEventLabel?: string
}

export function ConfirmationToast({
  t,
  actionEvent,
  dismissEvent = () => toast.dismiss(t.id),
  text,
  actionEventLabel = 'Confirm',
  dismissEventLabel = 'Cancel',
}: ConfirmationToastProps) {
  const [isOpen, setIsOpen] = useState(true)

  const handleDismiss = () => {
    setIsOpen(false)
    dismissEvent()
  }
  const handleAction = () => {
    setIsOpen(false)
    actionEvent()
  }

  return (
    <>
      <div className="flex flex-col gap-3 text-gray-900 rounded-sm">
        <p>{text}</p>
        <div className="flex justify-between w-full gap-3">
          <button
            className="w-full px-2 py-1 text-sm transition duration-200 border-gray-500 rounded-sm border-1 hover:border-gray-900"
            onClick={handleDismiss}
          >
            {dismissEventLabel}
          </button>
          <button
            className="w-full px-2 py-1 text-sm transition duration-200 bg-gray-200 rounded-sm hover:bg-gray-300"
            onClick={handleAction}
          >
            {actionEventLabel}
          </button>
        </div>
      </div>
      <ToastOverlay onClick={handleDismiss} isOpen={isOpen} />
    </>
  )
}

function ToastOverlay({ isOpen, onClick }) {
  // useEffect(() => {
  //   console.log('MOUNT OVERLAY')
  //   return () => {
  //     console.log('UNMOUNT OVERLAY')
  //   }
  // }, [])
  return ReactDOM.createPortal(
    <Transition
      appear
      show={isOpen}
      as={Fragment}
      enter="ease-out duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-75"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className="fixed inset-0 z-30 bg-white bg-opacity-70"
        onClick={onClick}
      />
    </Transition>,
    document.getElementById('toast-overlay')
  )
}
