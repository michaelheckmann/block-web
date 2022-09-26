import {
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
} from '@floating-ui/react-dom'
import { Popover, Transition } from '@headlessui/react'
import { Fragment, useEffect } from 'react'
import Portal from 'src/utils/components/Portal'

/* Types */
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

export function PopoverMenu({ children, actions }: Props) {
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

      <Portal id="popover-menu">
        <PopoverContent
          actions={actions}
          x={x}
          y={y}
          floating={floating}
          strategy={strategy}
        />
      </Portal>
    </Popover>
  )
}

function PopoverContent(props) {
  return (
    <div className="">
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-75 ease-in"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Popover.Overlay className="fixed inset-0 z-30 bg-white bg-opacity-70" />
      </Transition>
      <div
        ref={props.floating}
        style={{
          position: props.strategy,
          top: props.y ?? 0,
          left: props.x ?? 0,
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
          <Popover.Panel className="text-gray-900 bg-white border-gray-300 divide-gray-300 rounded-sm shadow-lg divide-y-1 border-1 shadow-blue-900/10">
            {props.actions.map((action, index) => (
              <div className="min-w-[60vw]" key={index}>
                <Popover.Button
                  className="flex items-center justify-start w-full px-4 py-3 text-sm font-medium text-left transition duration-150 outline-none group hover:bg-gray-200 disabled:bg-white disabled:text-gray-500"
                  onClick={action.onClick}
                  disabled={action.disabled}
                  type="button"
                >
                  {action.icon && (
                    <span className="w-4 h-4 mr-1 transition duration-150 group-disabled:text-gray-500">
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
    </div>
  )
}
