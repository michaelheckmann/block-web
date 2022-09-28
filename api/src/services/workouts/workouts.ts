import type {
  MutationResolvers,
  QueryResolvers,
  WorkoutResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const workouts: QueryResolvers['workouts'] = () => {
  return db.workout.findMany()
}

export const workoutsByUserId: QueryResolvers['workoutsByUserId'] = ({
  id,
}) => {
  return db.workout.findMany({
    where: {
      userId: id,
    },
  })
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

export const saveWorkout: MutationResolvers['saveWorkout'] = async ({ id }) => {
  // Get all the set Groups for this workout
  const setGroups = await db.setGroup.findMany({
    where: { workoutId: id },
  })

  let openSets = []
  let openSetGroups = []

  //  Loop through each set group
  for (const setGroup of setGroups) {
    // Get all the sets for this set group
    const sets = await db.set.findMany({
      where: {
        setGroupId: setGroup.id,
      },
    })

    // Loop through each set and check if it's open
    let openSetIds = []
    sets.forEach((set) => (set.done ? null : openSetIds.push(set.id)))

    // If all sets are open, add the set group to the open set groups array
    // Otherwise, add the open sets to the open sets array
    if (openSetIds.length === sets.length) {
      openSetGroups.push(setGroup.id)
    } else {
      openSets.push(...openSetIds)
    }
  }

  // Delete all the open set groups
  for (const setGroupId of openSetGroups) {
    await db.setGroup.delete({
      where: {
        id: setGroupId,
      },
    })
  }

  // Delete all the open sets
  for (const setId of openSets) {
    await db.set.delete({
      where: {
        id: setId,
      },
    })
  }

  return db.workout.update({
    data: {
      done: true,
    },
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
