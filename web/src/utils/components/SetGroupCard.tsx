import { PencilIcon, ArrowPathIcon, XMarkIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import React, { useState } from 'react'
import ExerciseCell from 'src/components/ExerciseCell'
import Modal from 'src/components/Modal/Modal'
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
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="flex flex-col font-medium transition-all">
      {/* Exercise Menu Bar */}
      <div
        {...dragHandleProps}
        className={clsx(
          'flex h-10 items-center justify-between gap-3 font-medium transition-all',
          {
            'mb-0': isReordering,
            'mb-2': !isReordering,
          }
        )}
      >
        {/* Exercise Order Number */}
        <div className="flex h-full">
          <div className="flex items-center justify-center h-full transition bg-gray-200 rounded-sm outline-none w-7 hover:bg-gray-300">
            {setGroupIndex + 1}
          </div>
        </div>

        {/* Exercise Name */}
        <div className="flex items-center justify-center w-full h-full overflow-hidden rounded-sm bg-primary-200 text-primary-800">
          <button
            onClick={() => setIsModalOpen(true)}
            type="button"
            className="h-full px-2 py-1 leading-4 tracking-wide text-center rounded-sm"
          >
            {item.exercise.name}
          </button>
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
            <div className=" flex h-full w-7 cursor-pointer flex-col items-center justify-center gap-[2px] rounded-sm bg-gray-200 outline-none transition hover:bg-gray-300">
              <div className="flex h-[2.5px] w-[2.5px] items-center justify-center rounded-full bg-gray-900"></div>
              <div className="flex h-[2.5px] w-[2.5px] items-center justify-center rounded-full bg-gray-900"></div>
              <div className="flex h-[2.5px] w-[2.5px] items-center justify-center rounded-full bg-gray-900"></div>
            </div>
          </PopoverMenu>
        </div>
      </div>

      {/* SetGroup */}
      <div className={clsx({ hidden: isReordering })}>
        <SetGroup {...item} setGroupIndex={setGroupIndex} />
      </div>

      {/* Modal for the exercise details */}
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <ExerciseCell id={item.exercise.exerciseId} />
      </Modal>
    </div>
  )
}

export default SetGroupCard
