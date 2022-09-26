import { XMarkIcon } from '@heroicons/react/24/solid'
import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import type {
  FindExerciseQuery,
  FindExerciseQueryVariables,
} from 'types/graphql'
import Exercise from '../Exercise/Exercise'

export const QUERY = gql`
  query FindExerciseQuery($id: Int!) {
    exercise: exercise(id: $id) {
      id
      name
      setGroups {
        id
        order
        sets {
          id
          weight
          reps
        }
        workout {
          done
          createdAt
          setGroups {
            id
            exercise {
              name
            }
            sets {
              id
            }
          }
        }
      }
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

type SuccessProps = CellSuccessProps<
  FindExerciseQuery,
  FindExerciseQueryVariables
> & {
  close?: () => void
}

export const Success = ({ exercise, close = () => {} }: SuccessProps) => {
  return (
    <div className="relative">
      <div className="absolute top-0 right-0">
        {/* Close Button */}
        <button
          type="button"
          className="flex h-6 w-6 items-center justify-center rounded-sm bg-gray-200 text-sm text-gray-900 hover:bg-gray-300 active:bg-gray-300"
          onClick={close}
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      </div>

      <Exercise exercise={exercise} />
    </div>
  )
}
