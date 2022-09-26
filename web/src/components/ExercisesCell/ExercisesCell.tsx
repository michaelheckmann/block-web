import { XMarkIcon } from '@heroicons/react/24/solid'
import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import type { ExercisesQuery } from 'types/graphql'
import ExerciseSelector from '../ExerciseSelector/ExerciseSelector'

export const QUERY = gql`
  query ExercisesQuery {
    exercises {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

/* Types */
export type ExercisesType = CellSuccessProps<ExercisesQuery>['exercises']

type SuccessProps = CellSuccessProps<ExercisesQuery> & {
  close?: () => void
  selectExercise?: (id: number) => void
}

export const Success = ({
  exercises,
  close = () => {},
  selectExercise = () => {},
}: SuccessProps) => {
  const handleExerciseSelect = (id: number) => {
    selectExercise(id)
    close()
  }

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
      <div className="mb-4 text-gray-900">
        <h2 className="flex w-full font-medium tracking-wide">Exercises</h2>
      </div>

      <ExerciseSelector
        exercises={exercises}
        handleExerciseSelect={handleExerciseSelect}
      />
    </div>
  )
}
