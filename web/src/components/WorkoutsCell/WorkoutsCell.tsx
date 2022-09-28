import type { FindWorkouts } from 'types/graphql'

import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'

import { useAuth } from '@redwoodjs/auth'
import Workouts from 'src/components/Workouts'

export const QUERY = gql`
  query FindWorkouts($id: Int!) {
    workoutsByUserId(id: $id) {
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

export const Success = ({
  workoutsByUserId,
}: CellSuccessProps<FindWorkouts>) => {
  return <Workouts workouts={workoutsByUserId} />
}

export const beforeQuery = (props) => {
  const { currentUser } = useAuth()
  return {
    variables: {
      ...props,
      id: currentUser.id,
    },
    fetchPolicy: 'cache-and-network',
  }
}
