import type {
  QueryResolvers,
  MutationResolvers,
  WorkoutResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const workouts: QueryResolvers['workouts'] = () => {
  return db.workout.findMany()
}

export const workout: QueryResolvers['workout'] = ({ id }) => {
  return db.workout.findUnique({
    where: { id },
  })
}

export const createWorkout: MutationResolvers['createWorkout'] = ({
  input,
}) => {
  return db.workout.create({
    data: input,
  })
}

export const updateWorkout: MutationResolvers['updateWorkout'] = ({
  id,
  input,
}) => {
  return db.workout.update({
    data: input,
    where: { id },
  })
}

export const deleteWorkout: MutationResolvers['deleteWorkout'] = ({ id }) => {
  return db.workout.delete({
    where: { id },
  })
}

export const Workout: WorkoutResolvers = {
  setGroups: (_obj, { root }) =>
    db.workout.findUnique({ where: { id: root.id } }).setGroups(),
  template: (_obj, { root }) =>
    db.workout.findUnique({ where: { id: root.id } }).template(),
}
