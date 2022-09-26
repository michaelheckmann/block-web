mockGraphQLMutation('CreateSetGroupMutation', ({ input }, obj) => {
  console.log('CreateSetGroupMutation Mock', input, obj)
  return {
    createSetGroup: {
      id: Math.floor(Math.random() * 100),
      exercise: {
        id: input.exerciseId,
        name: 'Bench Press',
        latestSetGroup: {
          sets: [
            {
              weight: 0,
              reps: 0,
            },
          ],
        },
      },
    },
  }
})

mockGraphQLMutation('SaveWorkoutMutation', ({ id }) => {
  console.log('SaveWorkoutMutation Mock', id)
  return {
    saveWorkout: {
      id: id,
    },
  }
})

mockGraphQLMutation('DeleteWorkoutMutation', ({ id }) => {
  console.log('DeleteWorkoutMutation Mock', id)
  return {
    deleteWorkout: {
      id: id,
    },
  }
})
