import type { FindWorkouts } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Workouts from 'src/components/Workout/Workouts'

export const QUERY = gql`
  query FindWorkouts {
    workouts {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No workouts yet. '}
      <Link
        to={routes.newWorkout()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ workouts }: CellSuccessProps<FindWorkouts>) => {
  return <Workouts workouts={workouts} />
}
