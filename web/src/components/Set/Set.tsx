import { PencilIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useFormContext, useWatch } from '@redwoodjs/forms'
import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import { PopoverMenu } from 'src/components/PopoverMenu'
import { debounce } from 'src/utils/functions/debounce'
import { useSetMutation } from 'src/utils/hooks/useSetMutation'
import { SetType, WorkoutFormType } from 'src/utils/types/WorkoutFormType'

/* Types */
export type SetProps = SetType & {
  setIndex: number
  setGroupIndex: number
  previous: {
    weight: number
    reps: number
  }
  deleting?: boolean
  handleDelete?: () => void
}

/* Component */
const Set = ({
  setIndex,
  setGroupIndex,
  previous,
  deleting,
  handleDelete,
}: SetProps) => {
  /* Hooks */
  const { register, getValues, formState } = useFormContext<WorkoutFormType>()
  const [isMounted, setIsMounted] = useState(false)

  const path = `setGroups.${setGroupIndex}.sets.${setIndex}`
  const weight = useWatch({ name: `${path}.weight` })
  const reps = useWatch({ name: `${path}.reps` })
  const done = useWatch({ name: `${path}.done` })

  const setMutation = useSetMutation()

  /* Effects */
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    // Prevent the mutation from firing on initial render
    if (!isMounted || !formState.isDirty) return
    // console.log(getValues().setGroups[props.setGroupIndex])
    const setValues = getValues().setGroups[setGroupIndex].sets[setIndex]
    // console.log(props.setIndex, setValues)
    saveData(setValues)
  }, [weight, reps, done])

  /* Functions */
  const saveData = useCallback(
    debounce((setValues) => {
      setMutation.updateSet.mutation({
        variables: {
          id: setValues.setId,
          input: {
            weight: setValues.weight,
            reps: setValues.reps,
            done: setValues.done,
          },
        },
      })
    }),
    []
  )

  /* Render */
  return (
    <div
      data-testid="set-container-div"
      className={clsx(
        'ease flex w-full justify-between  gap-3 border-1 p-2 text-center transition-all duration-200',
        {
          'border-green-300 bg-green-100': done && !deleting,
          'border-gray-500 bg-white': !done && !deleting,
          'rounded-sm text-gray-900': !deleting,
          'rounded-l-sm border-red-500 bg-white text-red-500': deleting,
        }
      )}
    >
      {/* Set number with Popover */}
      <PopoverMenu
        actions={[
          {
            label: 'Mark as dropset',
            onClick: () => {},
            icon: <PencilIcon />,
            disabled: true,
          },
          {
            label: 'Mark as superset',
            onClick: () => {},
            icon: <PencilIcon />,
            disabled: true,
          },
          {
            label: 'Remove Set',
            onClick: handleDelete,
            icon: <XMarkIcon />,
          },
        ]}
      >
        <div
          className={clsx(
            'popover-wrapper flex h-6 w-7 cursor-pointer items-center justify-center rounded-sm transition',
            {
              'bg-transparent text-red-500': deleting,
              'bg-gray-200 text-gray-900 hover:bg-gray-300': !deleting && !done,
              'bg-transparent': done,
            }
          )}
        >
          {setIndex + 1}
        </div>
      </PopoverMenu>

      {/* Previous values, not interactive */}
      <div
        className={clsx('flex flex-grow items-center justify-center', {
          'opacity-50': weight || reps,
        })}
      >
        {previous.weight && `${previous.weight} kg x ${previous.reps}`}
        {!previous.weight && (
          <div className="flex h-full w-full items-center justify-center">
            <div
              className={clsx(
                'h-1 w-7 rounded-full bg-gray-900 opacity-50 transition duration-200',
                {
                  'bg-red-900': deleting,
                  'bg-green-900': !deleting && done,
                }
              )}
            ></div>
          </div>
        )}
      </div>

      {/* Weight, interactive */}
      <input
        {...register(`setGroups.${setGroupIndex}.sets.${setIndex}.weight`, {
          min: 0,
          max: 999,
          valueAsNumber: true,
        })}
        aria-label="weight"
        type="number"
        defaultValue={weight || ''}
        placeholder={previous.weight?.toString()}
        className={clsx(
          'h-6 w-12 rounded-sm border-0 text-center outline-none transition-all duration-200',
          {
            'bg-transparent': done || deleting,
            'bg-gray-200 hover:bg-gray-300 focus:bg-gray-200 active:bg-gray-200':
              !done && !deleting,
            'ring-gray-700  placeholder:text-gray-400 focus:ring-2 active:ring-2':
              !deleting,
            'placeholder:text-red-300': deleting,
          }
        )}
      />

      {/* Reps, interactive */}
      <input
        {...register(`setGroups.${setGroupIndex}.sets.${setIndex}.reps`, {
          min: 0,
          max: 999,
          valueAsNumber: true,
        })}
        aria-label="reps"
        type="number"
        defaultValue={reps || ''}
        placeholder={previous.reps?.toString()}
        className={clsx(
          'h-6 w-12 rounded-sm border-0 text-center outline-none transition-all duration-200',
          {
            'bg-transparent': done || deleting,
            'bg-gray-200 hover:bg-gray-300 focus:bg-gray-200 active:bg-gray-200':
              !done && !deleting,
            'ring-gray-700  placeholder:text-gray-400 focus:ring-2 active:ring-2':
              !deleting,
            'placeholder:text-red-300': deleting,
          }
        )}
      />

      {/* Done, interactive */}
      <label
        htmlFor={`setGroups.${setGroupIndex}.sets.${setIndex}.done`}
        className={clsx(
          'flex h-6 w-7 cursor-pointer items-center justify-center rounded-sm transition',
          {
            'bg-green-400 text-white': done && !deleting,
            'bg-gray-200 text-gray-900 hover:bg-gray-300': !done && !deleting,
            'bg-transparent text-red-500': deleting,
          }
        )}
      >
        ✓
      </label>
      <input
        {...register(`setGroups.${setGroupIndex}.sets.${setIndex}.done`, {
          required: true,
        })}
        aria-label="done"
        type="checkbox"
        defaultChecked={done}
        id={`setGroups.${setGroupIndex}.sets.${setIndex}.done`}
        hidden
      />
    </div>
  )
}
export default Set
