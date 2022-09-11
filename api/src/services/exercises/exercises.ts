import type {
  QueryResolvers,
  MutationResolvers,
  ExerciseResolvers,
  ExerciselatestSetGroupArgs,
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
  latestSetGroup: getLatestSetGroup,
}

/**
 * "If the workoutId argument is not provided, return the latest setGroup for the exercise, otherwise
 * return the latest setGroup for the exercise that is not in the workout."
 *
 * The first thing we do is check if the workoutId argument is provided. If it is not, we return the
 * latest setGroup for the exercise. If it is, we return the latest setGroup for the exercise that is
 * not in the workout
 * @param args - Partial<ExerciselatestSetGroupArgs>
 * @param  - Partial<ExerciselatestSetGroupArgs>
 * @returns A SetGroup
 */
function getLatestSetGroup(
  args: Partial<ExerciselatestSetGroupArgs>,
  { root }
) {
  if (!args.workoutId) {
    return (
      db.setGroup.findFirst({
        where: { exerciseId: root.id },
        orderBy: { createdAt: 'desc' },
      }) ?? null
    )
  }
  return (
    db.setGroup.findFirst({
      where: {
        AND: [
          { exerciseId: root.id },
          {
            workoutId: {
              lt: args.workoutId,
            },
          },
        ],
      },
      orderBy: { createdAt: 'desc' },
    }) ?? null
  )
}
