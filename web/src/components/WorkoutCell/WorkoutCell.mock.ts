export const standard = () => ({
  workout: {
    id: 1,
    name: 'My new workout',
    done: false,
    createdAt: '2020-01-02T12:34:56Z',
    setGroups: [
      {
        id: 1,
        order: 0,
        exercise: {
          id: 1,
          name: 'Reverse Grip Row (Smith Machine)',
          latestSetGroup: {
            sets: [
              {
                reps: 12,
                weight: 5,
              },
            ],
          },
        },
        sets: [
          {
            id: 1,
            reps: 15,
            weight: 5,
            done: false,
          },
        ],
      },
    ],
  },
})
