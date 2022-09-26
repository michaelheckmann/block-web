import { FormProvider, useFieldArray, useForm } from '@redwoodjs/forms'
import { RedwoodApolloProvider } from '@redwoodjs/web/dist/apollo'
import SetGroupCard from 'src/components/SetGroupCard'
import { generateWorkoutObject, sortWorkout } from 'src/components/WorkoutCell'
import { standard } from 'src/components/WorkoutCell/WorkoutCell.mock'
import { SetGroupProps } from 'src/utils/types/WorkoutFormType'

function SetGroupCardContext(args: SetGroupProps) {
  const workout = sortWorkout(generateWorkoutObject(standard().workout))
  workout.setGroups[args.setGroupIndex] = args

  const methods = useForm({
    defaultValues: {
      setGroups: workout.setGroups,
    },
  })
  const { control } = methods
  const { fields } = useFieldArray({
    control,
    name: 'setGroups',
  })
  return (
    <RedwoodApolloProvider>
      <FormProvider {...methods}>
        <form onSubmit={() => false}>
          {fields.map((item, setGroupIndex) => (
            <SetGroupCard
              handleDelete={() => {}}
              key={item.id}
              {...item}
              setGroupIndex={setGroupIndex}
              dragHandleProps={{}}
              isReordering={false}
            />
          ))}
        </form>
      </FormProvider>
    </RedwoodApolloProvider>
  )
}

export default SetGroupCardContext
