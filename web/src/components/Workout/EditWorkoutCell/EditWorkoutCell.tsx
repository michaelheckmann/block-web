import type { EditWorkoutById } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import WorkoutForm from 'src/components/Workout/WorkoutForm'

export const QUERY = gql`
  query EditWorkoutById($id: Int!) {
    workout: workout(id: $id) {
      id
      name
      done
      templateId
      createdAt
      updatedAt
    }
  }
`
const UPDATE_WORKOUT_MUTATION = gql`
  mutation UpdateWorkoutMutation($id: Int!, $input: UpdateWorkoutInput!) {
    updateWorkout(id: $id, input: $input) {
      id
      name
      done
      templateId
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ workout }: CellSuccessProps<EditWorkoutById>) => {
  const [updateWorkout, { loading, error }] = useMutation(UPDATE_WORKOUT_MUTATION, {
    onCompleted: () => {
      toast.success('Workout updated')
      navigate(routes.workouts())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    const castInput = Object.assign(input, { templateId: parseInt(input.templateId), })
    updateWorkout({ variables: { id, input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Workout {workout.id}</h2>
      </header>
      <div className="rw-segment-main">
        <WorkoutForm workout={workout} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
