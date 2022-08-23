import { FormProvider, useFieldArray, useForm } from '@redwoodjs/forms'
import { MetaTags, useMutation } from '@redwoodjs/web'
import SetGroup, {
  SetGroupComponentType,
} from 'src/components/SetGroup/SetGroup'
import WorkoutsCell from 'src/components/Workout/WorkoutsCell'

const CREATE_WORKOUT_MUTATION = gql`
  mutation CreateWorkoutMutation($input: CreateWorkoutInput!) {
    createWorkout(input: $input) {
      id
    }
  }
`

const HomePage = () => {
  const [createWorkout, { loading, error }] = useMutation(
    CREATE_WORKOUT_MUTATION,
    {
      onCompleted: () => {},
      onError: (error) => {},
    }
  )

  return <WorkoutsCell />
}

export default HomePage
