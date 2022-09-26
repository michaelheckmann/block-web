import { FormProvider, useForm } from '@redwoodjs/forms'
import { RedwoodApolloProvider } from '@redwoodjs/web/dist/apollo'
import Set, { SetProps } from 'src/components/Set'
import {
  generateWorkoutObject,
  sortWorkout,
} from 'src/components/Workout/WorkoutCell'
import { standard } from 'src/components/WorkoutCell/WorkoutCell.mock'
import { WorkoutFormType } from '../types/WorkoutFormType'

/*  It's a wrapper for the SetGroup component that
    allows us to pass in custom props to the component and
    enable form functionality. */
function SetContext(args: SetProps) {
  const { previous, setGroupIndex, setIndex, ...item } = args
  const workout = sortWorkout(generateWorkoutObject(standard().workout))
  workout.setGroups[setGroupIndex].sets[setIndex] = item

  const methods = useForm<WorkoutFormType>({
    defaultValues: workout,
  })

  return (
    <RedwoodApolloProvider>
      <FormProvider {...methods}>
        <Set
          {...item}
          previous={previous}
          setIndex={setIndex}
          setGroupIndex={setGroupIndex}
        />
      </FormProvider>
    </RedwoodApolloProvider>
  )
}

export default SetContext

// Different configuration options for the different test cases

const DefaultProps = {
  setId: 0,
  setGroupIndex: 0,
  setIndex: 0,
}

export const NewSetProps: SetProps = {
  ...DefaultProps,
  previous: {
    weight: undefined,
    reps: undefined,
  },
  weight: undefined,
  reps: undefined,
  done: false,
}

export const SetWithPreviousProps: SetProps = {
  ...NewSetProps,
  previous: {
    weight: 10,
    reps: 12,
  },
  done: false,
}

export const FilledSetProps: SetProps = {
  ...NewSetProps,
  previous: {
    weight: 10,
    reps: 8,
  },
  weight: 10,
  reps: 12,
  done: false,
}

export const DoneSetProps: SetProps = {
  ...NewSetProps,
  previous: {
    weight: 10,
    reps: 8,
  },
  weight: 10,
  reps: 12,
  done: true,
}
