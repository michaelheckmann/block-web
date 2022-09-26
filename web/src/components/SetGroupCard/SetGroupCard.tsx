import { ArrowPathIcon, PencilIcon, XMarkIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { useState } from 'react'
import ExerciseCell from 'src/components/ExerciseCell'
import Modal from 'src/components/Modal/Modal'
import { PopoverMenu } from 'src/components/PopoverMenu/PopoverMenu'
import SetGroup from 'src/components/SetGroup'
import { SetGroupProps } from 'src/utils/types/WorkoutFormType'

/* Types */
type Props = SetGroupProps & {
  handleDelete: (arg0: number) => void
  dragHandleProps: any
  isReordering: boolean
}

/* Component */
const SetGroupCard = ({
  dragHandleProps,
  isReordering,
  setGroupIndex,
  handleDelete,
  ...item
}: Props) => {
  /* Hooks */
  const [isModalOpen, setIsModalOpen] = useState(false)

  const popoverActions = [
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
  ]

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
        <div className="flex h-full popover-wrapper">
          {/* Action Menu with additional options for SetGroup */}
          <PopoverMenu actions={popoverActions}>
            <div className="flex items-center justify-center w-10 h-full text-gray-900 transition bg-gray-200 border-gray-700 rounded-sm outline-none border-1 hover:bg-gray-300">
              {setGroupIndex + 1}
            </div>
          </PopoverMenu>
        </div>

        {/* Exercise Name */}
        <div className="flex items-center justify-between w-full h-full overflow-hidden text-gray-900 transition bg-gray-200 border-gray-700 rounded-sm border-1 hover:bg-gray-300 focus:bg-gray-300 active:bg-gray-300">
          <button
            onClick={() => setIsModalOpen(true)}
            type="button"
            className="mr-2 h-full rounded-sm px-2 py-1 text-left leading-[0.9rem] tracking-wide "
          >
            {item.exercise.name}
          </button>

          {/* Handle to reorder */}
          <div className=" flex h-6 w-9 flex-shrink-0 flex-col items-center justify-center gap-[3px] rounded-r-sm border-l-1 border-gray-700 outline-none transition">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="flex h-[1.5px] w-3 items-center justify-center rounded-full bg-gray-700"
                ></div>
              ))}
          </div>
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
