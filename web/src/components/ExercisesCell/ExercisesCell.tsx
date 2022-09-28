import { XMarkIcon } from '@heroicons/react/24/solid'
import { useAuth } from '@redwoodjs/auth'
import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import ExerciseSelector from 'src/components/ExerciseSelector'
import type { ExercisesQuery } from 'types/graphql'

export const QUERY = gql`
  query ExercisesQuery($id: Int!) {
    exercisesByUserId(id: $id) {
      id
      name
    }
  }
`

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

export const Loading = () => <div>Loading...</div>

export const Empty = ({ close = () => {}, createExercise = () => {} }) => (
  <div className="">
    <Header close={close} createExercise={createExercise} />
    <div>Empty</div>
  </div>
)

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

/* Types */
export type ExercisesType =
  CellSuccessProps<ExercisesQuery>['exercisesByUserId']

type SuccessProps = CellSuccessProps<ExercisesQuery> & {
  close?: () => void
  selectExercise?: (id: number) => void
  createExercise?: () => void
}

export const Success = ({
  exercisesByUserId,
  close = () => {},
  selectExercise = () => {},
  createExercise = () => {},
}: SuccessProps) => {
  const handleExerciseSelect = (id: number) => {
    selectExercise(id)
  }

  console.log('exercisesByUserId', exercisesByUserId)

  return (
    <div className="relative">
      <Header close={close} createExercise={createExercise} />

      <ExerciseSelector
        exercises={exercisesByUserId}
        handleExerciseSelect={handleExerciseSelect}
      />
    </div>
  )
}

function Header({ close, createExercise }) {
  return (
    <>
      <div className="absolute top-0 right-0">
        {/* Close Button */}
        <button
          type="button"
          className="flex items-center justify-center w-6 h-6 text-sm text-gray-900 bg-gray-200 rounded-sm hover:bg-gray-300 active:bg-gray-300"
          onClick={close}
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>
      <div className="mb-4 text-gray-900">
        <h2 className="flex w-full font-medium tracking-wide">Exercises</h2>
        <button type="button" onClick={createExercise}>
          New Exercise
        </button>
      </div>
    </>
  )
}
