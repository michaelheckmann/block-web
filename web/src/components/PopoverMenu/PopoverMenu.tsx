import { Popover, Transition } from '@headlessui/react'
import { Fragment, useEffect } from 'react'
import {
  useFloating,
  offset,
  flip,
  autoUpdate,
  shift,
} from '@floating-ui/react-dom'

export type ActionType = {
  label: string
  icon?: React.ReactNode
  disabled?: boolean
  onClick: () => void
}

interface Props {
  children: React.ReactNode //Cannot be a button as the Popover surrounds it with a button automatically!
  actions: ActionType[]
}

const PopoverMenu = ({ children, actions }: Props) => {
  const { x, y, reference, floating, strategy, update, refs } = useFloating({
    placement: 'bottom-end',
    strategy: 'fixed',
    middleware: [offset(8), flip(), shift()],
  })

  useEffect(() => {
    if (!refs.reference.current || !refs.floating.current) {
      return
    }

    return autoUpdate(refs.reference.current, refs.floating.current, update)
  }, [refs.reference, refs.floating, update])

  return (
    <Popover>
      <Popover.Button ref={reference} className="h-full" type="button">
        {children}
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition duration-200 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-10"
        leave="duration-75 ease-out"
        leaveFrom="opacity-10"
        leaveTo="opacity-0"
      >
        <Popover.Overlay className="fixed inset-0 z-30 bg-blue-900 opacity-10" />
      </Transition>
      <div
        ref={floating}
        style={{
          position: strategy,
          top: y ?? 0,
          left: x ?? 0,
        }}
        className="z-40"
      >
        {/* Delay is needed as animation can be jumpy if button is in bottom
        right corner */}
        <Transition
          enter="transition duration-200 ease-out delay-[20ms]"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Panel className="border-1 divide-y-2 divide-solid divide-gray-100 rounded border-gray-300 bg-white px-1 py-1 shadow">
            {actions.map((action, index) => (
              <div className="py-1" key={index}>
                <Popover.Button
                  className="group flex w-full items-center rounded-md px-3 py-2 text-left text-sm font-medium text-gray-900 outline-none transition duration-150 hover:bg-primary-400 hover:text-white focus:bg-primary-400 focus:text-white active:bg-primary-400 active:text-white disabled:bg-transparent disabled:text-gray-500"
                  onClick={action.onClick}
                  disabled={action.disabled}
                  type="button"
                >
                  {action.icon && (
                    <span className="mr-1 h-4 w-4 text-primary-400 transition duration-150 group-hover:text-white group-focus:text-white group-active:text-white group-disabled:text-gray-500">
                      {action.icon}
                    </span>
                  )}
                  <div className="block">{action.label}</div>
                </Popover.Button>
              </div>
            ))}
          </Popover.Panel>
        </Transition>
      </div>
    </Popover>
  )
}

export default PopoverMenu
