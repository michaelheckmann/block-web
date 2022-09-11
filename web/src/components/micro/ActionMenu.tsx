import clsx from 'clsx'
import React, { useState } from 'react'
import ClickAwayListener from 'react-click-away-listener'

const genericFunction = (arg) => {
  console.log(arg)
}

/* It's a React component that renders a menu with a list of actions. */
function ActionMenu() {
  const [popup, setPopup] = useState(false)
  const actions = [
    {
      emoji: '🌜',
      label: 'Add note',
      action: () => genericFunction('Add note'),
    },
    {
      emoji: '⚗',
      label: 'Replace exercise',
      action: () => genericFunction('Replace exercise'),
    },
    {
      emoji: '🗡',
      label: 'Delete exercise',
      action: () => genericFunction('Delete exercise'),
    },
  ]
  return (
    <div className="relative h-full">
      <div
        className="flex h-full cursor-pointer flex-col items-center justify-center gap-[2px] rounded bg-primary-100 px-3 transition hover:bg-primary-200"
        onClick={() => setPopup(true)}
      >
        <div className="flex h-[2.5px] w-[2.5px] items-center justify-center rounded-full bg-primary"></div>
        <div className="flex h-[2.5px] w-[2.5px] items-center justify-center rounded-full bg-primary"></div>
        <div className="flex h-[2.5px] w-[2.5px] items-center justify-center rounded-full bg-primary"></div>
      </div>
      {popup && (
        <ClickAwayListener onClickAway={() => setPopup(false)}>
          <ul className="absolute top-0 right-0 z-20 flex min-w-[200px] list-none flex-col divide-y-2 divide-gray-200 rounded bg-white text-left text-gray-900 shadow-lg ring-1 ring-gray-200">
            {actions.map(({ emoji, label, action }) => (
              <li
                key={label}
                className="transition-color flex cursor-pointer items-center justify-start gap-1 px-3 py-3 hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100"
                onClick={action}
              >
                <div className="flex w-5 items-center justify-center">
                  {emoji}
                </div>
                <div className="">{label}</div>
              </li>
            ))}
          </ul>
        </ClickAwayListener>
      )}
      <div
        className={clsx(
          'pointer-events-none fixed top-0 left-0 z-10 h-screen w-screen bg-gray-900 transition-all duration-300',
          { 'opacity-0': !popup, 'opacity-20': popup }
        )}
      ></div>
    </div>
  )
}

export default ActionMenu
