import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import WorkoutForm from 'src/components/WorkoutForm'
import { deepCopy } from 'src/utils/functions/deepCopy'
import {
  LatestSetGroupType,
  SetType,
  WorkoutFormType,
} from 'src/utils/types/WorkoutFormType'
import { EditWorkoutById } from 'types/graphql'

type workoutType = EditWorkoutById['workout']

export const QUERY = gql`
  query EditWorkoutById($id: Int!) {
    workout: workout(id: $id) {
      id
      name
      done
      createdAt
      setGroups {
        id
        order
        exercise {
          id
          name
          latestSetGroup(workoutId: $id) {
            sets {
              reps
              weight
            }
          }
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

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ workout }: CellSuccessProps<EditWorkoutById>) => {
  return (
    <div className="flex min-h-screen flex-col">
      <WorkoutForm workout={sortWorkout(generateWorkoutObject(workout))} />
    </div>
  )
}

export function generateWorkoutObject(workout: workoutType): WorkoutFormType {
  // console.log('WORKOUT', workout)
  return {
    workoutId: workout.id,
    name: workout.name,
    done: workout.done,
    setGroups: workout.setGroups.map((setGroup) => ({
      setGroupId: setGroup.id,
      order: setGroup.order,
      exercise: {
        exerciseId: setGroup.exercise.id,
        name: setGroup.exercise.name,
        latestSetGroup: remapLatestSetGroup(setGroup.exercise.latestSetGroup),
      },
      sets: setGroup.sets.map(remapSet),
    })),
  }
}

/**
 * Sort the set groups by set group id, then sort the sets in each set group by set id
 * Making sure that the sets are in the same order as they were created
 * @param {WorkoutFormType} workout - WorkoutFormType
 * @returns A new workout object with the setGroups sorted by setGroupId and the sets sorted by setId.
 */
export function sortWorkout(workout: WorkoutFormType) {
  const workoutToSort = deepCopy(workout)
  const setGroupCmpFunction = (a, b) => a.order - b.order
  const setCmpFunction = (a, b) => a.setId - b.setId
  workoutToSort.setGroups.sort(setGroupCmpFunction)
  workoutToSort.setGroups.forEach((setGroup) => {
    setGroup.sets.sort(setCmpFunction)
  })
  return workoutToSort
}

export function remapSet(set): SetType {
  return {
    setId: set.id,
    reps: set.reps,
    weight: set.weight,
    done: set.done,
  }
}

export function remapLatestSetGroup(latestSetGroup): LatestSetGroupType {
  if (!latestSetGroup) {
    return null
  } else {
    return {
      sets: latestSetGroup.sets.map((set) => ({
        reps: set.reps,
        weight: set.weight,
      })),
    }
  }
}
