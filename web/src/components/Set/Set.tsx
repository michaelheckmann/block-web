import { useFormContext, useWatch } from '@redwoodjs/forms'
import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import { debounce } from 'src/utils/functions/debounce'
import { SetType, WorkoutFormType } from 'src/utils/types/WorkoutFormType'
import { useSetMutation } from '../../utils/hooks/useSetMutation'

export type SetProps = SetType & {
  setIndex: number
  setGroupIndex: number
  previous: {
    weight: number
    reps: number
  }
  deleting?: boolean
}

const Set = (props: SetProps) => {
  const { register, getValues, formState } = useFormContext<WorkoutFormType>()
  const [isMounted, setIsMounted] = useState(false)

  const path = `setGroups.${props.setGroupIndex}.sets.${props.setIndex}`
  const weight = useWatch({ name: `${path}.weight` })
  const reps = useWatch({ name: `${path}.reps` })
  const done = useWatch({ name: `${path}.done` })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const setMutation = useSetMutation()
  useEffect(() => {
    // Prevent the mutation from firing on initial render
    if (!isMounted || !formState.isDirty) return
    // console.log(getValues().setGroups[props.setGroupIndex])
    const setValues =
      getValues().setGroups[props.setGroupIndex].sets[props.setIndex]
    // console.log(props.setIndex, setValues)
    saveData(setValues)
  }, [weight, reps, done])

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

  return (
    <div
      data-testid="set-container-div"
      className={clsx(
        'ease flex w-full justify-between  gap-3 border-1 p-2 text-center transition-all duration-200',
        {
          'border-green-300 bg-green-100': done && !props.deleting,
          'border-gray-500 bg-white': !done && !props.deleting,
          'rounded-sm text-gray-900': !props.deleting,
          'rounded-l-sm border-red-500 bg-white text-red-500': props.deleting,
        }
      )}
    >
      {/* Set number, not interactive */}
      <div className="w-5">{props.setIndex + 1}</div>

      {/* Previous values, not interactive */}
      <div
        className={clsx('flex flex-grow items-center justify-center', {
          'opacity-50': weight || reps,
        })}
      >
        {props.previous.weight &&
          `${props.previous.weight} kg x ${props.previous.reps}`}
        {!props.previous.weight && (
          <div className="flex items-center justify-center w-full h-full">
            <div
              className={clsx(
                'h-1 w-7 rounded-full bg-gray-900 opacity-50 transition duration-200',
                {
                  'bg-red-900': props.deleting,
                  'bg-green-900': !props.deleting && done,
                }
              )}
            ></div>
          </div>
        )}
      </div>

      {/* Weight, interactive */}
      <input
        {...register(
          `setGroups.${props.setGroupIndex}.sets.${props.setIndex}.weight`,
          {
            min: 0,
            max: 999,
            valueAsNumber: true,
          }
        )}
        aria-label="weight"
        type="number"
        defaultValue={weight || ''}
        placeholder={props.previous.weight?.toString()}
        className={clsx(
          'h-6 w-12 rounded-sm border-0 text-center outline-none transition-all duration-200',
          {
            'bg-transparent': done || props.deleting,
            'bg-gray-200 hover:bg-gray-300 focus:bg-gray-200 active:bg-gray-200':
              !done && !props.deleting,
            'ring-gray-700  placeholder:text-gray-400 focus:ring-2 active:ring-2':
              !props.deleting,
            'placeholder:text-red-300': props.deleting,
          }
        )}
      />

      {/* Reps, interactive */}
      <input
        {...register(
          `setGroups.${props.setGroupIndex}.sets.${props.setIndex}.reps`,
          {
            min: 0,
            max: 999,
            valueAsNumber: true,
          }
        )}
        aria-label="reps"
        type="number"
        defaultValue={reps || ''}
        placeholder={props.previous.reps?.toString()}
        className={clsx(
          'h-6 w-12 rounded-sm border-0 text-center outline-none transition-all duration-200',
          {
            'bg-transparent': done || props.deleting,
            'bg-gray-200 hover:bg-gray-300 focus:bg-gray-200 active:bg-gray-200':
              !done && !props.deleting,
            'ring-gray-700  placeholder:text-gray-400 focus:ring-2 active:ring-2':
              !props.deleting,
            'placeholder:text-red-300': props.deleting,
          }
        )}
      />

      {/* Done, interactive */}
      <label
        htmlFor={`setGroups.${props.setGroupIndex}.sets.${props.setIndex}.done`}
        className={clsx(
          'flex h-6 w-7 cursor-pointer items-center justify-center rounded-sm transition',
          {
            'bg-green-400 text-white': done && !props.deleting,
            'bg-gray-200 text-gray-900 hover:bg-gray-300':
              !done && !props.deleting,
            'bg-transparent text-red-500': props.deleting,
          }
        )}
      >
        ✓
      </label>
      <input
        {...register(
          `setGroups.${props.setGroupIndex}.sets.${props.setIndex}.done`
        )}
        aria-label="done"
        type="checkbox"
        defaultChecked={done}
        id={`setGroups.${props.setGroupIndex}.sets.${props.setIndex}.done`}
        hidden
      />
    </div>
  )
}

export default Set
