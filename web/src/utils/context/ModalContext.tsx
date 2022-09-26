import { Dialog } from '@headlessui/react'
import { useState } from 'react'
import ExerciseCell from 'src/components/ExerciseCell'
import ExercisesCell from 'src/components/ExercisesCell'
import Modal from 'src/components/Modal/Modal'

type Props = {
  content: any
  initOpen?: boolean
  textContent?: string
}

function ModalContext({ content, initOpen = true }: Props) {
  const [isOpen, setIsOpen] = useState(initOpen)
  return (
    <div>
      <div>
        {
          <button type="button" onClick={() => setIsOpen(true)}>
            Open Modal
          </button>
        }
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        {content({ close: () => setIsOpen(false) })}
      </Modal>
    </div>
  )
}

export default ModalContext

export const SimpleModalProps: Props = {
  content: () => <div>I'm a Modal.</div>,
}

export const ComplexModalProps: Props = {
  content: ({ close }) => (
    <>
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900"
      >
        Payment successful
      </Dialog.Title>
      <Dialog.Description
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900"
      >
        Description: Payment managed successfully
      </Dialog.Description>
      <div className="mt-2">
        <p className="text-sm text-gray-500">
          Your payment has been successfully submitted. We’ve sent you an email
          with all of the details of your order.
        </p>
      </div>

      <div className="mt-4">
        <button
          type="button"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={close}
        >
          Got it, thanks!
        </button>
      </div>
    </>
  ),
}

export const InitHiddenModalProps: Props = {
  content: () => <div>I'm a Modal.</div>,
  initOpen: false,
  textContent: "I'm a Modal.",
}

export const ExerciseModalProps: Props = {
  content: () => (
    <>
      <ExerciseCell id={42} />
    </>
  ),
}

export const ExerciseSelectorModalProps: Props = {
  content: () => (
    <>
      <ExercisesCell />
    </>
  ),
}
