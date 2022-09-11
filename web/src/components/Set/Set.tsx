import { useFormContext, useWatch } from '@redwoodjs/forms'
import clsx from 'clsx'
import { useCallback, useEffect } from 'react'
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
}

const Set = (props: SetProps) => {
  const { register, getValues, formState } = useFormContext<WorkoutFormType>()

  const path = `setGroups.${props.setGroupIndex}.sets.${props.setIndex}`
  const weight = useWatch({ name: `${path}.weight` })
  const reps = useWatch({ name: `${path}.reps` })
  const done = useWatch({ name: `${path}.done` })

  const setMutation = useSetMutation()
  useEffect(() => {
    // Prevent the mutation from firing on initial render
    if (!formState.isDirty) return
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
        'flex w-full justify-between gap-3 rounded p-2 text-center text-gray-900',
        {
          'bg-green-200': done,
          'bg-transparent': !done,
        }
      )}
    >
      {/* Set number, not interactive */}
      <div className="w-5">{props.setIndex + 1}</div>

      {/* Previous values, not interactive */}
      <div
        className={clsx('flex flex-grow items-center justify-center', {
          'text-gray-400': weight || reps,
        })}
      >
        {props.previous.weight &&
          `${props.previous.weight} kg x ${props.previous.reps}`}
        {!props.previous.weight && (
          <div className="flex items-center justify-center w-full h-full">
            <div className="h-1 bg-gray-200 rounded-full w-7"></div>
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
          'h-6 w-12 rounded border-0 text-center outline-none ring-gray-700 transition-all placeholder:text-gray-400 focus:ring-2 active:ring-2',
          { 'bg-transparent': done },
          {
            'bg-gray-200 hover:bg-gray-300 focus:bg-gray-200 active:bg-gray-200':
              !done,
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
          'h-6 w-12 rounded text-center outline-none ring-gray-700 transition-all placeholder:text-gray-400 focus:ring-2 active:ring-2',
          { 'bg-transparent': done },
          {
            'bg-gray-200 hover:bg-gray-300 focus:bg-gray-200 active:bg-gray-200':
              !done,
          }
        )}
      />

      {/* Done, interactive */}
      <label
        htmlFor={`setGroups.${props.setGroupIndex}.sets.${props.setIndex}.done`}
        className={clsx(
          'flex h-6 w-7 cursor-pointer items-center justify-center rounded transition',
          { 'bg-green-400 text-white': done },
          {
            'bg-gray-200 text-gray-900 hover:bg-gray-300': !done,
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
