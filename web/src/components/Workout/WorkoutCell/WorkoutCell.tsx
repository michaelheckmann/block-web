import type { FindWorkoutById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Workout from 'src/components/Workout/Workout'

export const QUERY = gql`
  query FindWorkoutById($id: Int!) {
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Workout not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ workout }: CellSuccessProps<FindWorkoutById>) => {
  return <Workout workout={workout} />
}
