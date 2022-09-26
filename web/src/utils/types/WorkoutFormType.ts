export type SetType = {
  setId: number
  weight: number
  reps: number
  done: boolean
}

export type LatestSetGroupType = {
  sets: {
    weight: number
    reps: number
  }[]
}

export type ExerciseType = {
  exerciseId: number
  name: string
  latestSetGroup?: LatestSetGroupType
}

export type SetGroupType = {
  setGroupId: number
  exercise: ExerciseType
  order: number
  sets: SetType[]
}

export type SetGroupProps = SetGroupType & {
  setGroupIndex: number
}

export type WorkoutFormType = {
  workoutId: number
  name: string
  done: boolean
  setGroups: SetGroupType[]
}
