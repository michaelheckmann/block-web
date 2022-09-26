mockGraphQLMutation('UpdateSetMutation', ({ input }) => {
  // console.log('UpdateSetMutation Mock', input)
  return {
    updateSet: {
      id: 0,
      weight: input.weight,
      reps: input.reps,
      done: input.done,
      createdAt: '2020-01-02T12:34:56Z',
      updatedAt: '2020-01-02T12:34:56Z',
    },
  }
})
