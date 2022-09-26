import { FormProvider, useFieldArray, useForm } from '@redwoodjs/forms'
import { RedwoodApolloProvider } from '@redwoodjs/web/dist/apollo'
import SetGroupCard from 'src/components/SetGroupCard'
import { generateWorkoutObject, sortWorkout } from 'src/components/WorkoutCell'
import { standard } from 'src/components/WorkoutCell/WorkoutCell.mock'
import { DoneSetProps, FilledSetProps } from 'src/utils/context/SetContext'
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

// Different configuration options for the different test cases

const DefaultProps = {
  setGroupId: 0,
  setGroupIndex: 0,
}

export const EmptySetGroupProps: SetGroupProps = {
  ...DefaultProps,
  order: 0,
  exercise: { exerciseId: 0, name: 'New Exercise', latestSetGroup: null },
  sets: [],
}

export const OneSetGroupProps: SetGroupProps = {
  ...EmptySetGroupProps,
  sets: [FilledSetProps],
}

export const ThreeSetGroupProps: SetGroupProps = {
  ...EmptySetGroupProps,
  sets: [FilledSetProps, FilledSetProps, FilledSetProps],
}

export const RealisticSetGroupProps: SetGroupProps = {
  ...DefaultProps,
  order: 0,
  exercise: {
    exerciseId: 0,
    name: 'Single Leg Hip Thrust',
    // This should match the sets config from below
    latestSetGroup: {
      sets: [
        {
          weight: 10,
          reps: 8,
        },
        {
          weight: 10,
          reps: 8,
        },
        {
          weight: 10,
          reps: 8,
        },
        {
          weight: 10,
          reps: 8,
        },
      ],
    },
  },
  sets: [DoneSetProps, DoneSetProps, FilledSetProps, FilledSetProps],
}

export const LongNameSetGroupProps: SetGroupProps = {
  ...DefaultProps,
  order: 0,
  exercise: {
    exerciseId: 0,
    name: 'Single Leg Hip Thrust (Smith Machine) [to failure]',
    latestSetGroup: null,
  },
  sets: [DoneSetProps, DoneSetProps, FilledSetProps, FilledSetProps],
}
