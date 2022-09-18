import type {
  FindExerciseQuery,
  FindExerciseQueryVariables,
} from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import Exercise from '../Exercise/Exercise'
import { XMarkIcon } from '@heroicons/react/24/solid'

export type ExerciseType = FindExerciseQuery['exercise']

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
        <button
          type="button"
          className="flex items-center justify-center w-6 h-6 text-sm text-gray-900 bg-gray-200 rounded-sm hover:bg-gray-300 active:bg-gray-300"
          onClick={close}
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>
      <Exercise exercise={exercise} />
    </div>
  )
}
