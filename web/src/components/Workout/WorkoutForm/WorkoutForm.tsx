import { FormProvider, useFieldArray, useForm } from '@redwoodjs/forms'
import { useCallback, useEffect } from 'react'
import SetGroup, { SetGroupComponentType } from 'src/components/SetGroup'
import { debounce } from 'src/utils/debounce'
import { EditWorkoutById } from 'types/graphql'

export type FormType = {
  setGroups: SetGroupComponentType[]
}

const defaultSetGroup = {
  exercise: {
    name: 'new',
  },
  sets: [
    {
      previous: { weight: undefined, reps: undefined },
      weight: undefined,
      reps: undefined,
      done: false,
    },
  ],
}

type Props = {
  workout: EditWorkoutById['workout']
  onSave: (input: FormType) => void
}

const WorkoutForm = ({ workout, onSave }: Props) => {
  const methods = useForm<FormType>({
    defaultValues: {
      setGroups: workout.setGroups.map((setGroup) => ({
        exercise: {
          name: setGroup.exercise.name,
        },
        sets: setGroup.sets.map((set) => ({
          weight: set.weight,
          reps: set.reps,
          done: set.done,
          previous: { weight: undefined, reps: undefined },
        })),
      })),
    },
  })

  const { control, handleSubmit, watch } = methods
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'setGroups',
  })

  const formData = watch()

  useEffect(() => {
    logData(formData)
  }, [formData])

  const logData = useCallback(
    debounce((d) => onSave(d)),
    []
  )

  const onSubmit = handleSubmit((values) => {
    console.log(values)
  })

  return (
    <div className="">
      <h1>{workout.name}!</h1>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <section className="flex flex-col gap-3">
            {fields.map((item, setGroupIndex) => (
              <div key={item.id} className="flex flex-col">
                <SetGroup {...item} setGroupIndex={setGroupIndex} />
                <button
                  className="rounded bg-red-300 p-1 font-semibold"
                  onClick={() => remove(setGroupIndex)}
                >
                  Delete
                </button>
              </div>
            ))}

            <button
              className="rounded bg-green-300 p-2 font-semibold"
              onClick={() => append(defaultSetGroup)}
            >
              Add
            </button>
          </section>
        </form>
      </FormProvider>
    </div>
  )
}

export default WorkoutForm
