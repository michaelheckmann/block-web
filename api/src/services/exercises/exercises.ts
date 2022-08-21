import type {
  QueryResolvers,
  MutationResolvers,
  ExerciseResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const exercises: QueryResolvers['exercises'] = () => {
  return db.exercise.findMany()
}

export const exercise: QueryResolvers['exercise'] = ({ id }) => {
  return db.exercise.findUnique({
    where: { id },
  })
}

export const createExercise: MutationResolvers['createExercise'] = ({
  input,
}) => {
  return db.exercise.create({
    data: input,
  })
}

export const updateExercise: MutationResolvers['updateExercise'] = ({
  id,
  input,
}) => {
  return db.exercise.update({
    data: input,
    where: { id },
  })
}

export const deleteExercise: MutationResolvers['deleteExercise'] = ({ id }) => {
  return db.exercise.delete({
    where: { id },
  })
}

export const Exercise: ExerciseResolvers = {
  setGroups: (_obj, { root }) =>
    db.exercise.findUnique({ where: { id: root.id } }).setGroups(),
}
