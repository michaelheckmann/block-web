import type { FindExerciseQuery, FindExerciseQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindExerciseQuery($id: Int!) {
    exercise: exercise(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindExerciseQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  exercise,
}: CellSuccessProps<FindExerciseQuery, FindExerciseQueryVariables>) => {
  return <div>{JSON.stringify(exercise)}</div>
}
