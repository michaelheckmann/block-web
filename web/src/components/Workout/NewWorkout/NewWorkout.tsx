import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import WorkoutForm from 'src/components/Workout/WorkoutForm'

const CREATE_WORKOUT_MUTATION = gql`
  mutation CreateWorkoutMutation($input: CreateWorkoutInput!) {
    createWorkout(input: $input) {
      id
    }
  }
`

const NewWorkout = () => {
  const [createWorkout, { loading, error }] = useMutation(CREATE_WORKOUT_MUTATION, {
    onCompleted: () => {
      toast.success('Workout created')
      navigate(routes.workouts())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    const castInput = Object.assign(input, { templateId: parseInt(input.templateId), })
    createWorkout({ variables: { input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Workout</h2>
      </header>
      <div className="rw-segment-main">
        <WorkoutForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewWorkout
