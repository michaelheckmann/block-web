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
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return <div className="rw-text-center">empty</div>
}

export const Failure = ({ error }: CellFailureProps) => (
  <pre className="rw-cell-error">{JSON.stringify(error, null, 4)}</pre>
)

export const Success = ({ workouts }: CellSuccessProps<FindWorkouts>) => {
  return <Workouts workouts={workouts} />
}
