import type { EditWorkoutById, Workout } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import WorkoutForm, { FormType } from 'src/components/Workout/WorkoutForm'
import { omitDeep } from 'src/utils/omitDeep'

export const QUERY = gql`
  query EditWorkoutById($id: Int!) {
    workout: workout(id: $id) {
      id
      name
      done
      templateId
      createdAt
      updatedAt
      setGroups {
        exercise {
          name
        }
        sets {
          id
          reps
          weight
          done
        }
      }
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
  const [updateWorkout, { loading, error }] = useMutation(
    UPDATE_WORKOUT_MUTATION,
    {
      onCompleted: (d) => {
        // toast.success('Workout updated')
        console.log(d)
        // navigate(routes.workouts())
      },
      onError: (error) => {
        console.error(error.message)
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: FormType) => {
    console.log('input', input)
    // const castInput = Object.assign(input, {
    //   templateId: parseInt(workout.templateId),
    // })
    // updateWorkout({ variables: { id: workout.id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Workout {workout.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <WorkoutForm workout={workout} onSave={onSave} />
      </div>
      <pre className="">{JSON.stringify(workout, null, 4)}</pre>
    </div>
  )
}
