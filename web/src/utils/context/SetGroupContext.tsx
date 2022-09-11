import { useForm, useFieldArray, FormProvider } from '@redwoodjs/forms'
import { RedwoodApolloProvider } from '@redwoodjs/web/dist/apollo'
import React from 'react'
import SetGroup, { SetGroupProps } from 'src/components/SetGroup'
import {
  sortWorkout,
  generateWorkoutObject,
} from 'src/components/Workout/WorkoutCell'
import { standard } from 'src/components/Workout/WorkoutCell/WorkoutCell.mock'
import { DoneSetProps, FilledSetProps } from 'src/utils/context/SetContext'

function SetGroupContext(args: SetGroupProps) {
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
            <SetGroup key={item.id} {...item} setGroupIndex={setGroupIndex} />
          ))}
        </form>
      </FormProvider>
    </RedwoodApolloProvider>
  )
}

export default SetGroupContext

const DefaultProps = {
  setGroupId: 0,
  setGroupIndex: 0,
}

export const EmptySetGroupProps: SetGroupProps = {
  ...DefaultProps,
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
  exercise: {
    exerciseId: 0,
    name: 'Single Leg Hip Thrust (Smith Machine) [to failure]',
    latestSetGroup: null,
  },
  sets: [DoneSetProps, DoneSetProps, FilledSetProps, FilledSetProps],
}
