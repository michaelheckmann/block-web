mockGraphQLMutation('CreateSetMutation', ({ input }, obj) => {
  console.log('CreateSetMutation Mock', input, obj)
  return {
    createSet: {
      id: Math.floor(Math.random() * 100),
      setGroupId: 0,
      weight: input.weight ?? 0,
      reps: input.reps ?? 0,
      done: input.done,
    },
  }
})

mockGraphQLMutation('DeleteSetMutation', ({ id }) => {
  console.log('DeleteSetMutation Mock', id)
  return {
    deleteSet: {
      id: id,
    },
  }
})
