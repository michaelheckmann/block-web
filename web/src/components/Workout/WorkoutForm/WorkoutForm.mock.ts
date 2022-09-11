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

mockGraphQLMutation('DeleteSetGroupMutation', ({ id }) => {
  console.log('DeleteSetGroupMutation Mock', id)
  return {
    deleteSetGroup: {
      id: id,
    },
  }
})
