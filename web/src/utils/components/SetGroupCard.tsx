import {
  PencilIcon,
  ArrowPathIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import React from 'react'
import PopoverMenu from 'src/components/PopoverMenu/PopoverMenu'
import SetGroup, { SetGroupProps } from 'src/components/SetGroup'

type Props = SetGroupProps & {
  handleDelete: (arg0: number) => void
  dragHandleProps: any
  isReordering: boolean
}

function SetGroupCard({
  dragHandleProps,
  isReordering,
  setGroupIndex,
  handleDelete,
  ...item
}: Props) {
  return (
    <div className="flex flex-col p-2 text-sm font-medium transition-all">
      {/* Exercise Menu Bar */}
      <div
        className={clsx(
          'flex h-8 items-center justify-between gap-3 font-semibold leading-3 text-primary transition-all',
          {
            'mb-0': isReordering,
            'mb-2': !isReordering,
          }
        )}
      >
        <div
          className="flex items-center w-full h-full overflow-hidden"
          {...dragHandleProps}
        >
          {/* TODO: Add the modal */}
          {item.exercise.name} + {item.setGroupId}
        </div>
        {/* Action Menu with additional options for SetGroup */}
        <div className="flex h-full popover-wrapper">
          <PopoverMenu
            actions={[
              {
                label: 'Add a Note',
                onClick: () => {},
                icon: <PencilIcon />,
                disabled: true,
              },
              {
                label: 'Replace Exercise',
                onClick: () => {},
                icon: <ArrowPathIcon />,
                disabled: true,
              },
              {
                label: 'Remove Exercise',
                onClick: () => handleDelete(setGroupIndex),
                icon: <XMarkIcon />,
              },
            ]}
          >
            <div className="flex h-6 w-7 cursor-pointer items-center justify-center gap-[2px] rounded bg-primary-100 transition hover:bg-primary-200">
              <div className="flex h-[2.5px] w-[2.5px] items-center justify-center rounded-full bg-primary"></div>
              <div className="flex h-[2.5px] w-[2.5px] items-center justify-center rounded-full bg-primary"></div>
              <div className="flex h-[2.5px] w-[2.5px] items-center justify-center rounded-full bg-primary"></div>
            </div>
          </PopoverMenu>
        </div>
      </div>
      <div className={clsx({ hidden: isReordering })}>
        <SetGroup {...item} setGroupIndex={setGroupIndex} />
      </div>
    </div>
  )
}

export default SetGroupCard
